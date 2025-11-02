import PropTypes from 'prop-types';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useFadeInUp, useHoverLift } from '../hooks/useMotionPreferences';

const COPY = {
  tr: {
    title: 'Kurum ölçeğinize göre esnek planlar',
    subtitle: 'Bu fiyatlandırma demo amaçlıdır; tüm içerik temsili. Net teklif için ekibimizle iletişime geçin.',
    plans: [
      {
        name: 'Başlangıç',
        price: 'Temel paket',
        description: 'Topluluk temelleri, üye dizini, bülten.',
        features: ['Branded topluluk portalı', 'Üye dizini & temel analitik', 'Bülten ve duyuru araçları'],
        highlighted: false,
      },
      {
        name: 'Büyüme',
        price: 'Öne çıkan paket',
        description: 'Mentorluk + etkinlikler + temel otomasyon.',
        features: ['Mentorluk program yönetimi', 'Etkinlik & biletleme modülü', 'Otomatik mail akışları'],
        highlighted: true,
      },
      {
        name: 'Kurumsal',
        price: 'Gelişmiş paket',
        description: 'SSO + gelişmiş analitik + premium destek.',
        features: ['Kurumsal SSO & güvenlik katmanları', 'Gelişmiş raporlama ve API erişimi', 'Öncelikli destek & eğitim'],
        highlighted: false,
      },
    ],
    recommended: 'Önerilen',
    cta: 'Demo Talep Et',
  },
  en: {
    title: 'Flexible plans for every organisation',
    subtitle: 'Pricing is illustrative for demo purposes; all content is representative. Contact our team for a tailored quote.',
    plans: [
      {
        name: 'Launch',
        price: 'Essential package',
        description: 'Community foundations, member directory, newsletters.',
        features: ['Branded community portal', 'Member directory & essential analytics', 'Newsletter and announcement tools'],
        highlighted: false,
      },
      {
        name: 'Growth',
        price: 'Featured package',
        description: 'Mentoring + events + core automation.',
        features: ['Mentoring programme management', 'Event & ticketing module', 'Automated email workflows'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Advanced package',
        description: 'SSO + advanced analytics + premium support.',
        features: ['Enterprise SSO & security layers', 'Advanced reporting and API access', 'Priority support & training'],
        highlighted: false,
      },
    ],
    recommended: 'Recommended',
    cta: 'Request Demo',
  },
};

const Pricing = ({ language, onDemoClick }) => {
  const copy = COPY[language];
  const fadeHeading = useFadeInUp();
  const hoverLift = useHoverLift();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="fiyatlandirma" className="bg-white py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">{copy.subtitle}</p>
        </Motion.div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {copy.plans.map((tier, index) => (
            <Motion.div
              key={`${tier.name}-${language}`}
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
                    {copy.recommended}
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
                {copy.cta}
              </button>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

Pricing.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
  onDemoClick: PropTypes.func.isRequired,
};

export default Pricing;
