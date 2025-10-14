import React, { Fragment, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { portfolioSliderProps } from '../sliderProps';
import { portfolioData } from './portfolioData';
import { Context } from '../context/Context';
import { getTechIcon } from './Icons';
import styles from '../../styles/components/Portfolio.module.css';

const Portfolio: React.FC = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Portfolio must be used within a ContextProvider');
  }

  const { modalValueSet } = context;

  return (
    <Fragment>
      <div className='resumo_fn_section' id='portfolio'>
        <div className='container'>
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>Portfolio</h3>
            <h3 className='title'>Featured Projects</h3>
            <p className='desc'>
              A collection of my favorite projects that I've worked on.
            </p>
          </div>
        </div>
        <div className='noright'>
          <Swiper
            {...portfolioSliderProps}
            modules={[Autoplay, Navigation]}
            className='owl-carousel'>
            {portfolioData.map((item) => (
              <SwiperSlide className='item modal_item' key={item.id}>
                <div
                  className='portfolio_item'
                  onClick={() => modalValueSet(item)}>
                  <div className='img_holder'>
                    <img src={item.image} alt={item.title} />
                    <div
                      className='abs_img'
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                  <div className='title_holder'>
                    <p className={styles.tech_tags}>
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className={styles.tech_tag}>
                          {getTechIcon(tag, 14)}
                          <span>{tag}</span>
                          {index === 0 && ' • '}
                        </span>
                      ))}
                    </p>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Fragment>
  );
};

export default Portfolio;
