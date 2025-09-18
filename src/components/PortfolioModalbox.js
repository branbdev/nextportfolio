import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { dataImage } from '../utilits';
import { portfolioData } from './portfolioData';

const PortfolioModalbox = ({ close, value }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projectData = portfolioData.find((p) => p.id === value);
    setProject(projectData);
    dataImage();
  }, [value]);

  if (!project) {
    return null;
  }

  return (
    <div className='fn_modalbox opened'>
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
            <div className='modal_portfolio'>
              <div className='portfolio_images'>
                <Swiper
                  className='owl-carousel'
                  // Add your swiper props here
                >
                  <SwiperSlide>
                    <img src={project.image} alt={project.title} />
                  </SwiperSlide>
                  {/* Add more slides if you have more images */}
                </Swiper>
              </div>
              <div className='portfolio_desc'>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className='tags'>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className='links'>
                  <a href={project.liveUrl} target='_blank' rel='noreferrer'>
                    Live Demo
                  </a>
                  <a href={project.codeUrl} target='_blank' rel='noreferrer'>
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModalbox;
