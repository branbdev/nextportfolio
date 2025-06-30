import { useState } from 'react';
import NewsModalbox from './NewsModalbox';

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
            <ul className='modal_items' data-from='blog' data-count={5}>
              <li>
                <div
                  className='item modal_item'
                  onClick={() => modalValueSet(1)}
                  data-index={1}>
                  <div className='img_holder'>
                    <img
                      src='img/portfolio/bbrealestatehomepage.jpg'
                      alt='image'
                    />
                    <div
                      className='abs_img'
                      data-bg-img='img/portfolio/bbrealestatehomepage.jpg'
                    />
                  </div>
                  <div className='title_holder'>
                    <p>Django</p>
                    <h3>
                      <a href='#'>B&B Real Estate</a>
                    </h3>
                  </div>
                </div>
              </li>

              <li>
                <div
                  className='item modal_item'
                  onClick={() => modalValueSet(2)}
                  data-index={2}>
                  <div className='img_holder'>
                    <img src='/img/portfolio/devcon.jpg' alt='image' />
                    <div
                      className='abs_img'
                      data-bg-img='/img/portfolio/devcon.jpg'
                    />
                  </div>
                  <div className='title_holder'>
                    <p>C# Angular</p>
                    <h3>
                      <a href='#'>Pebbl</a>
                    </h3>
                  </div>
                </div>
              </li>

              <li>
                <div
                  className='item modal_item'
                  onClick={() => modalValueSet(3)}
                  data-index={3}>
                  <div className='img_holder'>
                    <img src='/img/portfolio/devcon.jpg' alt='image' />
                    <div
                      className='abs_img'
                      data-bg-img='/img/portfolio/devcon.jpg'
                    />
                  </div>
                  <div className='title_holder'>
                    <p>MERN Stack</p>
                    <h3>
                      <a href='#'>DevCon</a>
                    </h3>
                  </div>
                </div>
              </li>

              <li>
                <div
                  className='item modal_item'
                  onClick={() => modalValueSet(4)}
                  data-index={4}>
                  <div className='img_holder'>
                    <img
                      src='img/portfolio/bbrealestatehomepage.jpg'
                      alt='image'
                    />
                    <div
                      className='abs_img'
                      data-bg-img='img/portfolio/bbrealestatehomepage.jpg'
                    />
                  </div>
                  <div className='title_holder'>
                    <p>Django React</p>
                    <h3>
                      <a href='#'>Revry</a>
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
