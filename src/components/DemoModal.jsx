import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

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
    successTitle: 'Teşekkürler!',
    successBody: 'Başvurunuz kaydedildi. Türkiye’deki ekip arkadaşlarımız en kısa sürede sizinle iletişime geçecek.',
    close: 'Kapat',
    closeAria: 'Demoyu kapat',
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
    successTitle: 'Thank you!',
    successBody: 'Your request has been recorded. Our team in Turkey will contact you shortly.',
    close: 'Close',
    closeAria: 'Close demo request modal',
  },
};

const DemoModal = ({ language, isOpen, onClose }) => {
  const copy = COPY[language];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      window.setTimeout(() => {
        nameRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
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
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                      required
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {copy.organisation}
                    <input
                      type="text"
                      name="organization"
                      required
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {copy.email}
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {copy.segment}
                    <select
                      name="segment"
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
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    placeholder={copy.placeholder}
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {copy.submit}
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
