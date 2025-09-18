import { useState } from 'react';
import { siteData } from './siteData';

const About = () => {
  const [toggleList, setToggleList] = useState('tab1');
  const activeList = (value) => (value === toggleList ? 'active' : '');
  return (
    <section id='about'>
      <div className='container'>
        <div className='roww'>
          {/* Main Title */}
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>About Me</h3>
            <h3 className='title'>Biography</h3>
            <p className='desc'>
              {`Growing up in southern California, I was enamored with the internet from an early age. From the early days of AOL/MSN Groups to the dawn of social media, I've used the web to express myself and provide platforms for others to do the same. Since around the time of the recent pandemic, I had the opportunity to change careers and as much as a journey it has been, I can say that I'm genuinely excited to continue to apply my skills and help others make modern and scalable applications for any need.`}
            </p>
          </div>
          {/* /Main Title */}
          {/* About Information */}
          <div className='resumo_fn_about_info'>
            <div className='about_left'>
              <table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>{siteData.name}</th>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <th>{siteData.location}</th>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <th>
                      <a href={`mailto:${siteData.email}`}>{siteData.email}</a>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='about_right'>{/* Download CV Button */}</div>
          </div>
          {/* /About Information */}
          {/* Tabs Shortcode */}
          <div className='resumo_fn_tabs'>
            {/* Tab: Header */}
            <div className='tab_header'>
              <ul>
                <li className={activeList('tab1')}>
                  <a href='#' onClick={() => setToggleList('tab1')}>
                    Experience
                  </a>
                </li>
                <li className={activeList('tab2')}>
                  <a href='#' onClick={() => setToggleList('tab2')}>
                    Education
                  </a>
                </li>
                <li className={activeList('tab3')}>
                  <a href='#' onClick={() => setToggleList('tab3')}>
                    Skills
                  </a>
                </li>
              </ul>
            </div>
            {/* /Tab: Header */}
            {/* Tab: Content */}
            <div className='tab_content'>
              {/* #1 tab content */}
              <div id='tab1' className={`tab_item ${activeList('tab1')}`}>
                {/* Boxed List */}
                <div className='resumo_fn_boxed_list'>
                  <ul>
                    <li>
                      <div className='item'>
                        <div className='item_top'>
                          <h5>BB Web Solutions</h5>
                          <span>( 2020 — Today )</span>
                        </div>
                        <h3>Freelance Web Developer</h3>
                        <p>
                          <ul className='experience-list'>
                            <li>
                              Collaborated with clients to make make user story
                              and feature list of desired web app.
                            </li>
                            <li>
                              Used tools like Figma to make mockups of different
                              designs.
                            </li>
                            <li>
                              Developed functioning web applications with
                              industry leading technology according to client
                              need.
                            </li>
                          </ul>{' '}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /Boxed List */}
              </div>
              {/* /#1 tab content */}
              {/* #2 tab content */}
              <div id='tab2' className={`tab_item ${activeList('tab2')}`}>
                {/* Boxed List */}
                <div className='resumo_fn_boxed_list'>
                  <ul>
                    <li>
                      <div className='item'>
                        <div className='item_top'>
                          <h5>UC Riverside</h5>
                          <span>( 11/19-5/20 )</span>
                        </div>
                        <h3>Web Development Bootcamp</h3>
                        <p> </p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /Boxed List */}
              </div>
              {/* /#2 tab content */}
              {/* #3 tab content */}
              <div id='tab3' className={`tab_item ${activeList('tab3')}`}>
                {/* Progress Bar */}
                <div className='resumo_fn_progress_bar'>
                  <div className='progress_item open' data-value={92}>
                    <div className='item_in'>
                      <h3 className='progress_title'>Javascript</h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 92% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                  <div className='progress_item open' data-value={80}>
                    <div className='item_in'>
                      <h3 className='progress_title'>HTML5 &amp; CSS3</h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 80% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                  <div className='progress_item open' data-value={95}>
                    <div className='item_in'>
                      <h3 className='progress_title'>React &amp; Angular</h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 95% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                  <div className='progress_item open' data-value={80}>
                    <div className='item_in'>
                      <h3 className='progress_title'>
                        Node with Express &amp; Nest JS
                      </h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 80% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                  <div className='progress_item open' data-value={85}>
                    <div className='item_in'>
                      <h3 className='progress_title'>
                        MongoDB, PostgreSQL &amp; MySQL
                      </h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 85% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                  <div className='progress_item open' data-value={85}>
                    <div className='item_in'>
                      <h3 className='progress_title'>Django</h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 85% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                  <div className='progress_item open' data-value={85}>
                    <div className='item_in'>
                      <h3 className='progress_title'>NGINX &amp; Heroku</h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 85% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                  <div className='progress_item open' data-value={85}>
                    <div className='item_in'>
                      <h3 className='progress_title'>jQuery</h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 85% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                  <div className='progress_item open' data-value={85}>
                    <div className='item_in'>
                      <h3 className='progress_title'>Git</h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 85% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                  <div className='progress_item open' data-value={85}>
                    <div className='item_in'>
                      <h3 className='progress_title'>Github</h3>
                      <span
                        className='progress_percent'
                        style={{ right: '0%' }}>
                        {/* 85% */}
                      </span>
                      <div className='bg_wrap'>
                        <div className='progress_bg' style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* /Progress Bar */}
              </div>
              {/* /#2 tab content */}
            </div>
            {/* /Tab: Content */}
          </div>
          {/* /Tabs Shortcode */}
        </div>
      </div>
    </section>
  );
};

export default About;
