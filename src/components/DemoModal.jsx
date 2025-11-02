import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

const DemoModal = ({ isOpen, onClose }) => {
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
              aria-label="Demoyu kapat"
            >
              <XCircle className="h-5 w-5" aria-hidden="true" />
            </button>
            {!isSubmitted ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <h2 id="demo-modal-title" className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Canl\u0131 Demo \u0130ste
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Formu doldurun; T\u00fcrkiye\u2019deki ekip arkada\u015flar\u0131m\u0131z 24 saat i\u00e7inde sizinle ileti\u015fime ge\u00e7sin.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Ad Soyad
                    <input
                      ref={nameRef}
                      type="text"
                      name="name"
                      required
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Kurum
                    <input
                      type="text"
                      name="organization"
                      required
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    \u0130\u015f E-postas\u0131
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Segment
                    <select
                      name="segment"
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    >
                      <option>\u00dcniversite / Okul</option>
                      <option>STK / Vak\u0131f</option>
                      <option>Kurumsal Alumni</option>
                      <option>Dernek / Oda</option>
                    </select>
                  </label>
                </div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  \u00d6ncelikli \u0130htiyac\u0131n\u0131z
                  <textarea
                    name="need"
                    rows="3"
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    placeholder="Mentorluk, ba\u011f\u0131\u015f kampanyas\u0131, etkinlik y\u00f6netimi..."
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Talebimi G\u00f6nder
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" aria-hidden="true" />
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Te\u015fekk\u00fcrler!</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Ba\u015fvurunuz kaydedildi. T\u00fcrkiye\u2019deki ekip arkada\u015flar\u0131m\u0131z en k\u0131sa s\u00fcrede sizinle ileti\u015fime ge\u00e7ecek.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
                >
                  Kapat
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DemoModal;
