import PropTypes from 'prop-types';
import { motion as Motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const COPY = {
  tr: {
    tag: 'KVKK Uyumlu',
    heading: 'Veri Türkiye’de Kalır',
    description:
      'KöprüMezun, Türkiye’deki güvenli veri merkezlerinde barındırılır. KVKK’ya uyumlu süreçler, şifreleme ve rol-tabanlı erişim ile verileriniz ülke sınırları içinde kalır.',
    badgeTitle: 'Türkiye lokasyonu',
    badgeSubtitle: 'Ankara & İstanbul veri merkezleri',
    badgeFooter: 'KVKK’ye saygı',
  },
  en: {
    tag: 'KVKK Compliant',
    heading: 'Data Stays in Turkey',
    description:
      'KöprüMezun is hosted in secure data centres located in Turkey. KVKK-aligned processes, encryption, and role-based access ensure your data remains within national borders.',
    badgeTitle: 'Hosted in Turkey',
    badgeSubtitle: 'Istanbul & Ankara data centres',
    badgeFooter: 'Respecting KVKK',
  },
};

const DataSovereignty = ({ language }) => {
  const copy = COPY[language];
  const fade = useFadeInUp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.35),transparent_55%)]" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-6">
        <Motion.div className="relative rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-lg" {...fade}>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                {copy.tag}
              </span>
              <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">{copy.heading}</h2>
              <p className="mt-4 text-base text-white/80">{copy.description}</p>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 text-left">
              <Shield className="h-10 w-10 text-cyan-400" aria-hidden="true" />
              <div className="text-sm text-white/80">
                <p className="font-semibold">{copy.badgeTitle}</p>
                <p>{copy.badgeSubtitle}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">{copy.badgeFooter}</p>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

DataSovereignty.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default DataSovereignty;
