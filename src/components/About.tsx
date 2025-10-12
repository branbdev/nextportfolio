import React, { useState } from 'react';
import { siteData } from './siteData';

type TabType = 'tab1' | 'tab2' | 'tab3';

const About: React.FC = () => {
  const [toggleList, setToggleList] = useState<TabType>('tab1');
  const activeList = (value: TabType): string =>
    value === toggleList ? 'active' : '';

  return (
    <section id='about'>
      <div className='container'>
        <div className='roww'>
          {/* Main Title */}
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>About Me</h3>
            <h3 className='title'>Biography</h3>
            <p className='desc'>
              {`Growing up in southern California, I was enamored with the internet from an early age. From the early days of AOL to the dawn of social media, I've used the web to express myself and provide platforms for others to do the same. Since around the time of the recent pandemic, I had the opportunity to change careers and as much as a journey it has been, I can say that I'm genuinely excited to continue to apply my skills and help others make modern and scalable applications for any need. When I'm not coding, you can find me at a local music venue, building and playing modular synths, or just watching old movies`}
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
                          <h5>Arcane Logic</h5>
                          <span>( 2020 — Today )</span>
                        </div>
                        <h2>Freelance Web Developer</h2>
                        <ul className='experience-list'>
                          <li>
                            Developed and launched responsive marketing websites
                            for small businesses, ensuring high performance
                            (Google PageSpeed scores above 90) and adherence to
                            WCAG 2.1 accessibility standards.
                          </li>
                          <li>
                            Collaborated directly with clients to define project
                            scope, create user stories, and deliver features in
                            an Agile-like iterative process, ensuring high
                            client satisfaction and project alignment.
                          </li>
                          <li>
                            Engineered and deployed a full-stack e-commerce
                            platform for a local boutique, resulting in a
                            significant increase in online sales within the
                            first quarter.
                          </li>
                        </ul>{' '}
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
                          <h5>
                            University of California Riverside Extension |
                            Riverside, CA
                          </h5>
                          <span>( 2020 )</span>
                        </div>
                        <h2>Web Development Bootcamp</h2>
                        <p>
                          Completed an intensive 6-month bootcamp covering the
                          MERN stack, data structures, algorithms, and Agile
                          project management principles in a collaborative,
                          team-based environment.
                        </p>
                        <br></br>
                        <div className='item_top'>
                          <h5>AlgoExpert | Online Assessment</h5>
                          <span>( 2022 )</span>
                        </div>
                        <a href='https://certificate.algoexpert.io/AE-e59165350c'>
                          <h2>Certificate of Completion</h2>
                        </a>
                        <p>
                          Successfully completed 100+ data structure and
                          algorithm challenges, demonstrating proficiency in
                          problem-solving and algorithmic thinking.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /Boxed List */}
              </div>
              {/* /#2 tab content */}
              {/* #3 tab content */}
              <div id='tab3' className={`tab_item ${activeList('tab3')}`}>
                <div className='skills_list'>
                  <div className='skills_grid'>
                    <div className='skill_category'>
                      <h3 className='category_title'>Full-Stack Development</h3>
                      <div className='skill_group'>
                        <h4 className='skill_type'>Languages:</h4>
                        <ul className='skill_items'>
                          <li className='skill_item'>C#</li>
                          <li className='skill_item'>Javascript (ES6+)</li>
                          <li className='skill_item'>TypeScript</li>
                          <li className='skill_item'>Python</li>
                          <li className='skill_item'>HTML5 & CSS3</li>
                        </ul>
                      </div>
                    </div>

                    <div className='skill_category'>
                      <h3 className='category_title'>Front-End</h3>
                      <div className='skill_group'>
                        <h4 className='skill_type'>Frameworks:</h4>
                        <ul className='skill_items'>
                          <li className='skill_item'>React</li>
                          <li className='skill_item'>Next.js</li>
                          <li className='skill_item'>Angular</li>
                          <li className='skill_item'>Blazor</li>
                          <li className='skill_item'>Tailwind CSS</li>
                          <li className='skill_item'>jQuery</li>
                        </ul>
                      </div>
                    </div>

                    <div className='skill_category'>
                      <h3 className='category_title'>Back-End</h3>
                      <div className='skill_group'>
                        <h4 className='skill_type'>Technologies:</h4>
                        <ul className='skill_items'>
                          <li className='skill_item'>.NET</li>
                          <li className='skill_item'>Node.js</li>
                          <li className='skill_item'>Express</li>
                          <li className='skill_item'>NestJS</li>
                          <li className='skill_item'>GraphQL</li>
                          <li className='skill_item'>Django</li>
                        </ul>
                      </div>
                    </div>

                    <div className='skill_category'>
                      <h3 className='category_title'>Database</h3>
                      <div className='skill_group'>
                        <h4 className='skill_type'>Management Systems:</h4>
                        <ul className='skill_items'>
                          <li className='skill_item'>PostgreSQL, MySQL</li>
                          <li className='skill_item'>MongoDB</li>
                          <li className='skill_item'>neo4j</li>

                          <h4 className='skill_type'>ORM:</h4>
                          <li className='skill_item'>Prisma</li>
                          <li className='skill_item'>Mongoose</li>
                          <li className='skill_item'>Entity Framework</li>
                        </ul>
                      </div>
                    </div>

                    <div className='skill_category'>
                      <h3 className='category_title'>Testing</h3>
                      <div className='skill_group'>
                        <h4 className='skill_type'>Libraries:</h4>
                        <ul className='skill_items'>
                          <li className='skill_item'>NUnit</li>
                          <li className='skill_item'>Jest</li>
                          <li className='skill_item'>React Testing Library</li>
                        </ul>
                      </div>
                    </div>

                    <div className='skill_category'>
                      <h3 className='category_title'>Infrastructure</h3>
                      <div className='skill_group'>
                        <h4 className='skill_type'>Cloud Services:</h4>
                        <ul className='skill_items'>
                          <li className='skill_item'>
                            Azure, Google Cloud, Digital Ocean
                          </li>

                          <h4 className='skill_type'>
                            Containerization & Orchestration:
                          </h4>
                          <li className='skill_item'>Docker</li>
                          <li className='skill_item'>Kubernetes</li>

                          <h4 className='skill_type'>Web Server:</h4>
                          <li className='skill_item'>NGINX</li>
                        </ul>
                      </div>
                    </div>

                    <div className='skill_category'>
                      <h3 className='category_title'>DevOps</h3>
                      <div className='skill_group'>
                        <h4 className='skill_type'>Version Control:</h4>
                        <ul className='skill_items'>
                          <li className='skill_item'>Git, Github</li>

                          <h4 className='skill_type'>CI/CD:</h4>
                          <li className='skill_item'>Jenkins</li>
                          <li className='skill_item'>Github Pages</li>
                        </ul>
                      </div>
                    </div>

                    <div className='skill_category'>
                      <h3 className='category_title'>Core Principles</h3>
                      <div className='skill_group'>
                        <h4 className='skill_type'>Architectural Patterns:</h4>
                        <ul className='skill_items'>
                          <li className='skill_item'>
                            Microservices, Event-Driven, & Serverless
                          </li>

                          <h4 className='skill_type'>Design:</h4>
                          <li className='skill_item'>
                            SOLID, OOP & Separation of Concerns
                          </li>

                          <h4 className='skill_type'>Methodologies:</h4>
                          <li className='skill_item'>Agile / Scrum</li>
                          <li className='skill_item'>
                            Test-Driven Development
                          </li>
                          <li className='skill_item'>Domain-Driven Design</li>
                        </ul>
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
