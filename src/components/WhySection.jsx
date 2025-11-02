import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useFadeInUp, useHoverLift } from '../hooks/useMotionPreferences';

const values = [
  {
    title: 'Daha G\u00fc\u00e7l\u00fc Ba\u011flar',
    description: 'Mezun-\u00f6\u011frenci etkile\u015fimini kal\u0131c\u0131 ili\u015fkilere d\u00f6n\u00fc\u015ft\u00fcr\u00fcn.',
  },
  {
    title: '\u00d6l\u00e7eklenebilir Programlar',
    description: 'Y\u00fczlerce mentorluk e\u015fle\u015fmesini kolayca y\u00f6netin.',
  },
  {
    title: 'Veri T\u00fcrkiye\u2019de',
    description: 'KVKK odakl\u0131 mimari ile veriler yurt i\u00e7inde saklan\u0131r.',
  },
  {
    title: 'Kolay Kurulum',
    description: 'Saatler i\u00e7inde markal\u0131 portal\u0131n\u0131z haz\u0131r.',
  },
];

const WhySection = () => {
  const fadeHeading = useFadeInUp();
  const hoverLift = useHoverLift();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">Neden K\u00f6pr\u00fcMezun?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Mezun ve topluluk y\u00f6netiminin kritik yap\u0131 ta\u015flar\u0131n\u0131 tek platformda, T\u00fcrkiye s\u0131n\u0131rlar\u0131 i\u00e7inde g\u00fcvenle birle\u015ftiriyoruz.
          </p>
        </Motion.div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((value, index) => (
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

export default WhySection;
