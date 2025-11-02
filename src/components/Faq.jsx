import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const FAQ_COPY = {
  tr: {
    title: 'Sık Sorulan Sorular',
    description: 'Demo sayfamızda öne çıkan başlıklar, ürün vizyonumuzu ve veri egemenliği yaklaşımımızı yansıtır.',
    items: [
      { question: 'Bu site gerçek ürün mü?', answer: 'Bu, tanıtım amaçlı demo sayfadır.' },
      { question: 'Veriler nerede saklanıyor?', answer: 'Türkiye içindeki veri merkezlerinde.' },
      { question: 'Mentorluk nasıl işler?', answer: 'Profil hedeflerine göre akıllı eşleştirme ve program takibi.' },
      { question: 'CRM entegrasyonu var mı?', answer: 'Ürün vizyonu içinde evet; bu sayfa demo.' },
      { question: 'Mobil destek?', answer: 'Tam duyarlı arayüz; mobil uygulama vizyonu.' },
      { question: 'Güvenlik?', answer: 'RBAC, şifreleme, denetim günlükleri, KVKK odaklı yaklaşım.' },
      { question: 'Etkinlik & biletleme?', answer: 'Demo akışı, gerçek ödeme yok.' },
      { question: 'İş ilanları?', answer: 'Pano ve başvuru takibi (temsili).' },
      { question: 'Oyunlaştırma?', answer: 'Rozet/puan sistemi vizyonu.' },
      { question: 'Destek?', answer: '“Demo İste” formunu doldurun; sizinle iletişime geçelim.' },
    ],
  },
  en: {
    title: 'Frequently Asked Questions',
    description: 'These highlights summarise our product vision and approach to data sovereignty.',
    items: [
      { question: 'Is this the real product?', answer: 'This is a promotional demo page.' },
      { question: 'Where is the data hosted?', answer: 'Within data centres located in Turkey.' },
      { question: 'How does mentoring work?', answer: 'Smart matching based on profile goals with progress tracking.' },
      { question: 'Do you support CRM integrations?', answer: 'It is part of the product vision; this page is a demo.' },
      { question: 'Is there mobile support?', answer: 'A fully responsive interface; native app vision on the roadmap.' },
      { question: 'What about security?', answer: 'RBAC, encryption, audit logs, and a KVKK-first approach.' },
      { question: 'Events & ticketing?', answer: 'Demo flow only, no real payments.' },
      { question: 'Job postings?', answer: 'Representative board and application tracking.' },
      { question: 'Gamification?', answer: 'Badges and points vision on the roadmap.' },
      { question: 'Support?', answer: 'Complete the “Request Demo” form and we’ll contact you.' },
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
