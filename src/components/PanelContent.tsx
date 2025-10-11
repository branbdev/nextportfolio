import React, { useEffect } from 'react';

declare global {
  interface Window {
    Typed?: any;
  }
}

const PanelContent: React.FC = () => {
  useEffect(() => {
    const initTyped = async () => {
      try {
        const Typed = (await import('typed.js')).default;
        new Typed('.animated_title', {
          strings: [
            'Brandon Bowen',
            'a Full Stack Engineer',
            'a Creative',
            'an Entrepreneur',
          ],
          loop: true,
          smartBackspace: false,
          typeSpeed: 40,
          startDelay: 700,
          backDelay: 3000,
        });
      } catch (error) {
        console.error('Error loading Typed.js:', error);
      }
    };

    initTyped();
  }, []);

  return (
    <div className='right_in'>
      <div className='right_top'>
        <div className='border1' />
        <div className='border2' />
        <div className='img_holder'>
          <img src='/img/thumb/me.webp' alt='my headshot' />
          <div className='abs_img' data-bg-img='/img/thumb/me.webp' />
        </div>
        <div className='title_holder'>
          <h5>Hi There! I am</h5>
          <p className='h3'>
            <span className='animated_title' />
          </p>
        </div>
      </div>
      <div className='right_bottom'>
        <a href='#contact'>
          <span className='circle' />
          <span className='text'>
            I'm actively seeking a<br className='break-mobile' /> full-time
            role!
          </span>
        </a>
      </div>
    </div>
  );
};

export default PanelContent;
