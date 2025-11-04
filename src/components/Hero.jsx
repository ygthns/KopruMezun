import PropTypes from 'prop-types';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { PlayCircle, FileText, MessageCircle } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const HERO_COPY = {
  tr: {
    badge: 'Topluluğunuzu bağlayın, geleceği birlikte kurun.',
    heading: 'Mezunlarınızı ve topluluğunuzu tek bir köprüde buluşturun.',
    description:
      'KöprüMezun, mezun-öğrenci ağları, mentorluk, etkinlikler, iş fırsatları ve bağışı tek platformda birleştirir.',
    primaryCta: 'Demoyu İzle',
    secondaryCta: 'PDF Broşür',
    tertiaryCta: 'Bize Ulaşın',
    summary: [
      { label: 'Türkiye’de geliştirildi', value: 'Yerli uzman ekiple üretildi' },
      { label: 'Veri egemenliği', value: 'Sunucular Türkiye sınırlarında' },
      { label: 'KVKK uyumu', value: 'Sürekli güncellenen güvenlik' },
    ],
    metrics: [
      { label: 'Aktif Üye', value: '3.452', trend: '+18% bu ay' },
      { label: 'Mentorluk İlişkisi', value: '627', trend: '+24% bu ay' },
      { label: 'Aylık Etkinlik', value: '14', trend: '+3' },
      { label: 'Bağış Kampanyası', value: '5', trend: '+2' },
    ],
    feed: [
      { message: 'İstanbul Mezun Buluşması kayıtları açıldı.', time: '5dk önce' },
      { message: 'Enerji sektöründe çalışan 48 mezun yeni mentor olarak eklendi.', time: '22dk önce' },
      { message: 'Sağlık İnovasyonu kampanyası %82 hedefe ulaştı.', time: '1s önce' },
    ],
  },
  en: {
    badge: 'Connect your community, build the future together.',
    heading: 'Bring your alumni and community together on one bridge.',
    description:
      'KöprüMezun unites alumni-student networks, mentorship, events, career opportunities, and giving in a single platform. Built in Turkey; data stays in Turkey.',
    primaryCta: 'Watch Demo',
    secondaryCta: 'PDF Brochure',
    tertiaryCta: 'Contact Us',
    note: 'This page contains promotional demo content.',
    summary: [
      { label: 'Built in Turkey', value: 'Delivered by a local expert team' },
      { label: 'Data sovereignty', value: 'Servers operate within Turkey' },
      { label: 'KVKK compliance', value: 'Continuously updated safeguards' },
    ],
    metrics: [
      { label: 'Active Members', value: '3,452', trend: '+18% this month' },
      { label: 'Mentoring Matches', value: '627', trend: '+24% this month' },
      { label: 'Monthly Events', value: '14', trend: '+3' },
      { label: 'Giving Campaigns', value: '5', trend: '+2' },
    ],
    feed: [
      { message: 'Istanbul Alumni Gathering registrations opened.', time: '5 min ago' },
      { message: '48 alumni in energy joined as mentors.', time: '22 min ago' },
      { message: 'Health Innovation campaign reached 82% of goal.', time: '1 hr ago' },
    ],
  },
};

const Hero = ({ language }) => {
  const copy = HERO_COPY[language];
  const fadeInHeading = useFadeInUp();
  const fadeInMockup = useFadeInUp(0.2);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="urun" className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50 pb-24 pt-20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="absolute inset-0 bg-gradient-hero opacity-70 blur-3xl dark:opacity-90" aria-hidden="true" />
      <div className="absolute inset-0">
        {!shouldReduceMotion && (
          <Motion.div
            className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:justify-between">
        <Motion.div className="max-w-2xl text-center lg:text-left" {...fadeInHeading}>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 shadow-sm dark:border-indigo-900/40 dark:bg-slate-950/80 dark:text-indigo-300">
            {copy.badge}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">{copy.heading}</h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">{copy.description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <PlayCircle className="h-5 w-5" />
              {copy.primaryCta}
            </a>
            <a
              href="/brochure.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
            >
              <FileText className="h-5 w-5" />
              {copy.secondaryCta}
            </a>
            <a
              href="#iletisim"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-slate-700 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-slate-200 dark:hover:text-cyan-400"
            >
              <MessageCircle className="h-5 w-5" />
              {copy.tertiaryCta}
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{copy.note}</p>
          <div className="mt-10 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
            {copy.summary.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/60">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-300">{item.label}</p>
                <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">{item.value}</p>
              </div>
            ))}
          </div>
        </Motion.div>
        <Motion.div className="relative w-full max-w-xl" {...fadeInMockup}>
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/30 blur-2xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/80 shadow-soft backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/70">
            <div className="flex items-center justify-between border-b border-slate-200/70 px-6 py-4 dark:border-slate-800/70">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">KöprüMezun Kontrol Paneli</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'tr' ? 'Alumni topluluğunuzun nabzını canlı takip edin' : 'Track the pulse of your alumni community live'}
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
                {language === 'tr' ? 'Canlı' : 'Live'}
              </span>
            </div>
            <div className="space-y-4 px-6 py-6">
              <div className="grid grid-cols-2 gap-4">
                {copy.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{metric.label}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">{metric.value}</p>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{metric.trend}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {language === 'tr' ? 'Topluluk Akışı' : 'Community Feed'}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {copy.feed.map((item) => (
                    <li key={item.message} className="flex items-start justify-between gap-3">
                      <span>{item.message}</span>
                      <span className="text-xs text-slate-400">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 rounded-2xl border border-indigo-100 bg-white/90 px-4 py-3 shadow-lg backdrop-blur dark:border-indigo-900/30 dark:bg-slate-900/80">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-300">{copy.infrastructureBadge}</p>
            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-100">{copy.infrastructureText}</p>
          </div>
        </Motion.div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-100 via-slate-50 to-transparent dark:from-slate-900 dark:via-slate-900" aria-hidden="true" />
    </section>
  );
};

Hero.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default Hero;
