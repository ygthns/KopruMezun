import PropTypes from 'prop-types';
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

const COPY = {
  tr: {
    title: 'KöprüMezun, alumni/topluluk yönetiminin tüm yapı taşlarını tek çatı altında sunar.',
    description:
      'Kurumsal ölçekteki mezun ve topluluk programlarınızı uçtan uca yönetmeniz, ölçmeniz ve güçlendirmeniz için tasarlandı.',
    features: [
      {
        title: 'Branded Topluluk & Profil',
        description:
          'Kurum renkleri, özel alan adınız, özelleştirilebilir tema; kapsamlı profil alanları; sosyal giriş.',
        icon: Palette,
      },
      {
        title: 'Üyeler',
        description:
          'Akıllı arama (bölge, sektör, beceri, mezuniyet yılı), harita görünümü, şirket/işletme dizini.',
        icon: Map,
      },
      {
        title: 'Gruplar & Alt Topluluklar',
        description:
          'Sınıf yılları, şehir kulüpleri, ilgi alanları; premium grup özellikleri.',
        icon: Users,
      },
      {
        title: 'Akış & İletişim',
        description:
          'Haber akışı, gönderi/yorum/beğeni; 1:1 mesajlaşma; bildirimler.',
        icon: MessageCircle,
      },
      {
        title: 'Mentorluk',
        description:
          '1:1, grup ve flash mentorluk; akıllı eşleştirme; program panoları; hedefler ve geri bildirim.',
        icon: Handshake,
      },
      {
        title: 'Kariyer & İş Panosu',
        description:
          'İş/staj ilanları, başvuru/öneri takibi, kurum ortaklıkları.',
        icon: Briefcase,
      },
      {
        title: 'Etkinlikler',
        description:
          'Sanal/fiziksel etkinlik oluşturma, biletleme/RSVP, takvim entegrasyonu, hatırlatıcılar, geri bildirim.',
        icon: Calendar,
      },
      {
        title: 'Bağış & Kampanyalar',
        description:
          'Gömülü bağış formları, bağış günleri, crowdfunding, bağış analitiği; CRM senkronizasyonu.',
        icon: HeartHandshake,
      },
      {
        title: 'İletişim & Otomasyon',
        description:
          'Bülten, haftalık özet, segmentlere özel hedefli gönderimler, kişiselleştirilmiş video mesajlar.',
        icon: Mail,
      },
      {
        title: 'Analitik & Raporlama',
        description:
          'Aktif kullanıcı, geri dönüş oranı, mentorluk ilişkileri, etkinlik katılımı, iş panosu metrikleri; CASE metrikleri uyumu.',
        icon: BarChart3,
      },
      {
        title: 'Entegrasyon & API',
        description:
          'CRM (Salesforce/RE NXT), ödeme ağ geçitleri, SSO, takvim; REST API/Webhook (tanıtım amaçlı).',
        icon: Cable,
      },
      {
        title: 'Güvenlik & Yetkiler',
        description:
          'Rol tabanlı erişim, içerik moderasyonu, denetim günlükleri, gizlilik kontrolleri.',
        icon: ShieldCheck,
      },
      {
        title: 'Mobil & Duyarlı Tasarım',
        description:
          'Tam duyarlı arayüz, mobil odaklı deneyim, push bildirim vizyonu.',
        icon: Smartphone,
      },
      {
        title: 'Özelleştirme',
        description:
          'Tema/renkler, özel profil alanları, özel formlar ve e-posta şablonları, çok dilli altyapı.',
        icon: Settings,
      },
      {
        title: 'Gönüllülük & Pazar Yeri',
        description:
          'Gönüllü eşleştirme ve saat takibi; mezun işletmeleri dizini.',
        icon: Heart,
      },
      {
        title: 'Oyunlaştırma',
        description: 'Rozetler, görevler, liderlik tabloları.',
        icon: Trophy,
      },
    ],
  },
  en: {
    title: 'KöprüMezun brings every pillar of alumni and community management together.',
    description:
      'Designed to help you run, measure, and strengthen enterprise-scale alumni and community programs end to end.',
    features: [
      {
        title: 'Branded Community & Profile',
        description:
          'Institutional colours, custom domain, configurable themes; rich profile fields; social sign-in.',
        icon: Palette,
      },
      {
        title: 'Members',
        description:
          'Smart search by location, industry, skill, graduation year; map view; company/business listings.',
        icon: Map,
      },
      {
        title: 'Groups & Sub-communities',
        description:
          'Class years, city chapters, interest hubs; premium group capabilities.',
        icon: Users,
      },
      {
        title: 'Feed & Communications',
        description:
          'News feed, posts/comments/reactions; 1:1 messaging; notifications.',
        icon: MessageCircle,
      },
      {
        title: 'Mentoring',
        description:
          '1:1, group, and flash mentoring; intelligent matching; programme dashboards; goal tracking and feedback.',
        icon: Handshake,
      },
      {
        title: 'Career & Job Board',
        description:
          'Job/internship postings, application and referral tracking, employer partnerships.',
        icon: Briefcase,
      },
      {
        title: 'Events',
        description:
          'Create virtual and in-person events, ticketing/RSVP, calendar integrations, reminders, feedback.',
        icon: Calendar,
      },
      {
        title: 'Giving & Campaigns',
        description:
          'Embedded donation forms, giving days, crowdfunding, donation analytics; CRM synchronisation.',
        icon: HeartHandshake,
      },
      {
        title: 'Communications & Automation',
        description:
          'Newsletters, weekly digests, segmented targeting, personalised video updates.',
        icon: Mail,
      },
      {
        title: 'Analytics & Reporting',
        description:
          'Active members, return rates, mentoring relationships, event participation, job board metrics; CASE-aligned KPIs.',
        icon: BarChart3,
      },
      {
        title: 'Integrations & API',
        description:
          'CRM (Salesforce/RE NXT), payment gateways, SSO, calendar; REST API / webhook (for roadmap previews).',
        icon: Cable,
      },
      {
        title: 'Security & Permissions',
        description:
          'Role-based access, content moderation, audit logs, granular privacy controls.',
        icon: ShieldCheck,
      },
      {
        title: 'Mobile & Responsive Design',
        description:
          'Fully responsive interface, mobile-first journeys, push notification roadmap.',
        icon: Smartphone,
      },
      {
        title: 'Customisation',
        description:
          'Themes/colours, custom profile fields, tailored forms and email templates, multilingual foundations.',
        icon: Settings,
      },
      {
        title: 'Volunteering & Marketplace',
        description:
          'Volunteer matching and hour tracking; alumni business directory.',
        icon: Heart,
      },
      {
        title: 'Gamification',
        description: 'Badges, challenges, leaderboards.',
        icon: Trophy,
      },
    ],
  },
};

const FeaturesSection = ({ language }) => {
  const copy = COPY[language];
  const fadeHeading = useFadeInUp();
  const hoverLift = useHoverLift();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="ozellikler" className="bg-white py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Motion.div className="text-center" {...fadeHeading}>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">{copy.description}</p>
        </Motion.div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {copy.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Motion.article
                key={`${feature.title}-${language}`}
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

FeaturesSection.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default FeaturesSection;
