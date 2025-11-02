import PropTypes from 'prop-types';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useFadeInUp, useHoverLift } from '../hooks/useMotionPreferences';

const HEADING = {
  tr: 'KöprüMezun’a güvenen kurumlar',
  en: 'Organisations that trust KöprüMezun',
};

const logos = [
  { name: 'Anadolu Üniversitesi', file: 'logo1.svg' },
  { name: 'EGE Vakfı', file: 'logo2.svg' },
  { name: 'Bosphorus Alumni', file: 'logo3.svg' },
  { name: 'Anka Holding', file: 'logo4.svg' },
  { name: 'Mimarlar Derneği', file: 'logo5.svg' },
  { name: 'Yeni Nesil STK', file: 'logo6.svg' },
  { name: 'Teknokent Mezunları', file: 'logo7.svg' },
  { name: 'Kültür Koleji', file: 'logo8.svg' },
];

const TrustedBy = ({ language }) => {
  const fadeIn = useFadeInUp();
  const hoverLift = useHoverLift();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Motion.h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400" {...fadeIn}>
          {HEADING[language]}
        </Motion.h2>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {logos.map((logo, index) => (
            <Motion.div
              key={logo.name}
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-4 py-5 transition-shadow dark:border-slate-800 dark:bg-slate-900/80"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
              {...hoverLift}
            >
              <img
                src={`/logos/${logo.file}`}
                alt={`${logo.name} logosu`}
                className="h-10 w-auto opacity-60 transition hover:opacity-100"
                loading="lazy"
              />
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

TrustedBy.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default TrustedBy;
