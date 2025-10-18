import React from 'react';
import ReCAPTCHAComponent from 'react-google-recaptcha';

interface ReCAPTCHAProps {
  // eslint-disable-next-line no-unused-vars
  onVerify: (token: string | null) => void;
}

const ReCAPTCHA: React.FC<ReCAPTCHAProps> = ({ onVerify }) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error(
      'reCAPTCHA site key is not configured in environment variables.'
    );
    return <div>reCAPTCHA not configured.</div>;
  }

  return <ReCAPTCHAComponent sitekey={siteKey} onChange={onVerify} />;
};

export default ReCAPTCHA;
