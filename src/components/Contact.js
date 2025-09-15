import { useState } from 'react';
import { siteData } from './siteData';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    subject: '',
    message: '',
  });

  const [active, setActive] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { email, name, subject, message } = form;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const name = formData.get('name');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const honeypot = formData.get('website'); // Check the honeypot field

    // 1. If the honeypot field is filled, it's a bot. Silently exit.
    if (honeypot) {
      return;
    }
    // 2. Check for required fields
    if (!email || !name) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    try {
      await emailjs.sendForm(
        'service_aht8d0r',
        'template_ssz1szh',
        e.target,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      e.target.reset();
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
            <h3 className='title'>Get In Touch</h3>
            <p className='desc'>
              If you have any suggestion, project ideas, or even if you want to
              say “hi”, please fill out the form below and I will reply you
              shortly.
            </p>
          </div>
          {/* /Main Title */}
          {/* Contact Form */}
          <form className='contact_form' onSubmit={(e) => onSubmit(e)}>
            <div
              className='success'
              data-success='Your message has been received, we will contact you soon.'
              style={{ display: success ? 'block' : 'none' }}>
              <span className='contact_success'>
                Your message has been received, we will contact you soon.
              </span>
            </div>

            <div
              className='empty_notice'
              style={{ display: error ? 'block' : 'none' }}>
              <span>Please Fill Required Fields!</span>
            </div>

            {/* */}
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
                      onChange={(e) => onChange(e)}
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
                      onChange={(e) => onChange(e)}
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
                      onChange={(e) => onChange(e)}
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
                      onChange={(e) => onChange(e)}
                      value={message}
                      id='message'
                      autoComplete='off'
                    />
                    <span className='moving_placeholder'>Message</span>
                  </div>
                </div>
                <div className='item'>
                  <div
                    className='g-recaptcha'
                    data-sitekey={
                      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                    }></div>
                </div>
                <div className='item'>
                  {/* <a id="send_message" href="#">
                    Send Message
                  </a> */}
                  <input
                    className='a'
                    type='submit'
                    id='send_message'
                    value='Send Message'
                  />
                </div>
              </div>
            </div>
          </form>
          {/* /Contact Form */}
          {/* Contact Info */}
          <div className='resumo_fn_contact_info'>
            <p>Location</p>
            <h3>{siteData.location}</h3>
            {/* <p>Phone</p>
            <h3>
              <a href="tel:+7068980751">(+706) 898-0751</a>
            </h3> */}
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
          {/* /Contact Info */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
