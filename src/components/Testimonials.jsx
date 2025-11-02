import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const COPY = {
  tr: {
    title: 'Ne dediler?',
    description: 'Mezun topluluklarını Türkiye’de yönetmek isteyen kurumların gerçek ihtiyaçlarından doğan geri bildirimler.',
    testimonials: [
      {
        quote: 'KöprüMezun, mezun ağımızı görünür ve ölçülebilir hale getirdi.',
        name: 'Ayşe K.',
        title: 'Alumni İlişkileri Direktörü',
      },
      {
        quote: 'Mentorluk eşleşmelerimizin kalitesi belirgin şekilde arttı.',
        name: 'Mert T.',
        title: 'Kariyer Merkezi Müdürü',
      },
    ],
    prevLabel: 'Önceki referans',
    nextLabel: 'Sonraki referans',
  },
  en: {
    title: 'What they say',
    description: 'Feedback from institutions that manage their alumni communities across Turkey.',
    testimonials: [
      {
        quote: 'KöprüMezun made our alumni network visible and measurable.',
        name: 'Ayşe K.',
        title: 'Director of Alumni Relations',
      },
      {
        quote: 'The quality of our mentoring matches has increased dramatically.',
        name: 'Mert T.',
        title: 'Head of Career Centre',
      },
    ],
    prevLabel: 'Previous testimonial',
    nextLabel: 'Next testimonial',
  },
};

const Testimonials = ({ language }) => {
  const copy = COPY[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const fadeHeading = useFadeInUp();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % copy.testimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [copy.testimonials.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [language]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + copy.testimonials.length) % copy.testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % copy.testimonials.length);
  };

  const activeTestimonial = copy.testimonials[activeIndex];

  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">{copy.description}</p>
        </Motion.div>
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <AnimatePresence mode="wait">
              <Motion.blockquote
                key={`${activeTestimonial.quote}-${language}`}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -20 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, ease: 'easeOut' }}
                className="text-center"
              >
                <Quote className="mx-auto h-10 w-10 text-indigo-500" aria-hidden="true" />
                <p className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{activeTestimonial.quote}</p>
                <footer className="mt-6 text-sm text-slate-500 dark:text-slate-300">
                  <span className="font-semibold text-slate-700 dark:text-slate-100">{activeTestimonial.name}</span> — {activeTestimonial.title}
                </footer>
              </Motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
              aria-label={copy.prevLabel}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2">
              {copy.testimonials.map((_, index) => (
                <button
                  key={`${language}-dot-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-8 rounded-full transition ${index === activeIndex ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                  aria-label={`${language === 'tr' ? 'Referans' : 'Testimonial'} ${index + 1}`}
                  aria-pressed={index === activeIndex}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
              aria-label={copy.nextLabel}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

Testimonials.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default Testimonials;
