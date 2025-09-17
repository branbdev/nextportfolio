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
            <div className='about_right'>
              {/* Download CV Button */}
              <div className='resumo_fn_cv_btn'>
                <a href={siteData.resume} download={`${siteData.name} Resume`}>
                  <span className='icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      version='1.1'
                      x='0px'
                      y='0px'
                      viewBox='0 0 449.306 449.306'
                      style={{ enableBackground: 'new 0 0 449.306 449.306' }}
                      xmlSpace='preserve'
                      className='fn__svg replaced-svg'>
                      <path d='M447.739,251.298l-59.037-126.433c-1.731-3.54-5.484-5.625-9.404-5.224h-50.155c-5.771,0-10.449,4.678-10.449,10.449     c0,5.771,4.678,10.449,10.449,10.449h43.363l48.588,104.49h-59.559c-27.004-0.133-51.563,15.625-62.694,40.229     c-8.062,16.923-25.141,27.698-43.886,27.69h-60.604c-18.745,0.008-35.823-10.767-43.886-27.69     c-11.131-24.604-35.69-40.362-62.694-40.229H29.257l57.469-104.49h33.437c5.771,0,10.449-4.678,10.449-10.449     c0-5.771-4.678-10.449-10.449-10.449H80.457c-3.776-0.358-7.425,1.467-9.404,4.702L2.09,250.776     c-1.209,1.072-1.958,2.569-2.09,4.18v130.09c0.832,29.282,24.524,52.744,53.812,53.29h341.682     c29.289-0.546,52.98-24.008,53.812-53.29v-130.09C449.107,253.622,448.567,252.362,447.739,251.298z M428.408,385.045     c-0.812,17.743-15.16,31.864-32.914,32.392H53.812c-17.754-0.528-32.102-14.648-32.914-32.392V265.927h66.873     c18.745-0.008,35.823,10.767,43.886,27.69c11.131,24.604,35.69,40.362,62.694,40.229h60.604     c27.004,0.133,51.563-15.625,62.694-40.229c8.062-16.923,25.141-27.698,43.886-27.69h66.873V385.045z' />
                    </svg>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      version='1.1'
                      x='0px'
                      y='0px'
                      viewBox='0 0 449.306 449.306'
                      style={{ enableBackground: 'new 0 0 449.306 449.306' }}
                      xmlSpace='preserve'
                      className='fn__svg arrow replaced-svg'>
                      <path d='M217.339,252.865c3.706,4.04,9.986,4.31,14.025,0.603c0.21-0.192,0.411-0.394,0.603-0.603l71.053-71.576   c3.462-4.617,2.527-11.166-2.09-14.629c-3.715-2.786-8.824-2.786-12.539,0l-53.29,53.29V21.42   c0-5.771-4.678-10.449-10.449-10.449s-10.449,4.678-10.449,10.449v198.531l-53.29-53.29c-4.617-3.462-11.166-2.527-14.629,2.09   c-2.786,3.715-2.786,8.824,0,12.539L217.339,252.865z' />
                    </svg>
                  </span>
                  <span>Download CV</span>
                </a>
              </div>
              {/* /Download CV Button */}
            </div>
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
