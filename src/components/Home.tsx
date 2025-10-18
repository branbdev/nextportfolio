import React from 'react';
import styles from '@/styles/components/Home.module.css';

/**
 * Home Section Component
 *
 * The hero/introduction section of the portfolio.
 * Uses CSS Modules for scoped styling and semantic HTML for accessibility.
 *
 * @returns {JSX.Element} The Home section with introduction content
 */
const Home: React.FC = () => {
  return (
    <section
      id='home'
      className={styles.homeSection}
      aria-labelledby='home-title'>
      <div className={styles.container}>
        <div className={styles.mainTitle}>
          {/* Subtitle serves as an eyebrow/label */}
          <p className={styles.subtitle} aria-label='Section label'>
            Introduction
          </p>

          {/* Main heading - h1 for SEO and accessibility */}
          <h1 id='home-title' className={styles.title}>
            Full Stack Solutions
          </h1>

          {/* Description paragraph */}
          <p className={styles.description}>
            Software engineer proficient in Next.js, ASP.NET, and the MERN
            stack. I have experience in freelancing and marketing. Both have
            allowed me to develop my problem-solving, assessment, and
            communication skills with clients and partners.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
