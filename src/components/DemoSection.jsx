import PropTypes from 'prop-types';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Play, Users, Goal, BarChart3 } from 'lucide-react';
import { useFadeInUp, useHoverLift } from '../hooks/useMotionPreferences';

const steps = [
  {
    title: 'Toplulu\u011fu Kurun',
    description: 'Markal\u0131 portal\u0131n\u0131z\u0131 haz\u0131rlay\u0131n, mevcut verinizi g\u00fcvenle aktar\u0131n.',
    icon: Users,
  },
  {
    title: 'Mentorlu\u011fu Ba\u015flat\u0131n',
    description: 'Ak\u0131ll\u0131 e\u015fle\u015ftirme ile mentorluk ak\u0131\u015flar\u0131n\u0131 dakikalar i\u00e7inde olu\u015fturun.',
    icon: Goal,
  },
  {
    title: 'Etkile\u015fimi \u00d6l\u00e7\u00fcn',
    description: 'Kampanya ve program performans\u0131n\u0131 ger\u00e7ek zamanl\u0131 analiz edin.',
    icon: BarChart3,
  },
];

const DemoSection = ({ onDemoClick }) => {
  const fadeHeading = useFadeInUp();
  const shouldReduceMotion = useReducedMotion();
  const hoverLift = useHoverLift();

  return (
    <section id="demo" className="bg-white py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),340px]" {...fadeHeading}>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20" aria-hidden="true" />
            <div className="relative flex h-full flex-col items-center justify-center gap-6 rounded-2xl border border-white/30 bg-white/80 p-10 text-center backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
                <Play className="h-10 w-10" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Platform Turunu \u0130zleyin</h3>
              <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">
                Demoda; mezun profil deneyimini, mentorluk ak\u0131\u015flar\u0131n\u0131n nas\u0131l yap\u0131land\u0131r\u0131ld\u0131\u011f\u0131n\u0131 ve veri egemenli\u011fi kontrollerini ad\u0131m ad\u0131m g\u00f6steriyoruz.
              </p>
              <button
                type="button"
                onClick={onDemoClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Canl\u0131 Demo \u0130ste
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400">Formu doldurun, 24 saat i\u00e7inde size d\u00f6n\u00fc\u015f yapal\u0131m.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Motion.div
                  key={step.title}
                  className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: 40 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
                  {...hoverLift}
                >
                  <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{step.title}</h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

DemoSection.propTypes = {
  onDemoClick: PropTypes.func.isRequired,
};

export default DemoSection;
