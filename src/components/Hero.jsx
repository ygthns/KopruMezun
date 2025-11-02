import { motion as Motion, useReducedMotion } from 'framer-motion';
import { PlayCircle, FileText, MessageCircle } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const Hero = () => {
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
            Toplulu\u011funuzu ba\u011flay\u0131n, gelece\u011fi birlikte kurun.
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Alumni ve toplulu\u011funuzu tek bir k\u00f6pr\u00fcde bulu\u015fturun.
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            K\u00f6pr\u00fcMezun, mezun-\u00f6\u011frenci a\u011flar\u0131, mentorluk, etkinlikler, i\u015f f\u0131rsatlar\u0131 ve ba\u011f\u0131\u015f\u0131 tek platformda birle\u015ftirir. T\u00fcrkiye\u2019de geli\u015ftirildi; veriler T\u00fcrkiye\u2019de kal\u0131r.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <PlayCircle className="h-5 w-5" />
              Demoyu \u0130zle
            </a>
            <a
              href="/brochure.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
            >
              <FileText className="h-5 w-5" />
              PDF Bro\u015f\u00fcr
            </a>
            <a
              href="#iletisim"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-slate-700 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-slate-200 dark:hover:text-cyan-400"
            >
              <MessageCircle className="h-5 w-5" />
              Bize Ula\u015f\u0131n
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Bu sayfa tan\u0131t\u0131m ama\u00e7l\u0131 demo i\u00e7eri\u011fi i\u00e7erir.</p>
          <div className="mt-10 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
            {[
              { label: 'T\u00fcrkiye\u2019de geli\u015ftirildi', value: 'Yerli uzman ekiple \u00fcretildi' },
              { label: 'Veri egemenli\u011fi', value: 'Sunucular T\u00fcrkiye s\u0131n\u0131rlar\u0131nda' },
              { label: 'KVKK uyumu', value: 'S\u00fcrekli g\u00fcncellenen g\u00fcvenlik' },
            ].map((item) => (
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
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">K\u00f6pr\u00fcMezun Kontrol Paneli</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Alumni toplulu\u011funuzun nabz\u0131n\u0131 canl\u0131 takip edin</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">Canl\u0131</span>
            </div>
            <div className="space-y-4 px-6 py-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Aktif \u00dcye', value: '3.452', trend: '+18%' },
                  { label: 'Mentorluk \u0130li\u015fkisi', value: '627', trend: '+24%' },
                  { label: 'Ayl\u0131k Etkinlik', value: '14', trend: '+3' },
                  { label: 'Ba\u011f\u0131\u015f Kampanyas\u0131', value: '5', trend: '+2' },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{metric.label}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">{metric.value}</p>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{metric.trend} bu ay</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Topluluk Ak\u0131\u015f\u0131</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start justify-between gap-3">
                    <span>\u0130stanbul Mezun Bulu\u015fmas\u0131 kay\u0131tlar\u0131 a\u00e7\u0131ld\u0131.</span>
                    <span className="text-xs text-slate-400">5dk \u00f6nce</span>
                  </li>
                  <li className="flex items-start justify-between gap-3">
                    <span>Enerji sekt\u00f6r\u00fcnde \u00e7al\u0131\u015fan 48 mezun yeni mentor olarak eklendi.</span>
                    <span className="text-xs text-slate-400">22dk \u00f6nce</span>
                  </li>
                  <li className="flex items-start justify-between gap-3">
                    <span>Sa\u011fl\u0131k \u0130novasyonu kampanyas\u0131 %82 hedefe ula\u015ft\u0131.</span>
                    <span className="text-xs text-slate-400">1s \u00f6nce</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 rounded-2xl border border-indigo-100 bg-white/90 px-4 py-3 shadow-lg backdrop-blur dark:border-indigo-900/30 dark:bg-slate-900/80">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-300">T\u00fcrkiye\u2019de altyap\u0131</p>
            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-100">\u0130stanbul & Ankara veri merkezleri</p>
          </div>
        </Motion.div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-100 via-slate-50 to-transparent dark:from-slate-900 dark:via-slate-900" aria-hidden="true" />
    </section>
  );
};

export default Hero;
