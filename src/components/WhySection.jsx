import PropTypes from 'prop-types';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useFadeInUp, useHoverLift } from '../hooks/useMotionPreferences';

const COPY = {
  tr: {
  title: 'Neden KöprüMezun?',
  description:
    'KöprüMezun, üniversitelerin mezun ilişkilerini, bağış süreçlerini ve öğrenci etkileşimlerini tek platformda buluşturan, yerli ve güçlü bir topluluk altyapısıdır.',
  values: [
    {
      title: 'Tüm Topluluk Tek Çatı Altında',
      description:
        'Mezunlar, öğrenciler, akademisyenler ve bağışçılar aynı dijital ekosistemde buluşur; iletişim, mentorluk, iş ilanları, etkinlikler ve pazar yeri tek platformda yönetilir.',
    },
    {
      title: 'Yerli ve Güvenli Altyapı',
      description:
        'Tüm veriler Türkiye sınırları içindeki veri merkezlerinde saklanır. KVKK’ya tam uyumlu mimariyle, veriler tamamen kurumunuzun kontrolündedir.',
    },
    {
      title: 'Markanıza Özel Deneyim',
      description:
        'Üniversitenizin logosu, renkleri ve kurumsal diliyle tamamen özelleştirilmiş bir portal sunar; kullanıcılar kendilerini kendi kurumlarında hisseder.',
    },
    {
      title: 'Gelişen İş Birliği Ekosistemi',
      description:
        'KöprüMezun yalnızca bir yazılım şirketi değil; üniversitelerle birlikte büyüyen bir ekosistem ortağıdır. Her yeni kurumdan öğrenir, geri bildirimleri geliştirmeye dönüştürür, ihtiyaçlara göre çözümler üretir. Bu yaklaşım sayesinde, her üniversite yalnızca bir kullanıcı değil — KöprüMezun vizyonunun bir parçası olur.',
    },
  ],
  },
en: {
  title: 'Why KöprüMezun?',
  description:
    'KöprüMezun is a unified digital ecosystem that empowers universities to strengthen alumni relations, manage donations, and connect students and graduates — all on a secure, locally hosted platform.',
  values: [
    {
      title: 'One Platform for the Entire Community',
      description:
        'Alumni, students, faculty, and donors come together in one digital ecosystem — communication, mentorship, job postings, events, and marketplace activities are managed on a single platform.',
    },
    {
      title: 'Local and Secure Infrastructure',
      description:
        'All data is stored within Turkey’s borders in KVKK-compliant data centers, ensuring your institution retains full ownership and control of its information.',
    },
    {
      title: 'Branded and Personalized Experience',
      description:
        'Provide a fully customized portal that reflects your university’s logo, colors, and communication style — creating a sense of belonging for every user.',
    },
    {
      title: 'A Growing Collaboration Ecosystem',
      description:
        'KöprüMezun is more than a software provider — it is a long-term ecosystem partner that grows with universities. We learn from every institution, transform feedback into innovation, and build tailored solutions together. Every university becomes not just a user, but a part of the KöprüMezun vision.',
    },
  ],
},
};

const WhySection = ({ language }) => {
  const copy = COPY[language];
  const fadeHeading = useFadeInUp();
  const hoverLift = useHoverLift();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">{copy.description}</p>
        </Motion.div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {copy.values.map((value, index) => (
            <Motion.div
              key={value.title}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
              {...hoverLift}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-slate-100">{value.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{value.description}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

WhySection.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default WhySection;
