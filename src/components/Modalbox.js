import { useEffect, useState } from 'react';
import { dataImage } from '../utilits';

//Needs to be able to take in an array of tags
const Modalbox = ({ close, value }) => {
  const data = [
    {
      name: 'B & B Real Estate',
      tag: 'Django',
      desc: [
        {
          p: 'Users can register, login, and contact real estate agents to enquire about property listings. Users can browse or search property listings by specific metrics such as number of bedroom/bathroom/garages, square footage, location, etc. Administers can easily add, remove, and update both homes listed and employee profiles, including adding a public distinction for Employee of the Month',
        },
      ],
    },
    {
      name: 'Pebbl',
      tag: 'Angular',
      desc: [
        {
          p: 'This application is meant to match users up with potential partners based on their preferences.',
        },
      ],
    },
    {
      name: 'DevCon',
      tag: 'React',
      desc: [
        {
          p: 'A Simple social media application for web developers. Users can register, login, and add relevant information reguarding their experience, education, and expertise. Users can post, comment and send likes to different user posts.',
        },
      ],
    },
    {
      name: 'Revree',
      tag: 'React',
      desc: [
        {
          p: 'An E Commerce site where users can browse item listings and add them to a shopping cart before checking out',
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
                    <p className='fn__cat'>{d.tag}</p>
                    <h3 className='fn__title'>{d.name}</h3>
                    <div className='img_holder'>
                      <img src='/img/thumb/square.jpg' alt='' />
                      <div
                        className='abs_img'
                        data-bg-img={`/img/portfolio/${index}.jpg`}
                      />
                    </div>
                    {d.desc.map((des, i) => (
                      <p key={i} className='fn__desc'>
                        {des.p}
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

export default Modalbox;
