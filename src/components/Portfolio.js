import { useContext, Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { portfolioSliderProps } from '../sliderProps';
import { portfolioData } from './portfolioData';
import { Context } from '../context/Context';

const Portfolio = () => {
  const { modalValueSet } = useContext(Context);

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
            className='owl-carousel modal_items'
            data-from='portfolio'>
            {portfolioData.map((project) => (
              <SwiperSlide
                className='item modal_item'
                onClick={() => modalValueSet(project.id)}
                data-index={project.id}
                key={project.id}>
                <div className='img_holder'>
                  <img src={project.image} alt={project.title} />
                  <div className='abs_img' data-bg-img={project.image} />
                </div>
                <div className='title_holder'>
                  <p>{project.tags.slice(0, 2).join(', ')}</p>
                  <h3>
                    <a href='#'>{project.title}</a>
                  </h3>
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
