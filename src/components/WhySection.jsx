import PropTypes from 'prop-types';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useFadeInUp, useHoverLift } from '../hooks/useMotionPreferences';

const COPY = {
  tr: {
    title: 'Neden KöprüMezun?',
    description: 'Mezun ve topluluk yönetiminin kritik yapı taşlarını tek platformda, Türkiye sınırları içinde güvenle birleştiriyoruz.',
    values: [
      { title: 'Daha Güçlü Bağlar', description: 'Mezun-öğrenci etkileşimini kalıcı ilişkilere dönüştürün.' },
      { title: 'Ölçeklenebilir Programlar', description: 'Yüzlerce mentorluk eşleşmesini kolayca yönetin.' },
      { title: 'Veri Türkiye’de', description: 'KVKK odaklı mimari ile veriler yurt içinde saklanır.' },
      { title: 'Kolay Kurulum', description: 'Saatler içinde markalı portalınız hazır.' },
    ],
  },
  en: {
    title: 'Why KöprüMezun?',
    description: 'We unite the critical building blocks of alumni and community management on one secure platform within Turkey’s borders.',
    values: [
      { title: 'Stronger Connections', description: 'Turn alumni-student engagement into lasting relationships.' },
      { title: 'Scalable Programs', description: 'Easily manage hundreds of mentorship matches.' },
      { title: 'Data in Turkey', description: 'Data is hosted domestically with a KVKK-first architecture.' },
      { title: 'Rapid Launch', description: 'Deploy your branded portal in just a few hours.' },
    ],
  },
};

const WhySection = ({ language }) => {
  const copy = COPY[language];
  const fadeHeading = useFadeInUp();
  const hoverLift = useHoverLift();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">{copy.description}</p>
        </Motion.div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {copy.values.map((value, index) => (
            <Motion.div
              key={value.title}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
              {...hoverLift}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-slate-100">{value.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{value.description}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

WhySection.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default WhySection;
