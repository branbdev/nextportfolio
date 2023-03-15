import { useState } from 'react';
import NewsModalbox from './NewsModalbox';

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
            <ul className='modal_items' data-from='blog' data-count={5}>
              <li>
                <div
                  className='item modal_item'
                  onClick={() => modalValueSet(1)}
                  data-index={1}
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
                </div>
              </li>

              <li>
                <div
                  className='item modal_item'
                  onClick={() => modalValueSet(2)}
                  data-index={2}
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
                </div>
              </li>

              <li>
                <div
                  className='item modal_item'
                  onClick={() => modalValueSet(3)}
                  data-index={3}
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
                </div>
              </li>

              <li>
                <div
                  className='item modal_item'
                  onClick={() => modalValueSet(4)}
                  data-index={4}
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
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioBlock;
