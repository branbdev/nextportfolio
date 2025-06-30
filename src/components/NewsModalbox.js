import { useEffect, useState } from 'react';
import { dataImage } from '../utilits';

const NewsModalbox = ({ close, value }) => {
  const data = [
    {
      title: 'B & B Real Estate',
      date: 'Javascript, Django, PostgreSQL, NGINX',
      desc: [
        {
          p: 'Users can register, login, and contact real estate agents to enquire about property listings. Users can browse or search property listings by specific metrics such as number of bedroom/bathroom/garages, square footage, location, etc. Administers can easily add, remove, and update both homes listed and employee profiles, including adding a public distinction for Employee of the Month',
          l: 'http://146.190.32.74/',
          c: 'https://github.com/branbdev/bt_realestate',
        },
      ],
    },
    {
      title: 'Pebbl',
      date: 'Angular, C#',
      desc: [
        {
          p: 'This application is meant to match users up with potential partners based on their preferences.',
          l: 'https://github.com/branbdev/',
          c: 'https://github.com/branbdev/',
        },
      ],
    },
    {
      title: 'DevCon',
      date: 'React, Node, Express, MongoDB',
      desc: [
        {
          p: 'A Simple social media application for web developers. Users can register, login, and add relevant information reguarding their experience, education, and expertise. Users can post, comment and send likes to different user posts.',
          l: 'https://devcon-et5h.onrender.com/',
          c: 'https://github.com/branbdev/devcon',
        },
      ],
    },
    {
      title: 'Revree',
      date: 'React, Django',
      desc: [
        {
          p: 'An E Commerce site where users can browse item listings and add them to a shopping cart before checking out',
          l: 'https://github.com/branbdev/',
          c: 'https://github.com/branbdev/',
        },
      ],
    },
  ];

  const [index, setIndex] = useState(value);
  useEffect(() => {
    dataImage();
  }, [index]);

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
            {data.map(
              (d, i) =>
                i + 1 == index && (
                  <div key={i}>
                    <p className='fn__cat'>{d.date}</p>
                    <p className='fn__cat'>{d.tag}</p>
                    <h3 className='fn__title'>{d.title}</h3>
                    <div className='img_holder'>
                      <img src={`/img/portfolio/${i}.jpg`} alt='' />
                      <div
                        className='abs_img'
                        data-bg-img={`/img/portfolio/${i}.jpg`}
                      />
                    </div>
                    {d.desc.map((des) => (
                      <p key={i} className='fn__desc'>
                        {des.p}
                        <div className='repo-links'>
                          <a
                            className='repo-live-links'
                            target='_blank'
                            rel='noreferrer'
                            href={`${des.l}`}>
                            Live App
                          </a>{' '}
                          |
                          <a
                            className='repo-live-links'
                            target='_blank'
                            rel='noreferrer'
                            href={`${des.c}`}>
                            {' '}
                            Repo
                          </a>{' '}
                          |
                        </div>
                      </p>
                    ))}
                  </div>
                )
            )}
          </div>

          <div className='fn__nav' data-from='portfolio' data-index='1'>
            <a
              href='#'
              className='prev'
              onClick={(e) => {
                e.preventDefault();
                setIndex(index == 1 ? 4 : index - 1);
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
                setIndex(index == 4 ? 1 : index + 1);
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
