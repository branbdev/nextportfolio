import { useState } from 'react';
import NewsModalbox from './NewsModalbox';
import { portfolioData } from './portfolioData';

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
