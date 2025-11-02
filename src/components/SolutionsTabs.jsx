import { useState } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GraduationCap, HeartHandshake, Building2, Users2 } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const segments = [
  {
    key: 'universiteler',
    title: '\u00dcniversiteler & Okullar',
    description: 'Mezun-\u00f6\u011frenci k\u00f6pr\u00fcs\u00fc, mentorluk, kariyer ve ba\u011f\u0131\u015f\u0131 bir araya getirin.',
    icon: GraduationCap,
    highlights: [
      'Mezun takibi ve ileti\u015fim segmentasyonu',
      '\u00d6\u011frenci-mentor e\u015fle\u015ftirmeleri ve kariyer destekleri',
      'Burs ve ba\u011f\u0131\u015f kampanyalar\u0131n\u0131 tek panelden y\u00f6netin',
    ],
  },
  {
    key: 'stk',
    title: 'STK & Vak\u0131flar',
    description: 'G\u00f6n\u00fcll\u00fc havuzlar\u0131, kampanya ileti\u015fimi, etki \u00f6l\u00e7\u00fcm\u00fc.',
    icon: HeartHandshake,
    highlights: [
      'G\u00f6n\u00fcll\u00fc e\u015fle\u015ftirme ve kat\u0131l\u0131m takibi',
      'Etki raporlar\u0131 ve raporlama otomasyonu',
      'Kampanya duyurular\u0131 i\u00e7in segment edilmi\u015f ileti\u015fim',
    ],
  },
  {
    key: 'kurumsal',
    title: 'Kurumsal Alumni',
    description: '\u0130\u015fe al\u0131m, topluluk el\u00e7ileri, marka savunuculu\u011fu.',
    icon: Building2,
    highlights: [
      'Marka el\u00e7isi programlar\u0131 ve i\u00e7erik ak\u0131\u015flar\u0131',
      'Kariyer f\u0131rsatlar\u0131n\u0131n alumni a\u011f\u0131na yay\u0131lmas\u0131',
      'SSO ve kurumsal g\u00fcvenlik katmanlar\u0131',
    ],
  },
  {
    key: 'dernek',
    title: 'Dernek & Odalar',
    description: '\u00dcyelik ya\u015fam d\u00f6ng\u00fcs\u00fc, alt topluluklar, aidat ileti\u015fimi.',
    icon: Users2,
    highlights: [
      '\u00dcyelik yenileme ve aidat hat\u0131rlatmalar\u0131',
      'Yerel \u015fubeler i\u00e7in alt topluluk yap\u0131s\u0131',
      'Etkinlik ve e\u011fitim duyurular\u0131n\u0131 kolayla\u015ft\u0131r\u0131n',
    ],
  },
];

const SolutionsTabs = () => {
  const [activeKey, setActiveKey] = useState(segments[0].key);
  const fadeHeading = useFadeInUp();
  const shouldReduceMotion = useReducedMotion();

  const activeSegment = segments.find((segment) => segment.key === activeKey);

  return (
    <section id="cozumler" className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">Segmentlere g\u00f6re \u00e7\u00f6z\u00fcmler</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">
            K\u00f6pr\u00fcMezun, farkl\u0131 topluluk tiplerinin benzersiz ihtiya\u00e7lar\u0131na g\u00f6re yap\u0131land\u0131r\u0131labilir. Sekt\u00f6r\u00fcn\u00fcze \u00f6zel ak\u0131\u015flar, i\u00e7erikler ve programlar olu\u015fturun.
          </p>
        </Motion.div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[320px,minmax(0,1fr)] lg:items-start">
          <div className="flex w-full gap-3 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:flex-col lg:overflow-visible">
            {segments.map((segment) => {
              const Icon = segment.icon;
              const isActive = segment.key === activeKey;
              return (
                <button
                  key={segment.key}
                  type="button"
                  onClick={() => setActiveKey(segment.key)}
                  className={`flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-soft'
                      : 'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/80'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{segment.title}</p>
                    <p className="text-xs opacity-80">{segment.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <AnimatePresence mode="wait">
              <Motion.div
                key={activeSegment.key}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -16 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.4, ease: 'easeOut' }}
              >
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{activeSegment.title}</h3>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">{activeSegment.description}</p>
                <ul className="mt-6 grid gap-4 text-sm text-slate-600 dark:text-slate-200">
                  {activeSegment.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 rounded-2xl bg-slate-100/60 p-4 dark:bg-slate-800/60">
                      <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Motion.div>
            </AnimatePresence>
            <div className="absolute -bottom-6 -right-6 rounded-3xl bg-indigo-500/10 px-6 py-4 text-sm font-medium text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
              Segment bazl\u0131 altyap\u0131
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsTabs;
