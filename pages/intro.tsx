import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Cursor from '../src/layouts/Cursor';
import { customCursor } from '../src/utilits';

const Intro: React.FC = () => {
  useEffect(() => {
    customCursor();
    document.querySelector('body')?.classList.add('light');
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Brandon Bowen | Portfolio</title>
      </Head>
      <div className='resumo_fn_intro'>
        <div className='divider'></div>
        <div className='intro_content'>
          <div className='title_holder'>
            <h3>
              <Link href='/intro'>Brandon Bowen</Link>
            </h3>
            <p>Personal website with portfolio</p>
          </div>
          <div className='v_list'></div>
        </div>
        <footer id='footer'>
          <div className='footer_content'></div>
        </footer>
      </div>
      <Cursor />
    </Fragment>
  );
};

export default Intro;
