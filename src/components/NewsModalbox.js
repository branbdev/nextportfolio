import { useEffect, useState } from 'react';
import { dataImage } from '../utilits';
import { portfolioData } from './portfolioData';

const NewsModalbox = ({ close, value }) => {
  const [currentIndex, setCurrentIndex] = useState(
    portfolioData.findIndex((p) => p.id === value)
  );

  useEffect(() => {
    dataImage();
  }, [currentIndex]);

  const project = portfolioData[currentIndex];

  const handleNav = (direction) => {
    let nextIndex;
    if (direction === 'prev') {
      nextIndex =
        currentIndex === 0 ? portfolioData.length - 1 : currentIndex - 1;
    } else {
      nextIndex =
        currentIndex === portfolioData.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(nextIndex);
  };

  if (!project) {
    return null;
  }

  return (
    <div className='resumo_fn_modalbox opened'>
      <a
        className='extra_closer'
        href='#'
        onClick={(e) => {
          e.preventDefault();
          close(false);
        }}
      />
      <div className='box_inner'>
        <a
          className='closer'
          href='#'
          onClick={(e) => {
            e.preventDefault();
            close(false);
          }}>
          <span />
        </a>
        <div className='modal_content'>
          <div className='modal_in'>
            <div>
              <p className='fn__cat'>{project.tags.join(', ')}</p>
              <h3 className='fn__title'>{project.title}</h3>
              <div className='img_holder'>
                <img src={project.image} alt={project.title} />
                <div className='abs_img' data-bg-img={project.image} />
              </div>
              <p className='fn__desc'>
                {project.description}
                <div className='repo-links'>
                  <a
                    className='repo-live-links'
                    target='_blank'
                    rel='noreferrer'
                    href={project.liveUrl}>
                    Live App
                  </a>{' '}
                  |
                  <a
                    className='repo-live-links'
                    target='_blank'
                    rel='noreferrer'
                    href={project.codeUrl}>
                    {' '}
                    Repo
                  </a>{' '}
                  |
                </div>
              </p>
            </div>
          </div>

          <div className='fn__nav' data-from='portfolio' data-index='1'>
            <a
              href='#'
              className='prev'
              onClick={(e) => {
                e.preventDefault();
                handleNav('prev');
              }}>
              <span className='text'>Prev</span>
              <span className='arrow_wrapper'>
                <span className='arrow'></span>
              </span>
            </a>
            <a
              href='#'
              className='next'
              onClick={(e) => {
                e.preventDefault();
                handleNav('next');
              }}>
              <span className='text'>Next</span>
              <span className='arrow_wrapper'>
                <span className='arrow'></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModalbox;
