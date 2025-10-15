'use client';

// *TODO: "Fill all Fields" error is coupled with successful form submissions

import React, { useState, FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';
import dynamic from 'next/dynamic';
import { siteData } from './siteData';

const ReCAPTCHA = dynamic(() => import('./ReCAPTCHA'), { ssr: false });

interface FormData {
  email: string;
  name: string;
  subject: string;
  message: string;
}

type ActiveField = 'name' | 'email' | 'subject' | 'message' | null;

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    email: '',
    name: '',
    subject: '',
    message: '',
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string>(''); // Store the reCAPTCHA token
  const [active, setActive] = useState<ActiveField>(null);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { email, name, subject, message } = form;

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    // Retrieve the honeypot field value
    const honeypot = formData.get('website') as string; // Check the honeypot field
    const emailValue = formData.get('email') as string;
    const nameValue = formData.get('name') as string;

    // 1. If the honeypot field is filled, it's a bot. Silently exit.
    if (honeypot) {
      return;
    }

    // 2. Check for required fields, including the reCAPTCHA token
    if (!emailValue || !nameValue || !recaptchaToken) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    try {
      await emailjs.sendForm(
        'service_aht8d0r',
        'template_ssz1szh',
        formElement, // Pass the form element, NOT formData
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      formElement.reset();
      setForm({ email: '', name: '', subject: '', message: '' });
    } catch (err) {
      console.error('FAILED...', err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <section id='contact'>
      <div className='container'>
        <div className='roww resumo_fn_contact'>
          {/* Main Title */}
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>Contact</h3>
            <h3 className='title'>Ready to Discuss a Role?</h3>
            <p className='desc'>
              If you are building robust systems and need a detail-oriented
              engineer specializing in Typescript, .NET, and advanced backend
              architecture, please reach out using the form below to schedule a
              discussion.
            </p>
          </div>

          {/* Form */}
          <form className='contact_form' onSubmit={onSubmit}>
            <div
              className='success'
              data-success='Your message has been received, we will contact you soon.'
              style={{ display: success ? 'block' : 'none' }}>
              <span className='contact_success'>
                Your message has been received, I will contact you soon.
              </span>
            </div>

            <div
              className='empty_notice'
              style={{ display: error ? 'block' : 'none' }}>
              <span>Please Fill Required Fields!</span>
            </div>
            <div className='items_wrap'>
              <div className='items'>
                <div className='item half'>
                  <div
                    className={`input_wrapper ${
                      active === 'name' || name ? 'active' : ''
                    }`}>
                    <input
                      onFocus={() => setActive('name')}
                      onBlur={() => setActive(null)}
                      onChange={onChange}
                      value={name}
                      name='name'
                      id='name'
                      type='text'
                      autoComplete='name'
                    />
                    <span className='moving_placeholder'>Name *</span>
                  </div>
                </div>
                {/* Honeypot Field: Hidden from users, but bots will see it */}
                <div className='item' style={{ display: 'none' }}>
                  <div className='input_wrapper'>
                    <input
                      type='text'
                      name='website'
                      id='website'
                      tabIndex={-1}
                      autoComplete='off'
                    />
                  </div>
                </div>
                <div className='item half'>
                  <div
                    className={`input_wrapper ${
                      active === 'email' || email ? 'active' : ''
                    }`}>
                    <input
                      onFocus={() => setActive('email')}
                      onBlur={() => setActive(null)}
                      onChange={onChange}
                      value={email}
                      name='email'
                      id='email'
                      type='email'
                      autoComplete='email'
                    />
                    <span className='moving_placeholder'>Email *</span>
                  </div>
                </div>
                <div className='item'>
                  <div
                    className={`input_wrapper ${
                      active === 'subject' || subject ? 'active' : ''
                    }`}>
                    <input
                      onFocus={() => setActive('subject')}
                      onBlur={() => setActive(null)}
                      id='subject'
                      onChange={onChange}
                      value={subject}
                      name='subject'
                      type='text'
                      autoComplete='off'
                    />
                    <span className='moving_placeholder'>Subject</span>
                  </div>
                </div>
                <div className='item'>
                  <div
                    className={`input_wrapper ${
                      active === 'message' || message ? 'active' : ''
                    }`}>
                    <textarea
                      onFocus={() => setActive('message')}
                      onBlur={() => setActive(null)}
                      name='message'
                      onChange={onChange}
                      value={message}
                      id='message'
                      autoComplete='off'
                    />
                    <span className='moving_placeholder'>Message</span>
                  </div>
                </div>
                <div className='item'>
                  <ReCAPTCHA
                    onVerify={(token) => setRecaptchaToken(token ?? '')}
                  />
                </div>
                <div className='item'>
                  <input
                    className='a'
                    type='submit'
                    id='send_message'
                    value='Send Message'
                  />
                </div>
              </div>
            </div>
            <div
              className='returnmessage'
              data-success="Your message has been received. If you don't hear back from me within 24 hours, feel free to reach out through the links below."></div>
          </form>

          {/* Contact Info */}
          <div className='resumo_fn_contact_info'>
            <p>Location</p>
            <h3>{siteData.location}</h3>
            <p>
              <a className='fn__link' href={`mailto:${siteData.email}`}>
                {siteData.email}
              </a>
              <br />
              <br />
              <a
                className='fn__link'
                href={siteData.github}
                target='_blank'
                rel='noreferrer'>
                GitHub
              </a>
              <br />
              <br />
              <a
                className='fn__link'
                href={siteData.linkedin}
                target='_blank'
                rel='noreferrer'>
                Linkedin
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
