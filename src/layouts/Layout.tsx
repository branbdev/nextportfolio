import React, { Fragment, useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import PanelContent from '../components/PanelContent';
import { aTagClick, customCursor, dataImage, sticky } from '../utilits';
import Cursor from './Cursor';
import Footer from './Footer';
import Nav from './Nav';
import Trigger from './Trigger';
import Accessibility from '../components/Accessibility';
import { Context } from '../context/Context';
import PortfolioModalbox from '../components/PortfolioModalbox';
import { GoogleAnalytics } from '@next/third-parties/google';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Layout must be used within a ContextProvider');
  }

  const { modal, modalValue, close } = context;
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    dataImage();
    customCursor();
    aTagClick();
    window.addEventListener('scroll', sticky);

    return () => {
      window.removeEventListener('scroll', sticky);
    };
  }, []);

  const triggerMenu = (): void => {
    setTrigger(!trigger);
    document
      .querySelector('.resumo_fn_wrapper')
      ?.classList.toggle('nav-opened');
  };

  return (
    <Fragment>
      <Head>
        <title>Brandon B. | Dev Portfolio</title>
      </Head>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      <div className='resumo_fn_wrapper'>
        {/* MODALBOX */}
        {modal && <PortfolioModalbox close={close} value={modalValue} />}
        {/* /MODALBOX */}
        <Accessibility />
        <div className='resumo_fn_content'>
          {/* Main Left Part */}
          <div className='resumo_fn_left'>
            {/* Page */}
            <div className='resumo_fn_page'>{children}</div>
            {/* /Page */}
            <Footer />
          </div>
          {/* /Main Left Part */}
          {/* Main Right Part */}
          <div className='resumo_fn_right'>
            {/* Menu Trigger */}
            <Trigger open={triggerMenu} />
            {/* /Menu Trigger */}
            {/* Panel Content */}
            <PanelContent />
            {/* /Panel Content */}
          </div>
          {/* /Main Right Part */}
        </div>
        {/* Right Hidden Navigation */}
        <Nav close={triggerMenu} trigger={trigger} />
        {/* /Right Hidden Navigation */}
        <Cursor />
      </div>
      {/* /Wrapper All */}
      {/* Scripts */}
      {/*[if lt IE 10]>  <![endif]*/}
      {/* /Scripts */}
    </Fragment>
  );
};

export default Layout;
