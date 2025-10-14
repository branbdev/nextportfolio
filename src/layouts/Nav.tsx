import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Nav.module.css';

interface NavProps {
  close: () => void;
  trigger: boolean;
}

const Nav: React.FC<NavProps> = ({ close, trigger }) => {
  const [toggle_, setToggle_] = useState<string>('');
  const router = useRouter();

  // Function to handle navigation with proper routing
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    close();

    // If path is a hash link on the homepage
    if (path.startsWith('/#')) {
      // If we're already on the home page, just scroll to the anchor
      if (router.pathname === '/') {
        window.location.hash = path.substring(2);
      } else {
        // Otherwise navigate to home page with the hash
        router.push(path);
      }
    } else {
      // For non-hash links like /blog, use normal navigation
      router.push(path);
    }
  };

  useEffect(() => {
    !trigger && setToggle_('');
    const timer = setTimeout(() => {
      trigger ? setToggle_('ready') : setToggle_('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <Fragment>
      <button
        className={styles.navOverlay}
        onClick={close}
        aria-label='Close Menu'
      />
      <div className={`${styles.navigation} navigation`}>
        <button
          className={styles.closer}
          onClick={close}
          aria-label='Close Menu'
        />
        {/* Navigation Content */}
        <div className={styles.navIn}>
          <nav id='nav' className={styles.navContent}>
            <h3 className={styles.label}>Menu</h3>
            <ul>
              <li style={{ transitionDelay: !trigger ? '0ms' : '700ms' }}>
                {/* Hash links are handled programmatically; allow anchor but disable Next.js rule */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href='/#home' onClick={(e) => handleNavigation(e, '/#home')}>
                  Home
                </a>
              </li>
              <li style={{ transitionDelay: !trigger ? '0ms' : '900ms' }}>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href='/#about'
                  onClick={(e) => handleNavigation(e, '/#about')}>
                  About
                </a>
              </li>
              <li style={{ transitionDelay: !trigger ? '0ms' : '1100ms' }}>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href='/#portfolio'
                  onClick={(e) => handleNavigation(e, '/#portfolio')}>
                  Portfolio
                </a>
              </li>
              <li style={{ transitionDelay: !trigger ? '0ms' : '1300ms' }}>
                <Link href='/blog' onClick={close} className={styles.link}>
                  Blog
                </Link>
              </li>
              <li style={{ transitionDelay: !trigger ? '0ms' : '1500ms' }}>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href='/#contact'
                  onClick={(e) => handleNavigation(e, '/#contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div
            className={`${styles.navFooter} ${
              toggle_ === 'ready' ? styles.ready : ''
            }`}>
            <p>© 2025 Brandon B.</p>
          </div>
        </div>
        {/* /Navigation Content */}
      </div>
    </Fragment>
  );
};

export default Nav;
