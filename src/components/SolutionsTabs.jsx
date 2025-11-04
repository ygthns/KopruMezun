import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GraduationCap, HeartHandshake, Building2, Users2 } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const COPY = {
  tr: {
    title: 'Segmentlere göre çözümler',
    description:
      'KöprüMezun, farklı topluluk tiplerinin benzersiz ihtiyaçlarına göre yapılandırılabilir. Sektörünüze özel akışlar, içerikler ve programlar oluşturun.',
    segments: [
      {
        key: 'universiteler',
        title: 'Üniversiteler & Okullar',
        description: 'Mezun-öğrenci köprüsü, mentorluk, kariyer ve bağışı bir araya getirin.',
        icon: GraduationCap,
        highlights: [
          'Mezun takibi ve iletişim segmentasyonu',
          'Öğrenci-mentor eşleştirmeleri ve kariyer destekleri',
          'Burs ve bağış kampanyalarını tek panelden yönetin',
        ],
      },
      {
        key: 'stk',
        title: 'STK & Vakıflar',
        description: 'Gönüllü havuzları, kampanya iletişimi, etki ölçümü.',
        icon: HeartHandshake,
        highlights: [
          'Gönüllü eşleştirme ve katılım takibi',
          'Etki raporları ve raporlama otomasyonu',
          'Kampanya duyuruları için segment edilmiş iletişim',
        ],
      },
      {
        key: 'kurumsal',
        title: 'Kurumsal Alumni',
        description: 'İşe alım, topluluk elçileri, marka savunuculuğu.',
        icon: Building2,
        highlights: [
          'Marka elçisi programları ve içerik akışları',
          'Kariyer fırsatlarının alumni ağına yayılması',
          'SSO ve kurumsal güvenlik katmanları',
        ],
      },
      {
        key: 'dernek',
        title: 'Dernek & Odalar',
        description: 'Üyelik yaşam döngüsü, alt topluluklar, aidat iletişimi.',
        icon: Users2,
        highlights: [
          'Üyelik yenileme ve aidat hatırlatmaları',
          'Yerel şubeler için alt topluluk yapısı',
          'Etkinlik ve eğitim duyurularını kolaylaştırın',
        ],
      },
    ],
  },
  en: {
    title: 'Solutions by segment',
    description:
      'KöprüMezun can be configured for the unique needs of different communities. Deliver tailored workflows, content, and programmes for your sector.',
    segments: [
      {
        key: 'universiteler',
        title: 'Universities & Schools',
        description: 'Bring together alumni-student bridges, mentoring, careers, and giving.',
        icon: GraduationCap,
        highlights: [
          'Segment alumni communications and tracking',
          'Student-mentor matching and career support',
          'Manage scholarship and giving campaigns in one hub',
        ],
      },
      {
        key: 'stk',
        title: 'NGOs & Foundations',
        description: 'Volunteer pools, campaign communications, impact measurement.',
        icon: HeartHandshake,
        highlights: [
          'Volunteer matching and participation tracking',
          'Impact dashboards with automated reporting',
          'Segmented messaging for each campaign',
        ],
      },
      {
        key: 'kurumsal',
        title: 'Corporate Alumni',
        description: 'Recruiting, community ambassadors, brand advocacy.',
        icon: Building2,
        highlights: [
          'Ambassador programmes and content streams',
          'Share career opportunities across your alumni network',
          'SSO and enterprise-grade security layers',
        ],
      },
      {
        key: 'dernek',
        title: 'Associations & Chambers',
        description: 'Membership lifecycle, sub-communities, dues communications.',
        icon: Users2,
        highlights: [
          'Renewal workflows and dues reminders',
          'Sub-community structure for local chapters',
          'Streamlined event and training announcements',
        ],
      },
    ],
  },
};

const SolutionsTabs = ({ language }) => {
  const copy = COPY[language];
  const [activeKey, setActiveKey] = useState(copy.segments[0].key);
  const fadeHeading = useFadeInUp();
  const shouldReduceMotion = useReducedMotion();

  const activeSegment = copy.segments.find((segment) => segment.key === activeKey);

  return (
    <section id="cozumler" className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">{copy.description}</p>
        </Motion.div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[320px,minmax(0,1fr)] lg:items-start">
          <div className="flex w-full gap-3 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:flex-col lg:overflow-visible">
            {copy.segments.map((segment) => {
              const Icon = segment.icon;
              const isActive = segment.key === activeKey;
              return (
                <button
                  key={`${segment.key}-${language}`}
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
                key={`${activeSegment.key}-${language}`}
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
              {copy.badge}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

SolutionsTabs.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default SolutionsTabs;
