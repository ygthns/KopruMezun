import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const FAQ_COPY = {
  tr: {
    title: 'Sık Sorulan Sorular',
    description:
      'KöprüMezun’un amacı, mezunlar, öğrenciler ve üniversiteler arasında güçlü bir dijital bağ kurmaktır. Aşağıda en çok merak edilen konuları bulabilirsiniz.',
    items: [
      {
        question: 'KöprüMezun tam olarak nedir?',
        answer:
          'KöprüMezun, üniversitelerin mezun, öğrenci ve akademisyenlerini tek bir çatı altında buluşturan, iletişim, mentorluk ve bağış süreçlerini dijitalleştiren bir topluluk platformudur.',
      },
      {
        question: 'Platformu kimler kullanabilir?',
        answer:
          'Üniversitenizin onaylı öğrencileri, mezunları, akademisyenleri ve davet edilen paydaşlar erişim sağlayabilir.',
      },
      {
        question: 'KöprüMezun ücretli mi?',
        answer:
          'Hayır, öğrenciler ve mezunlar için ücretsizdir. Üniversiteler ise kurumsal lisans modeliyle platformu kullanır.',
      },
      {
        question: 'Verilerim güvende mi?',
        answer:
          'Evet. Tüm veriler Türkiye’deki yerel veri merkezlerinde saklanır ve KVKK’ya tam uyumludur.',
      },
      {
        question: 'Mentorluk sistemi nasıl işliyor?',
        answer:
          'Mezunlar ve öğrenciler, ilgi alanı ve hedeflerine göre akıllı eşleştirme sistemiyle buluşturulur. Süreç platform üzerinden izlenebilir.',
      },
      {
        question: 'Etkinlik oluşturabiliyor muyum?',
        answer:
          'Evet. Üniversite onaylı kullanıcılar kendi etkinliklerini oluşturabilir, kayıt toplayabilir ve katılımcı yönetimi yapabilir.',
      },
      {
        question: 'Bağış veya burs desteği sağlanabiliyor mu?',
        answer:
          'Evet. Platform, üniversiteniz adına güvenli bağış kampanyaları düzenlenmesini destekler.',
      },
      {
        question: 'Mobil uygulama var mı?',
        answer:
          'Web sürümü tamamen mobil uyumludur. Yerel mobil uygulama geliştirme planımız yol haritasındadır.',
      },
      {
        question: 'KöprüMezun diğer platformlardan farkı ne?',
        answer:
          'KöprüMezun yalnızca bir mezun ağı değil; üniversite topluluğunun tüm etkileşimlerini tek çatı altında toplayan bir ekosistemdir. \
      Bağış ve burs yönetimi, mezun–öğrenci mentorluk sistemi, etkinlik ve biletleme, iş ilanı ve başvuru süreçleri, mezun pazaryeri, \
      canlı sohbet ve topluluk duyuruları gibi onlarca özelliği bir araya getirir. \
      Tüm bu modüller tamamen Türkiye’de geliştirilen, KVKK uyumlu ve kuruma özel bir altyapı üzerinde çalışır.',
      },
      {
        question: 'Demo talep etmek istiyorum, nasıl ulaşabilirim?',
        answer:
          'Ana sayfadaki “Demo İste” formunu doldurun, ekibimiz kısa sürede sizinle iletişime geçsin.',
      },
    ],
  },
  en: {
    title: 'Frequently Asked Questions',
    description:
      'KöprüMezun connects graduates, students, and universities through a secure, locally hosted community platform. Here are the most common questions we receive.',
    items: [
      {
        question: 'What exactly is KöprüMezun?',
        answer:
          'KöprüMezun is a community platform that connects graduates, students, and universities — enabling mentorship, networking, and fundraising within a secure digital space.',
      },
      {
        question: 'Who can join the platform?',
        answer:
          'Verified students, alumni, faculty members, and invited university partners can access the platform.',
      },
      {
        question: 'Is KöprüMezun free to use?',
        answer:
          'Yes. It’s free for students and alumni. Universities use it under an institutional license.',
      },
      {
        question: 'Is my data secure?',
        answer:
          'Absolutely. All data is stored within data centers located in Turkey and fully complies with KVKK regulations.',
      },
      {
        question: 'How does the mentorship system work?',
        answer:
          'Students and alumni are matched based on shared interests and career goals, with progress tracking directly through the platform.',
      },
      {
        question: 'Can I create or join events?',
        answer:
          'Yes. Verified users can organize events, manage participants, and track registrations digitally.',
      },
      {
        question: 'Does the platform support donations or scholarships?',
        answer:
          'Yes. KöprüMezun enables secure fundraising campaigns and scholarship initiatives under the university’s management.',
      },
      {
        question: 'Is there a mobile app?',
        answer:
          'The web version is fully mobile-friendly. A native mobile app is planned in our upcoming roadmap.',
      },
      {
        question: 'What makes KöprüMezun different from other platforms?',
        answer:
          'KöprüMezun is more than an alumni network — it’s a complete digital ecosystem that unites all university community interactions under one roof. \
      It combines powerful features like donation and scholarship management, alumni–student mentorship, event organization and ticketing, \
      job posting and application tracking, alumni marketplace, live chat, and community announcements. \
      All modules run on a fully local, KVKK-compliant infrastructure developed and hosted in Turkey, tailored to each institution.',
      },
      {
        question: 'How can I request a demo?',
        answer:
          'Simply fill out the “Request Demo” form on our homepage, and our team will contact you shortly.',
      },
    ],
  },
};


const Faq = ({ language }) => {
  const copy = FAQ_COPY[language];
  const [openIndex, setOpenIndex] = useState(0);
  const fadeHeading = useFadeInUp();
  const shouldReduceMotion = useReducedMotion();

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="sss" className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">{copy.description}</p>
        </Motion.div>
        <div className="mt-10 space-y-4">
          {copy.items.map((faq, index) => {
            const isOpen = index === openIndex;
            return (
              <Motion.div
                key={`${faq.question}-${language}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                  <span className="rounded-full border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {isOpen ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  </span>
                </button>
                <Motion.div
                  initial={false}
                  animate={isOpen ? 'open' : 'collapsed'}
                  variants={{
                    open: { height: 'auto', opacity: 1 },
                    collapsed: { height: 0, opacity: 0 },
                  }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300">{faq.answer}</div>
                </Motion.div>
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Faq.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default Faq;
