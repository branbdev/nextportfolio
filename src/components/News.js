import { useState } from 'react';
import NewsModalbox from './NewsModalbox';

const News = () => {
  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState(null);
  const [load, setLoad] = useState(false);
  const [hiddenItem, setHiddenItem] = useState(true);
  const [focusValue, setFocusValue] = useState('');
  const modalValueSet = (value) => {
    setModal(true);
    setModalValue(value);
  };
  const loadValueSet = (e) => {
    e.preventDefault();
    if (hiddenItem) {
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        setHiddenItem(false);
      }, 2000);
    }
  };
  const focusValueChange = () => {
    if (!hiddenItem) {
      setFocusValue('No more articles found');
    }
  };

  return (
    <section id='news'>
      {modal && <NewsModalbox close={setModal} value={modalValue} />}
      <div className='container'>
        <div className='roww'>
          {/* Main Title */}
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>Portfolio</h3>
            <h3 className='title'>Featured Projects</h3>
          </div>
          {/* /Main Title */}
          {/* Blog List */}
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
                    <p>Django, Javascript</p>
                    <h3>
                      <a href='#'>B & B Real Estate</a>
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
                    <p>Angular, C#</p>
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
                    <p>React, Express, Node, and MongoDB</p>
                    <h3>
                      <a href='#'>Devcon</a>
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
                    <p>React, Django</p>
                    <h3>
                      <a href='#'>Revree</a>
                    </h3>
                  </div>
                </div>
              </li>
            </ul>
            <div className='clearfix' />
            <div className='load_more'>
              <a
                href='#'
                data-done='Done'
                className={load ? 'loading' : ''}
                data-no='No more articles found'
                onClick={(e) => loadValueSet(e)}
                onFocus={(e) => focusValueChange()}>
                <span className='text'>
                  {hiddenItem
                    ? 'Load More Articles'
                    : focusValue
                    ? focusValue
                    : 'Done'}
                </span>
                <span className='fn__pulse'>
                  <span />
                  <span />
                  <span />
                </span>
              </a>
            </div>
          </div>
          {/* /Blog List */}
        </div>
      </div>
    </section>
  );
};

export default News;
