import { useEffect } from 'react';

const ReCAPTCHA = ({ onVerify }) => {
  useEffect(() => {
    const loadReCAPTCHA = () => {
      if (window.grecaptcha) {
        window.grecaptcha.render('g-recaptcha', {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          callback: onVerify, // Callback when reCAPTCHA is completed
        });
      }
    };

    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      script.onload = loadReCAPTCHA;
      document.body.appendChild(script);
    } else {
      loadReCAPTCHA();
    }
  }, [onVerify]);

  return <div id="g-recaptcha" className="g-recaptcha" />;
};

export default ReCAPTCHA;