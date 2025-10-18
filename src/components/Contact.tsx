'use client';

/**
 * @file Contact Component - WCAG AAA Accessible Contact Form
 *
 * Features:
 * - Floating label pattern with proper label associations
 * - Real-time validation feedback
 * - reCAPTCHA integration for spam prevention
 * - Honeypot field for bot detection
 * - EmailJS integration for form submission
 * - Screen reader friendly with role="alert" for feedback
 * - Keyboard accessible throughout
 * - Error states with aria-invalid
 * - Success/error feedback with auto-dismiss
 *
 * Accessibility Considerations:
 * - All inputs have associated labels (floating pattern)
 * - Required fields clearly marked with *
 * - Focus indicators meet WCAG 2.1 Level AA (3:1 contrast)
 * - Error messages announced to screen readers
 * - Submit button meets minimum touch target (44x44px)
 * - Keyboard navigation fully supported
 */

import React, { useState, FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';
import dynamic from 'next/dynamic';
import { siteData } from './siteData';
import { IconGithub, IconLinkedIn, IconMail } from './Icons';
import styles from '@/styles/components/Contact.module.css';

// Lazy-load reCAPTCHA to avoid blocking initial render
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
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [active, setActive] = useState<ActiveField>(null);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

    // Honeypot check: if filled, it's a bot - silently exit
    const honeypot = formData.get('website') as string;
    if (honeypot) {
      return;
    }

    const emailValue = formData.get('email') as string;
    const nameValue = formData.get('name') as string;

    // Validate required fields
    if (!emailValue || !nameValue || !recaptchaToken) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_aht8d0r',
        'template_ssz1szh',
        formElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);

      // Reset form
      formElement.reset();
      setForm({ email: '', name: '', subject: '', message: '' });
      setActive(null);
    } catch (err) {
      console.error('Form submission failed:', err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id='contact'
      className={styles.contactSection}
      aria-labelledby='contact-title'>
      <div className={styles.container}>
        <div className={styles.contactWrapper}>
          {/* Main Title */}
          <div className={styles.mainTitle}>
            <p className={styles.subtitle} aria-label='Section label'>
              Contact
            </p>
            <h2 id='contact-title' className={styles.title}>
              Ready to Discuss a Role?
            </h2>
            <p className={styles.desc}>
              If you are building robust systems and need a detail-oriented
              engineer specializing in TypeScript, .NET, and advanced backend
              architecture, please reach out using the form below to schedule a
              discussion.
            </p>
          </div>

          {/* Contact Form */}
          <form
            className={styles.contactForm}
            onSubmit={onSubmit}
            noValidate
            aria-label='Contact form'>
            {/* Success Message */}
            <div
              className={`${styles.feedbackMessage} ${styles.successMessage} ${
                success ? styles.show : ''
              }`}
              role='alert'
              aria-live='polite'
              style={{ display: success ? 'block' : 'none' }}>
              <span>
                Your message has been received. I will contact you soon!
              </span>
            </div>

            {/* Error Message */}
            <div
              className={`${styles.feedbackMessage} ${styles.errorMessage} ${
                error ? styles.show : ''
              }`}
              role='alert'
              aria-live='assertive'
              style={{ display: error ? 'block' : 'none' }}>
              <span>
                Please fill all required fields and complete the reCAPTCHA.
              </span>
            </div>

            <div className={styles.itemsWrap}>
              <div className={styles.items}>
                {/* Name Field */}
                <div className={`${styles.item} ${styles.half}`}>
                  <div
                    className={`${styles.inputWrapper} ${
                      active === 'name' || name ? styles.active : ''
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
                      required
                      aria-required='true'
                      aria-invalid={error && !name ? 'true' : 'false'}
                      placeholder=' '
                    />
                    <label htmlFor='name' className={styles.movingPlaceholder}>
                      Name
                    </label>
                  </div>
                </div>

                {/* Honeypot Field - Hidden from users, visible to bots */}
                <div className={styles.honeypot} aria-hidden='true'>
                  <label htmlFor='website'>Website</label>
                  <input
                    type='text'
                    name='website'
                    id='website'
                    tabIndex={-1}
                    autoComplete='off'
                  />
                </div>

                {/* Email Field */}
                <div className={`${styles.item} ${styles.half}`}>
                  <div
                    className={`${styles.inputWrapper} ${
                      active === 'email' || email ? styles.active : ''
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
                      required
                      aria-required='true'
                      aria-invalid={error && !email ? 'true' : 'false'}
                      placeholder=' '
                    />
                    <label htmlFor='email' className={styles.movingPlaceholder}>
                      Email
                    </label>
                  </div>
                </div>

                {/* Subject Field (Optional) */}
                <div className={styles.item}>
                  <div
                    className={`${styles.inputWrapper} ${
                      active === 'subject' || subject ? styles.active : ''
                    }`}
                    data-optional='true'>
                    <input
                      onFocus={() => setActive('subject')}
                      onBlur={() => setActive(null)}
                      id='subject'
                      onChange={onChange}
                      value={subject}
                      name='subject'
                      type='text'
                      autoComplete='off'
                      placeholder=' '
                    />
                    <label
                      htmlFor='subject'
                      className={styles.movingPlaceholder}>
                      Subject
                    </label>
                  </div>
                </div>

                {/* Message Field (Optional) */}
                <div className={styles.item}>
                  <div
                    className={`${styles.inputWrapper} ${
                      active === 'message' || message ? styles.active : ''
                    }`}
                    data-optional='true'>
                    <textarea
                      onFocus={() => setActive('message')}
                      onBlur={() => setActive(null)}
                      name='message'
                      onChange={onChange}
                      value={message}
                      id='message'
                      autoComplete='off'
                      placeholder=' '
                      rows={6}
                    />
                    <label
                      htmlFor='message'
                      className={styles.movingPlaceholder}>
                      Message
                    </label>
                  </div>
                </div>

                {/* reCAPTCHA */}
                <div className={styles.item}>
                  <div className={styles.recaptchaWrapper}>
                    <ReCAPTCHA
                      onVerify={(token) => setRecaptchaToken(token ?? '')}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className={styles.item}>
                  <button
                    className={styles.submitButton}
                    type='submit'
                    id='send_message'
                    disabled={isSubmitting}
                    aria-label={
                      isSubmitting ? 'Sending message...' : 'Send message'
                    }>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <p>Location</p>
            <h3>{siteData.location}</h3>
            <div className={styles.linksContainer}>
              <a
                className={styles.contactLink}
                href={`mailto:${siteData.email}`}
                aria-label={`Send email to ${siteData.email}`}>
                <IconMail size={18} />
                <span>{siteData.email}</span>
              </a>
              <a
                className={styles.contactLink}
                href={siteData.github}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visit GitHub profile (opens in new tab)'>
                <IconGithub size={18} />
                <span>GitHub</span>
              </a>
              <a
                className={styles.contactLink}
                href={siteData.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visit LinkedIn profile (opens in new tab)'>
                <IconLinkedIn size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
