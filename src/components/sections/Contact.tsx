"use client";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiSmile, FiAlertCircle } from 'react-icons/fi';
import styles from "../../styles/Contact.module.scss";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleFocus = useCallback((fieldName: string) => {
    setFocusedField(fieldName);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedField(null);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xkgzvdkv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setShowPopup(true);
        console.log('Form submitted successfully to Formspree');
      } else {
        throw new Error('Formspree submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Auto-hide popup after 5 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.contactSection} id="contact">
      {/* Mini Popup Toast */}
      {showPopup && (
        <div className={`${styles.popupToast} ${submitStatus === 'success' ? styles.success : styles.error}`}>
          <div className={styles.popupContent}>
            {submitStatus === 'success' ? (
              <FiSmile size={20} />
            ) : (
              <FiAlertCircle size={20} />
            )}
            <span>
              {submitStatus === 'success'
                ? "Your query is registered and will be verified by Zecure. We'll get back to you soon!"
                : "Oops! Something went wrong. Please try again later."}
            </span>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>05.</span>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <div className={styles.divider} aria-hidden="true"></div>
        </div>

        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <div className={`${styles.infoBlock} ${styles.animateOnScroll}`}>
              <h3 className={styles.infoTitle}>Let's Work Together</h3>
              <p className={styles.infoDescription}>
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question about my work, want to discuss a potential collaboration, 
                or just want to say hello, I'd love to hear from you. Let's create something amazing together!
              </p>
            </div>

            <div className={`${styles.quickInfo} ${styles.animateOnScroll}`}>
              <div className={styles.quickInfoItem}>
                <div className={styles.quickInfoHeader}>
                  <div className={styles.quickInfoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className={styles.quickInfoLabel}>Location</span>
                </div>
                <span className={styles.quickInfoValue}>Pune, India 411001</span>
              </div>

              <div className={styles.quickInfoItem}>
                <div className={styles.quickInfoHeader}>
                  <div className={styles.quickInfoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={styles.quickInfoLabel}>Response Time</span>
                </div>
                <span className={styles.quickInfoValue}>Within 24 hours</span>
              </div>

              <div className={styles.quickInfoItem}>
                <div className={styles.quickInfoHeader}>
                  <div className={styles.quickInfoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={styles.quickInfoLabel}>Availability</span>
                </div>
                <span className={styles.quickInfoValue}>Open to opportunities</span>
              </div>

              <div className={styles.quickInfoItem}>
                <div className={styles.quickInfoHeader}>
                  <div className={styles.quickInfoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={styles.quickInfoLabel}>Email</span>
                </div>
                <span className={styles.quickInfoValue}>samarth.patil3101@gmail.com</span>
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            <form ref={formRef} onSubmit={handleSubmit} className={`${styles.form} ${styles.animateOnScroll}`}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Send me a message</h3>
                <p className={styles.formSubtitle}>I'll get back to you as soon as possible</p>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={`${styles.formInput} ${focusedField === 'name' ? styles.focused : ''} ${formData.name ? styles.hasValue : ''}`}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`${styles.formInput} ${focusedField === 'email' ? styles.focused : ''} ${formData.email ? styles.hasValue : ''}`}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.formLabel}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  className={`${styles.formInput} ${focusedField === 'subject' ? styles.focused : ''} ${formData.subject ? styles.hasValue : ''}`}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  className={`${styles.formTextarea} ${focusedField === 'message' ? styles.focused : ''} ${formData.message ? styles.hasValue : ''}`}
                  required
                  placeholder="Tell me about your project, ask a question, or just say hello..."
                  rows={6}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className={styles.spinner}></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="m5 12 7-7 7 7M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
