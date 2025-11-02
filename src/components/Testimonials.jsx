import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const testimonials = [
  {
    quote: 'K\u00f6pr\u00fcMezun, mezun a\u011f\u0131m\u0131z\u0131 g\u00f6r\u00fcn\u00fcr ve \u00f6l\u00e7\u00fclebilir hale getirdi.',
    name: 'Ay\u015fe K.',
    title: 'Alumni \u0130li\u015fkileri Direkt\u00f6r\u00fc',
  },
  {
    quote: 'Mentorluk e\u015fle\u015fmelerimizin kalitesi belirgin \u015fekilde artt\u0131.',
    name: 'Mert T.',
    title: 'Kariyer Merkezi M\u00fcd\u00fcr\u00fc',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const fadeHeading = useFadeInUp();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">Ne dediler?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Mezun topluluklar\u0131n\u0131 T\u00fcrkiye\u2019de y\u00f6netmek isteyen kurumlar\u0131n ger\u00e7ek ihtiya\u00e7lar\u0131ndan do\u011fan geri bildirimler.
          </p>
        </Motion.div>
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <AnimatePresence mode="wait">
              <Motion.blockquote
                key={activeTestimonial.quote}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -20 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, ease: 'easeOut' }}
                className="text-center"
              >
                <Quote className="mx-auto h-10 w-10 text-indigo-500" aria-hidden="true" />
                <p className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{activeTestimonial.quote}</p>
                <footer className="mt-6 text-sm text-slate-500 dark:text-slate-300">
                  <span className="font-semibold text-slate-700 dark:text-slate-100">{activeTestimonial.name}</span> \u2014 {activeTestimonial.title}
                </footer>
              </Motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
              aria-label="\u00d6nceki referans"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-8 rounded-full transition ${index === activeIndex ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                  aria-label={`Referans ${index + 1}`}
                  aria-pressed={index === activeIndex}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
              aria-label="Sonraki referans"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
