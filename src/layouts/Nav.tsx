import React, { Fragment, useEffect, useState } from 'react';
import styles from './Nav.module.css';

interface NavProps {
  close: () => void;
  trigger: boolean;
}

const Nav: React.FC<NavProps> = ({ close, trigger }) => {
  const [toggle_, setToggle_] = useState<string>('');

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
                <a href='#home' onClick={close}>
                  Home
                </a>
              </li>
              <li style={{ transitionDelay: !trigger ? '0ms' : '900ms' }}>
                <a onClick={close} href='#about'>
                  About
                </a>
              </li>
              <li style={{ transitionDelay: !trigger ? '0ms' : '1100ms' }}>
                <a onClick={close} href='#portfolio'>
                  Portfolio
                </a>
              </li>
              <li style={{ transitionDelay: !trigger ? '0ms' : '1300ms' }}>
                <a onClick={close} href='#blog'>
                  Blog - Coming Soon!
                </a>
              </li>
              <li style={{ transitionDelay: !trigger ? '0ms' : '1500ms' }}>
                <a onClick={close} href='#contact'>
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
