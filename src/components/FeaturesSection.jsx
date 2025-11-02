import { motion as Motion, useReducedMotion } from 'framer-motion';
import {
  Palette,
  Map,
  Users,
  MessageCircle,
  Handshake,
  Briefcase,
  Calendar,
  HeartHandshake,
  Mail,
  BarChart3,
  Cable,
  ShieldCheck,
  Smartphone,
  Settings,
  Heart,
  Trophy,
} from 'lucide-react';
import { useFadeInUp, useHoverLift } from '../hooks/useMotionPreferences';

const features = [
  {
    title: 'Branded Topluluk & Profil',
    description:
      'Kurum renkleri, \u00f6zel alan ad\u0131n\u0131z, \u00f6zelle\u015ftirilebilir tema; kapsam\u0131l\u0131 profil alanlar\u0131; sosyal giri\u015f.',
    icon: Palette,
  },
  {
    title: '\u00dcye Dizin & Harita',
    description:
      'Ak\u0131ll\u0131 arama (b\u00f6lge, sekt\u00f6r, beceri, mezuniyet y\u0131l\u0131), harita g\u00f6r\u00fcn\u00fcm\u00fc, \u015firket/i\u015fletme dizini.',
    icon: Map,
  },
  {
    title: 'Gruplar & Alt Topluluklar',
    description:
      'S\u0131n\u0131f y\u0131llar\u0131, \u015fehir kul\u00fcpleri, ilgi alanlar\u0131; premium grup \u00f6zellikleri.',
    icon: Users,
  },
  {
    title: 'Ak\u0131\u015f & \u0130leti\u015fim',
    description:
      'Haber ak\u0131\u015f\u0131, g\u00f6nderi/yorum/be\u011feni; 1:1 mesajla\u015fma; bildirimler.',
    icon: MessageCircle,
  },
  {
    title: 'Mentorluk',
    description:
      '1:1, grup ve flash mentorluk; ak\u0131ll\u0131 e\u015fle\u015ftirme; program panolar\u0131; hedefler ve geri bildirim.',
    icon: Handshake,
  },
  {
    title: 'Kariyer & \u0130\u015f Panosu',
    description:
      '\u0130\u015f/staj ilanlar\u0131, ba\u015fvuru/\u00f6neri takibi, kurum ortakl\u0131klar\u0131.',
    icon: Briefcase,
  },
  {
    title: 'Etkinlikler',
    description:
      'Sanal/fiziksel etkinlik olu\u015fturma, biletleme/RSVP, takvim entegrasyonu, hat\u0131rlat\u0131c\u0131lar, geri bildirim.',
    icon: Calendar,
  },
  {
    title: 'Ba\u011f\u0131\u015f & Kampanyalar',
    description:
      'G\u00f6m\u00fcl\u00fc ba\u011f\u0131\u015f formlar\u0131, ba\u011f\u0131\u015f g\u00fcnleri, crowdfunding, ba\u011f\u0131\u015f analiti\u011fi; CRM senkronizasyonu.',
    icon: HeartHandshake,
  },
  {
    title: '\u0130leti\u015fim & Otomasyon',
    description:
      'B\u00fclten, haftal\u0131k \u00f6zet, segmentlere \u00f6zel hedefli g\u00f6nderimler, ki\u015fiselle\u015ftirilmi\u015f video mesajlar.',
    icon: Mail,
  },
  {
    title: 'Analitik & Raporlama',
    description:
      'Aktif kullan\u0131c\u0131, geri d\u00f6n\u00fc\u015f oran\u0131, mentorluk ili\u015fkileri, etkinlik kat\u0131l\u0131m\u0131, i\u015f panosu metrikleri; CASE metrikleri uyumu.',
    icon: BarChart3,
  },
  {
    title: 'Entegrasyon & API',
    description:
      'CRM (Salesforce/RE NXT), \u00f6deme a\u011f ge\u00e7itleri, SSO, takvim; REST API/Webhook (tan\u0131t\u0131m ama\u00e7l\u0131).',
    icon: Cable,
  },
  {
    title: 'G\u00fcvenlik & Yetkiler',
    description:
      'Rol tabanl\u0131 eri\u015fim, i\u00e7erik moderasyonu, denetim g\u00fcnl\u00fckleri, gizlilik kontrolleri.',
    icon: ShieldCheck,
  },
  {
    title: 'Mobil & Duyarl\u0131 Tasar\u0131m',
    description:
      'Tam duyarl\u0131 aray\u00fcz, mobil odakl\u0131 deneyim, push bildirim vizyonu.',
    icon: Smartphone,
  },
  {
    title: '\u00d6zelle\u015ftirme',
    description:
      'Tema/renkler, \u00f6zel profil alanlar\u0131, \u00f6zel formlar ve e-posta \u015fablonlar\u0131, \u00e7ok dilli altyap\u0131.',
    icon: Settings,
  },
  {
    title: 'G\u00f6n\u00fcll\u00fcl\u00fck & Pazar Yeri',
    description:
      'G\u00f6n\u00fcll\u00fc e\u015fle\u015ftirme ve saat takibi; mezun i\u015fletmeleri dizini.',
    icon: Heart,
  },
  {
    title: 'Oyunla\u015ft\u0131rma',
    description: 'Rozetler, g\u00f6revler, liderlik tablolar\u0131.',
    icon: Trophy,
  },
];

const FeaturesSection = () => {
  const fadeHeading = useFadeInUp();
  const hoverLift = useHoverLift();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="ozellikler" className="bg-white py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
            K\u00f6pr\u00fcMezun, alumni/topluluk y\u00f6netiminin t\u00fcm yap\u0131 ta\u015flar\u0131n\u0131 tek \u00e7at\u0131 alt\u0131nda sunar.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">
            Kurumsal \u00f6l\u00e7ekteki mezun ve topluluk programlar\u0131n\u0131z\u0131 u\u00e7tan uca y\u00f6netmeniz, \u00f6l\u00e7meniz ve g\u00fc\u00e7lendirmeniz i\u00e7in tasarland\u0131.
          </p>
        </Motion.div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Motion.article
                key={feature.title}
                className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.2 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: 'easeOut', delay: index * 0.04 }}
                {...hoverLift}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
              </Motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
