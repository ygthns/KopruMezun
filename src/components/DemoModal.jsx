import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

const FORM_NAME = 'demo-request';

const COPY = {
  tr: {
    title: 'Canlı Demo İste',
    description: 'Formu doldurun; Türkiye’deki ekip arkadaşlarımız 24 saat içinde sizinle iletişime geçsin.',
    name: 'Ad Soyad',
    organisation: 'Kurum',
    email: 'İş E-postası',
    segment: 'Segment',
    segments: ['Üniversite / Okul', 'STK / Vakıf', 'Kurumsal Alumni', 'Dernek / Oda'],
    need: 'Öncelikli İhtiyacınız',
    placeholder: 'Mentorluk, bağış kampanyası, etkinlik yönetimi...',
    submit: 'Talebimi Gönder',
    submitting: 'Gönderiliyor...',
    successTitle: 'Teşekkürler!',
    successBody: 'Başvurunuz kaydedildi. Türkiye’deki ekip arkadaşlarımız en kısa sürede sizinle iletişime geçecek.',
    close: 'Kapat',
    closeAria: 'Demoyu kapat',
    error: 'Gönderirken bir sorun oluştu. Lütfen tekrar deneyin.',
    honeypot: 'Bu alanı boş bırakın.',
  },
  en: {
    title: 'Request a Live Demo',
    description: 'Share your details and our team in Turkey will reach out within 24 hours.',
    name: 'Full Name',
    organisation: 'Organisation',
    email: 'Work Email',
    segment: 'Segment',
    segments: ['University / School', 'NGO / Foundation', 'Corporate Alumni', 'Association / Chamber'],
    need: 'Primary Need',
    placeholder: 'Mentoring, fundraising campaign, event management...',
    submit: 'Submit Request',
    submitting: 'Sending…',
    successTitle: 'Thank you!',
    successBody: 'Your request has been recorded. Our team in Turkey will contact you shortly.',
    close: 'Close',
    closeAria: 'Close demo request modal',
    error: 'Something went wrong. Please try again.',
    honeypot: 'Leave this field empty.',
  },
};

const DemoModal = ({ language, isOpen, onClose }) => {
  const copy = COPY[language];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    segment: copy.segments[0],
    need: '',
  });
  const nameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setErrorMessage('');
      setFormData({
        name: '',
        organization: '',
        email: '',
        segment: copy.segments[0],
        need: '',
      });
      window.setTimeout(() => {
        nameRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, language, copy.segments]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage('');
    const payload = {
      'form-name': FORM_NAME,
      ...formData,
      language,
    };

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-label={copy.closeAria}
            >
              <XCircle className="h-5 w-5" aria-hidden="true" />
            </button>
            {!isSubmitted ? (
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                data-netlify="true"
                netlify-honeypot="bot-field"
                name={FORM_NAME}
                method="POST"
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <div className="hidden" aria-hidden="true">
                  <label>
                    {copy.honeypot}
                    <input name="bot-field" />
                  </label>
                </div>
                <div>
                  <h2 id="demo-modal-title" className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {copy.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{copy.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {copy.name}
                    <input
                      ref={nameRef}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {copy.organisation}
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {copy.email}
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {copy.segment}
                    <select
                      name="segment"
                      value={formData.segment}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    >
                      {copy.segments.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {copy.need}
                  <textarea
                    name="need"
                    rows="3"
                    value={formData.need}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    placeholder={copy.placeholder}
                  />
                </label>
                {errorMessage && (
                  <p className="text-sm font-medium text-rose-600 dark:text-rose-400" role="alert">
                    {errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-70"
                >
                  {isSubmitting ? copy.submitting : copy.submit}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" aria-hidden="true" />
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{copy.successTitle}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">{copy.successBody}</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
                >
                  {copy.close}
                </button>
              </div>
            )}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

DemoModal.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DemoModal;
