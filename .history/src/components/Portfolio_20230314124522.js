import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { portfolioSliderProps } from '../sliderProps';
import Modalbox from './Modalbox';

const Portfolio = () => {
  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  return (
    <section id='portfolio'>
      {modal && <Modalbox close={setModal} value={modalValue} />}
      <div className='container'>
        <div className='roww'>
          {/* Main Title */}
          <div className='resumo_fn_main_title'>
            <div className='my__nav'>
              <a href='#' className='prev'>
                <span />
              </a>
              <a href='#' className='next'>
                <span />
              </a>
            </div>
            <h3 className='subtitle'>Portfolio</h3>
            <h3 className='title'>Featured Projects</h3>
          </div>
          {/* /Main Title */}
        </div>
      </div>
      <div className='container noright'>
        <div className='roww'>
          <Swiper
            {...portfolioSliderProps}
            className='owl-carousel modal_items'
            data-from='portfolio'
          >
            <SwiperSlide
              className='item modal_item'
              onClick={() => {
                setModal(true);
                setModalValue(0);
              }}
              data-index={0}
            >
              <div className='img_holder'>
                <img src='img/portfolio/mass-home.png' alt='image' />
                <div
                  className='abs_img'
                  data-bg-img='img/portfolio/mass-home.png'
                />
              </div>
              <div className='title_holder'>
                <p>PERN Stack</p>
                <h3>
                  <a href='#'>M.A.S.S.</a>
                </h3>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className='item modal_item'
              onClick={() => {
                setModal(true);
                setModalValue(2);
              }}
              data-index={1}
            >
              <div className='img_holder'>
                <img src='img/portfolio/neighbr-home.png' alt='image' />
                <div
                  className='abs_img'
                  data-bg-img='img/portfolio/neighbr-home.png'
                />
              </div>
              <div className='title_holder'>
                <p>PERN Stack</p>
                <h3>
                  <a href='#'>Neighbr</a>
                </h3>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className='item modal_item'
              onClick={() => {
                setModal(true);
                setModalValue(3);
              }}
              data-index={2}
            >
              <div className='img_holder'>
                <img src='img/portfolio/petful.png' alt='image' />
                <div
                  className='abs_img'
                  data-bg-img='img/portfolio/petful.png'
                />
              </div>
              <div className='title_holder'>
                <p>JavaScript, React, Node.js, Express.js</p>
                <h3>
                  <a href='#'>Petful</a>
                </h3>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className='item modal_item'
              onClick={() => {
                setModal(true);
                setModalValue(4);
              }}
              data-index={3}
            >
              <div className='img_holder'>
                <img src='img/portfolio/spaced-rep.png' alt='image' />
                <div
                  className='abs_img'
                  data-bg-img='img/portfolio/spaced-rep.png'
                />
              </div>
              <div className='title_holder'>
                <p>PERN Stack</p>
                <h3>
                  <a href='#'>Lango</a>
                </h3>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
