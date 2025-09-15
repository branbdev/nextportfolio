import { useState } from 'react';
import NewsModalbox from './NewsModalbox';
import { portfolioData } from './portfolioData';

//THIS IS THE FRONT PAGE PORTFOLIO DISPLAY

const PortfolioBlock = () => {
  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  const modalValueSet = (value) => {
    setModal(true);
    setModalValue(value);
  };

  return (
    <section id='portfolio'>
      {modal && <NewsModalbox close={setModal} value={modalValue} />}
      <div className='container'>
        <div className='roww'>
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>Portfolio</h3>
            <h3 className='title'>Featured Projects</h3>
          </div>

          <div className='resumo_fn_blog_list'>
            <ul
              className='modal_items'
              data-from='blog'
              data-count={portfolioData.length}>
              {portfolioData.map((project) => (
                <li key={project.id}>
                  <div
                    className='item modal_item'
                    onClick={() => modalValueSet(project.id)}
                    data-index={project.id}>
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioBlock;
