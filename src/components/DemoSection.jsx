import PropTypes from 'prop-types';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Play, Users, Goal, BarChart3 } from 'lucide-react';
import { useFadeInUp, useHoverLift } from '../hooks/useMotionPreferences';

const COPY = {
  tr: {
    title: 'Platform Turunu İzleyin',
    description:
      'Demoda; mezun profil deneyimini, mentorluk akışlarının nasıl yapılandırıldığını ve veri egemenliği kontrollerini adım adım gösteriyoruz.',
    button: 'Canlı Demo İste',
    note: 'Formu doldurun, 24 saat içinde size dönüş yapalım.',
    steps: [
      {
        title: 'Topluluğu Kurun',
        description: 'Markalı portalınızı hazırlayın, mevcut verinizi güvenle aktarın.',
        icon: Users,
      },
      {
        title: 'Mentorluğu Başlatın',
        description: 'Akıllı eşleştirme ile mentorluk akışlarını dakikalar içinde oluşturun.',
        icon: Goal,
      },
      {
        title: 'Etkileşimi Ölçün',
        description: 'Kampanya ve program performansını gerçek zamanlı analiz edin.',
        icon: BarChart3,
      },
    ],
  },
  en: {
    title: 'Watch the Product Tour',
    description:
      'See how alumni profiles, mentoring flows, and data-sovereignty controls come together step by step in our guided demo.',
    button: 'Request Live Demo',
    note: 'Submit the form and we will reach out within 24 hours.',
    steps: [
      {
        title: 'Launch Your Community',
        description: 'Prepare your branded portal and migrate existing data securely.',
        icon: Users,
      },
      {
        title: 'Kick-start Mentoring',
        description: 'Build mentoring flows in minutes with intelligent matching.',
        icon: Goal,
      },
      {
        title: 'Measure Engagement',
        description: 'Track programme and campaign performance in real time.',
        icon: BarChart3,
      },
    ],
  },
};

const DemoSection = ({ language, onDemoClick }) => {
  const copy = COPY[language];
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
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{copy.title}</h3>
              <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">{copy.description}</p>
              <button
                type="button"
                onClick={onDemoClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {copy.button}
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400">{copy.note}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {copy.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Motion.div
                  key={`${step.title}-${language}`}
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
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
  onDemoClick: PropTypes.func.isRequired,
};

export default DemoSection;
