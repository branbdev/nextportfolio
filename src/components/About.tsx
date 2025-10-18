'use client';

/**
 * =========================================================================
 * ABOUT SECTION COMPONENT
 * =========================================================================
 * Displays personal biography, contact info, and tabbed content for:
 * - Professional Experience
 * - Education
 * - Technical Skills
 *
 * Uses CSS Modules for scoped styling and semantic HTML for accessibility.
 * Implements keyboard navigation and ARIA attributes for WCAG AAA compliance.
 */

import React, { useState } from 'react';
import { siteData } from './siteData';
import styles from '@/styles/components/About.module.css';

type TabType = 'experience' | 'education' | 'skills';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('experience');

  const isActive = (tab: TabType): boolean => tab === activeTab;

  const handleTabClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: TabType
  ) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    tab: TabType
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tab);
    }
  };

  return (
    <section
      id='about'
      className={styles.aboutSection}
      aria-labelledby='about-title'>
      <div className={styles.container}>
        {/* Main Title */}
        <div className={styles.mainTitle}>
          <p className={styles.subtitle} aria-label='Section label'>
            About Me
          </p>
          <h2 id='about-title' className={styles.title}>
            Biography
          </h2>
          <p className={styles.description}>
            Growing up in southern California, I was enamored with the internet
            from an early age. From the early days of AOL to the dawn of social
            media, I have used the web to express myself and provide platforms
            for others to do the same. Since around the time of the recent
            pandemic, I had the opportunity to change careers and as much as a
            journey it has been, I can say that I am genuinely excited to
            continue to apply my skills and help others make modern and scalable
            applications for any need. When I am not coding, you can find me at
            a local music venue, building and playing modular synths, or just
            watching old movies.
          </p>
        </div>

        {/* Contact Information Table */}
        <div className={styles.aboutInfo}>
          <div className={styles.aboutLeft}>
            <table className={styles.infoTable}>
              <tbody>
                <tr>
                  <th scope='row'>Name</th>
                  <th>{siteData.name}</th>
                </tr>
                <tr>
                  <th scope='row'>Address</th>
                  <th>{siteData.location}</th>
                </tr>
                <tr>
                  <th scope='row'>Email</th>
                  <th>
                    <a
                      href={'mailto:' + siteData.email}
                      aria-label={'Email ' + siteData.name}>
                      {siteData.email}
                    </a>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className={styles.tabs}>
          {/* Tab Navigation */}
          <nav className={styles.tabHeader} aria-label='About content tabs'>
            <ul className={styles.tabList} role='tablist'>
              <li
                className={
                  styles.tabButton +
                  (isActive('experience') ? ' ' + styles.active : '')
                }
                role='presentation'>
                <a
                  href='#experience'
                  className={styles.tabLink}
                  onClick={(e) => handleTabClick(e, 'experience')}
                  onKeyPress={(e) => handleKeyPress(e, 'experience')}
                  role='tab'
                  aria-selected={isActive('experience')}
                  aria-controls='experience-panel'
                  tabIndex={isActive('experience') ? 0 : -1}>
                  Experience
                </a>
              </li>
              <li
                className={
                  styles.tabButton +
                  (isActive('education') ? ' ' + styles.active : '')
                }
                role='presentation'>
                <a
                  href='#education'
                  className={styles.tabLink}
                  onClick={(e) => handleTabClick(e, 'education')}
                  onKeyPress={(e) => handleKeyPress(e, 'education')}
                  role='tab'
                  aria-selected={isActive('education')}
                  aria-controls='education-panel'
                  tabIndex={isActive('education') ? 0 : -1}>
                  Education
                </a>
              </li>
              <li
                className={
                  styles.tabButton +
                  (isActive('skills') ? ' ' + styles.active : '')
                }
                role='presentation'>
                <a
                  href='#skills'
                  className={styles.tabLink}
                  onClick={(e) => handleTabClick(e, 'skills')}
                  onKeyPress={(e) => handleKeyPress(e, 'skills')}
                  role='tab'
                  aria-selected={isActive('skills')}
                  aria-controls='skills-panel'
                  tabIndex={isActive('skills') ? 0 : -1}>
                  Skills
                </a>
              </li>
            </ul>
          </nav>

          {/* Tab Panels */}
          <div className={styles.tabContent}>
            {/* Experience Tab */}
            <div
              id='experience-panel'
              className={
                styles.tabPanel +
                (isActive('experience') ? ' ' + styles.active : '')
              }
              role='tabpanel'
              aria-labelledby='experience'
              hidden={!isActive('experience')}>
              <div className={styles.boxedList}>
                <ul>
                  <li>
                    <article className={styles.boxedItem}>
                      <div className={styles.itemTop}>
                        <h5>Arcane Logic</h5>
                        <span>( 2020 — Today )</span>
                      </div>
                      <h3>Freelance Web Developer</h3>
                      <ul className={styles.experienceList}>
                        <li>
                          Developed and launched responsive marketing websites
                          for small businesses, ensuring high performance
                          (Google PageSpeed scores above 90) and adherence to
                          WCAG 2.1 accessibility standards.
                        </li>
                        <li>
                          Collaborated directly with clients to define project
                          scope, create user stories, and deliver features in an
                          Agile-like iterative process, ensuring high client
                          satisfaction and project alignment.
                        </li>
                        <li>
                          Engineered and deployed a full-stack e-commerce
                          platform for a local boutique, resulting in a
                          significant increase in online sales within the first
                          quarter.
                        </li>
                      </ul>
                    </article>
                  </li>
                </ul>
              </div>
            </div>

            {/* Education Tab */}
            <div
              id='education-panel'
              className={
                styles.tabPanel +
                (isActive('education') ? ' ' + styles.active : '')
              }
              role='tabpanel'
              aria-labelledby='education'
              hidden={!isActive('education')}>
              <div className={styles.boxedList}>
                <ul>
                  <li>
                    <article className={styles.boxedItem}>
                      <div className={styles.itemTop}>
                        <h5>
                          University of California Riverside Extension |
                          Riverside, CA
                        </h5>
                        <span>( 2020 )</span>
                      </div>
                      <h3>Web Development Bootcamp</h3>
                      <p>
                        Completed an intensive 6-month bootcamp covering the
                        MERN stack, data structures, algorithms, and Agile
                        project management principles in a collaborative,
                        team-based environment.
                      </p>

                      <div
                        className={styles.itemTop}
                        style={{ marginTop: 'var(--spacing-8)' }}>
                        <h5>AlgoExpert | Online Assessment</h5>
                        <span>( 2022 )</span>
                      </div>
                      <h3>
                        <a
                          href='https://certificate.algoexpert.io/AE-e59165350c'
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label='View AlgoExpert certificate (opens in new tab)'>
                          Certificate of Completion
                        </a>
                      </h3>
                      <p>
                        Successfully completed 100+ data structure and algorithm
                        challenges, demonstrating proficiency in problem-solving
                        and algorithmic thinking.
                      </p>
                    </article>
                  </li>
                </ul>
              </div>
            </div>

            {/* Skills Tab */}
            <div
              id='skills-panel'
              className={
                styles.tabPanel +
                (isActive('skills') ? ' ' + styles.active : '')
              }
              role='tabpanel'
              aria-labelledby='skills'
              hidden={!isActive('skills')}>
              <div className={styles.skillsList}>
                <div className={styles.skillsGrid}>
                  {/* Full-Stack Development */}
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryTitle}>
                      Full-Stack Development
                    </h3>
                    <div className={styles.skillGroup}>
                      <h4 className={styles.skillType}>Languages:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>C#</li>
                        <li className={styles.skillItem}>Javascript (ES6+)</li>
                        <li className={styles.skillItem}>TypeScript</li>
                        <li className={styles.skillItem}>Python</li>
                        <li className={styles.skillItem}>HTML5 & CSS3</li>
                      </ul>
                    </div>
                  </div>

                  {/* Front-End */}
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryTitle}>Front-End</h3>
                    <div className={styles.skillGroup}>
                      <h4 className={styles.skillType}>Frameworks:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>React</li>
                        <li className={styles.skillItem}>Next.js</li>
                        <li className={styles.skillItem}>Angular</li>
                        <li className={styles.skillItem}>Blazor</li>
                        <li className={styles.skillItem}>Tailwind CSS</li>
                        <li className={styles.skillItem}>jQuery</li>
                      </ul>
                    </div>
                  </div>

                  {/* Back-End */}
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryTitle}>Back-End</h3>
                    <div className={styles.skillGroup}>
                      <h4 className={styles.skillType}>Technologies:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>.NET</li>
                        <li className={styles.skillItem}>Node.js</li>
                        <li className={styles.skillItem}>Express</li>
                        <li className={styles.skillItem}>NestJS</li>
                        <li className={styles.skillItem}>GraphQL</li>
                        <li className={styles.skillItem}>Django</li>
                      </ul>
                    </div>
                  </div>

                  {/* Database */}
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryTitle}>Database</h3>
                    <div className={styles.skillGroup}>
                      <h4 className={styles.skillType}>Management Systems:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>PostgreSQL</li>
                        <li className={styles.skillItem}>MySQL</li>
                        <li className={styles.skillItem}>MongoDB</li>
                        <li className={styles.skillItem}>neo4j</li>
                      </ul>
                      <h4 className={styles.skillType}>ORM:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>Prisma</li>
                        <li className={styles.skillItem}>Mongoose</li>
                        <li className={styles.skillItem}>Entity Framework</li>
                      </ul>
                    </div>
                  </div>

                  {/* Testing */}
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryTitle}>Testing</h3>
                    <div className={styles.skillGroup}>
                      <h4 className={styles.skillType}>Libraries:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>NUnit</li>
                        <li className={styles.skillItem}>Jest</li>
                        <li className={styles.skillItem}>
                          React Testing Library
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Infrastructure */}
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryTitle}>Infrastructure</h3>
                    <div className={styles.skillGroup}>
                      <h4 className={styles.skillType}>Cloud Services:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>Azure</li>
                        <li className={styles.skillItem}>Google Cloud</li>
                        <li className={styles.skillItem}>Digital Ocean</li>
                      </ul>
                      <h4 className={styles.skillType}>Containerization:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>Docker</li>
                        <li className={styles.skillItem}>Kubernetes</li>
                      </ul>
                      <h4 className={styles.skillType}>Web Server:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>NGINX</li>
                      </ul>
                    </div>
                  </div>

                  {/* DevOps */}
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryTitle}>DevOps</h3>
                    <div className={styles.skillGroup}>
                      <h4 className={styles.skillType}>Version Control:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>Git</li>
                        <li className={styles.skillItem}>Github</li>
                      </ul>
                      <h4 className={styles.skillType}>CI/CD:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>Jenkins</li>
                        <li className={styles.skillItem}>Github Actions</li>
                      </ul>
                    </div>
                  </div>

                  {/* Core Principles */}
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryTitle}>Core Principles</h3>
                    <div className={styles.skillGroup}>
                      <h4 className={styles.skillType}>
                        Architectural Patterns:
                      </h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>Microservices</li>
                        <li className={styles.skillItem}>Event-Driven</li>
                        <li className={styles.skillItem}>Serverless</li>
                      </ul>
                      <h4 className={styles.skillType}>Design:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>SOLID</li>
                        <li className={styles.skillItem}>OOP</li>
                        <li className={styles.skillItem}>
                          Separation of Concerns
                        </li>
                      </ul>
                      <h4 className={styles.skillType}>Methodologies:</h4>
                      <ul className={styles.skillItems}>
                        <li className={styles.skillItem}>Agile / Scrum</li>
                        <li className={styles.skillItem}>
                          Test-Driven Development
                        </li>
                        <li className={styles.skillItem}>
                          Domain-Driven Design
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
