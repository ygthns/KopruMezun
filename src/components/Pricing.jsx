import PropTypes from 'prop-types';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useFadeInUp, useHoverLift } from '../hooks/useMotionPreferences';

const tiers = [
  {
    name: 'Ba\u015flang\u0131\u00e7',
    price: 'Temel paket',
    description: 'Topluluk temelleri, \u00fcye dizini, b\u00fclten.',
    features: ['Branded topluluk portal\u0131', '\u00dcye dizini & temel analitik', 'B\u00fclten ve duyuru ara\u00e7lar\u0131'],
    highlighted: false,
  },
  {
    name: 'B\u00fcy\u00fce',
    price: '\u00d6ne \u00e7\u0131kan paket',
    description: 'Mentorluk + etkinlikler + temel otomasyon.',
    features: ['Mentorluk program y\u00f6netimi', 'Etkinlik & biletleme mod\u00fcl\u00fc', 'Otomatik mail ak\u0131\u015flar\u0131'],
    highlighted: true,
  },
  {
    name: 'Kurumsal',
    price: 'Geli\u015fmi\u015f paket',
    description: 'SSO + geli\u015fmi\u015f analitik + premium destek.',
    features: ['Kurumsal SSO & g\u00fcvenlik katmanlar\u0131', 'Geli\u015fmi\u015f raporlama ve API eri\u015fimi', '\u00d6ncelikli destek & e\u011fitim'],
    highlighted: false,
  },
];

const Pricing = ({ onDemoClick }) => {
  const fadeHeading = useFadeInUp();
  const hoverLift = useHoverLift();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="fiyatlandirma" className="bg-white py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">Kurum \u00f6l\u00e7e\u011finize g\u00f6re esnek planlar</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Bu fiyatland\u0131rma demo ama\u00e7l\u0131d\u0131r; t\u00fcm i\u00e7erik temsili. Net teklif i\u00e7in ekibimizle ileti\u015fime ge\u00e7in.
          </p>
        </Motion.div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Motion.div
              key={tier.name}
              className={`flex h-full flex-col rounded-3xl border p-8 text-left shadow-sm transition dark:border-slate-800 dark:bg-slate-900 ${
                tier.highlighted ? 'border-indigo-200 bg-indigo-50/70 dark:border-indigo-500/40 dark:bg-indigo-500/10' : 'border-slate-200 bg-white'
              }`}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 26 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.2 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: 'easeOut', delay: index * 0.12 }}
              {...hoverLift}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{tier.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tier.description}</p>
                </div>
                {tier.highlighted && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-semibold uppercase text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    \u00d6nerilen
                  </span>
                )}
              </div>
              <p className="mt-6 text-sm font-medium text-slate-700 dark:text-slate-200">{tier.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-500" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={onDemoClick}
                className="mt-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500"
              >
                Demo Talep Et
              </button>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

Pricing.propTypes = {
  onDemoClick: PropTypes.func.isRequired,
};

export default Pricing;
