import PropTypes from 'prop-types';
import { Briefcase, GraduationCap, MapPin, User } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const COPY = {
  tr: {
    title: 'Profil',
    subtitle: 'Topluluğunuza kim olduğunuzu anlatın.',
    aboutTitle: 'Hakkımda',
    aboutBody:
      'Topluluk inşa etmeye gönül vermiş, eğitim teknolojileri ve mezun deneyimi alanında 8+ yıllık deneyime sahip ürün yöneticisi. Bilgiye erişimi demokratikleştiren, mentorluk ve bağış kültürünü güçlendiren çözümler tasarlıyorum.',
    profileDetails: [
      { icon: User, label: 'Pozisyon', value: 'Ürün Direktörü, KöprüMezun' },
      { icon: MapPin, label: 'Konum', value: 'İstanbul, Türkiye' },
    ],
    experienceTitle: 'Deneyim',
    experiences: [
      {
        organisation: 'KöprüMezun',
        role: 'Ürün Direktörü',
        period: '2022 - Günümüz',
        description:
          'Mentorluk, bağış ve etkinlik modüllerinin ürün stratejisini oluşturarak 25.000+ mezunun aktif katılımını sağladım.',
      },
      {
        organisation: 'Boğaziçi Üniversitesi Mezunlar Derneği',
        role: 'Topluluk Programları Yöneticisi',
        period: '2018 - 2022',
        description:
          'Alumni mentorluk ağını genişleterek 120 yeni eşleşme başlattım ve bağış kampanyalarında %35 büyüme sağladım.',
      },
      {
        organisation: 'Galatasaray Üniversitesi',
        role: 'İşletme Lisansı',
        period: '2013 - 2017',
        description:
          'Öğrenci konseyi liderliği ve uluslararası değişim programı deneyimi ile mezun ilişkileri projelerini yürüttüm.',
      },
    ],
  },
  en: {
    title: 'Profile',
    subtitle: 'Let your community know who you are.',
    aboutTitle: 'About Me',
    aboutBody:
      'Product leader dedicated to community-building with 8+ years across edtech and alumni experience. I design solutions that democratise access to knowledge while strengthening mentorship and giving cultures.',
    profileDetails: [
      { icon: User, label: 'Role', value: 'Director of Product, KöprüMezun' },
      { icon: MapPin, label: 'Location', value: 'Istanbul, Türkiye' },
    ],
    experienceTitle: 'Experience',
    experiences: [
      {
        organisation: 'KöprüMezun',
        role: 'Director of Product',
        period: '2022 - Present',
        description:
          'Shaped product strategy for mentoring, giving, and events modules, activating 25,000+ alumni engagements.',
      },
      {
        organisation: 'Boğaziçi University Alumni Association',
        role: 'Community Programmes Manager',
        period: '2018 - 2022',
        description:
          'Expanded the alumni mentoring network with 120 new matches and drove 35% growth in annual giving campaigns.',
      },
      {
        organisation: 'Galatasaray University',
        role: 'BSc in Business Administration',
        period: '2013 - 2017',
        description:
          'Led the student council and delivered international exchange initiatives focused on alumni relations projects.',
      },
    ],
  },
};

const ProfileShowcase = ({ language }) => {
  const copy = COPY[language];
  const fadeHeading = useFadeInUp();

  return (
    <section id="profil" className="bg-white py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">{copy.subtitle}</p>
        </Motion.div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr),1.1fr]">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                <User className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{copy.aboutTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{copy.aboutBody}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {copy.profileDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={`${item.label}-${language}`}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
                  >
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.label}</p>
                      <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">{item.value}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                <Briefcase className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{copy.experienceTitle}</h3>
            </div>
            <ol className="space-y-5">
              {copy.experiences.map((experience) => (
                <li
                  key={`${experience.organisation}-${language}`}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">{experience.organisation}</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{experience.role}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                      {experience.period}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{experience.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

ProfileShowcase.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default ProfileShowcase;

