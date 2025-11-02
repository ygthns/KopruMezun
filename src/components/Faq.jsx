import { useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const faqs = [
  {
    question: 'Bu site ger\u00e7ek \u00fcr\u00fcn m\u00fc?',
    answer: 'Bu, tan\u0131t\u0131m ama\u00e7l\u0131 demo sayfad\u0131r.',
  },
  {
    question: 'Veriler nerede saklan\u0131yor?',
    answer: 'T\u00fcrkiye i\u00e7indeki veri merkezlerinde.',
  },
  {
    question: 'Mentorluk nas\u0131l i\u015fler?',
    answer: 'Profil hedeflerine g\u00f6re ak\u0131ll\u0131 e\u015fle\u015ftirme ve program takibi.',
  },
  {
    question: 'CRM entegrasyonu var m\u0131?',
    answer: '\u00dcr\u00fcn vizyonu i\u00e7inde evet; bu sayfa demo.',
  },
  {
    question: 'Mobil destek?',
    answer: 'Tam duyarl\u0131 aray\u00fcz; mobil uygulama vizyonu.',
  },
  {
    question: 'G\u00fcvenlik?',
    answer: 'RBAC, \u015fifreleme, denetim g\u00fcnl\u00fckleri, KVKK odakl\u0131 yakla\u015f\u0131m.',
  },
  {
    question: 'Etkinlik & biletleme?',
    answer: 'Demo ak\u0131\u015f\u0131, ger\u00e7ek \u00f6deme yok.',
  },
  {
    question: '\u0130\u015f ilanlar\u0131?',
    answer: 'Pano ve ba\u015fvuru takibi (temsili).',
  },
  {
    question: 'Oyunla\u015ft\u0131rma?',
    answer: 'Rozet/puan sistemi vizyonu.',
  },
  {
    question: 'Destek?',
    answer: '\u201cDemo \u0130ste\u201d formunu doldurun; sizinle ileti\u015fime ge\u00e7elim.',
  },
];

const Faq = () => {
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
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">S\u0131k Sorulan Sorular</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Demo sayfam\u0131zda \u00f6ne \u00e7\u0131kan ba\u015fl\u0131klar, \u00fcr\u00fcn vizyonumuzu ve veri egemenli\u011fi yakla\u015f\u0131m\u0131m\u0131z\u0131 yans\u0131t\u0131r.
          </p>
        </Motion.div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;
            return (
              <Motion.div
                key={faq.question}
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

export default Faq;
