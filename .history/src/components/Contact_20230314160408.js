import { useState } from 'react';
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

  const onSubmit = (e) => {
    e.preventDefault();

    if (email && name && subject && message) {
      setSuccess(true);
      emailjs
        .sendForm(
          'service_gqjceqa',
          'template_wz583e7',
          e.target,
          'bOBPvsrEac-7DQaGD'
        )
        .then((result) => {
          console.log(result.text);
        }, 2000);
      e.target.reset();
      setTimeout(() => {
        setForm({ email: '', name: '', subject: '', message: '' });
      });
    } else {
      setError(true);
      setSuccess(false);
      (error) => {
        console.log(error);
      };
      setTimeout(() => {
        setError(false);
      }, 2000);
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
                      required
                    />
                    <span className='moving_placeholder'>Name *</span>
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
                      required
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
                      required
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
                      required
                    />
                    <span className='moving_placeholder'>Message</span>
                  </div>
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
            <h3>Austin, TX</h3>
            {/* <p>Phone</p>
            <h3>
              <a href="tel:+7068980751">(+706) 898-0751</a>
            </h3> */}
            <p>
              <a className='fn__link' href='mailto:brandonbowenbiz@gmail.com'>
                brandonbowenbiz@gmail.com
              </a>
              <br />
              <br />
              <a
                className='fn__link'
                href='https://github.com/brandonbdev'
                target='_blank'
                rel='noreferrer'>
                GitHub
              </a>
              <br />
              <br />
              <a
                className='fn__link'
                href='https://www.linkedin.com/in/brandon-bowen-4a9369199/'
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
