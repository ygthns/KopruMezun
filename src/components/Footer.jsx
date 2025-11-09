import PropTypes from 'prop-types';
import { Mail, MapPin, Linkedin, Instagram, Globe } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Linkedin, label: 'LinkedIn', href: '#', title: { tr: 'LinkedIn (yakında)', en: 'LinkedIn (coming soon)' } },
  { icon: Instagram, label: 'Instagram', href: '#', title: { tr: 'Instagram (yakında)', en: 'Instagram (coming soon)' } },
  { icon: Globe, label: 'Blog', href: '#blog', title: { tr: 'Blog (yakında)', en: 'Blog (coming soon)' } },
];

const COPY = {
  tr: {
    strapline: 'KöprüMezun',
    body: 'Topluluklarınızı, mezunlarınızı ve mentorluk programlarınızı tek bir yerli platformda uçtan uca yönetin.',
    contactHeading: 'İletişim',
    address: 'İstanbul, Türkiye',
    socialsHeading: 'Sosyal',
    copyright: '© KöprüMezun',
    tagline: 'Türkiye’nin ilk yerli mezun ağı ve mentorluk platformu',
  },
  en: {
    strapline: 'KöprüMezun',
    heading: 'Developed in Turkey. Data stays in Turkey.',
    body: 'Manage your communities, alumni, and mentoring programmes end to end on a home-grown platform.',
    contactHeading: 'Contact',
    address: 'Istanbul, Turkey',
    socialsHeading: 'Social',
    copyright: '© KöprüMezun — Developed in Turkey. Data stays in Turkey.',
    tagline: 'Turkey’s first home-grown alumni network and mentorship platform',
  },
};

const Footer = ({ language }) => {
  const copy = COPY[language];

  return (
    <footer id="iletisim" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">{copy.strapline}</p>
          <p className="mt-4 text-2xl font-semibold">{copy.heading}</p>
          <p className="mt-4 text-sm text-white/70">{copy.body}</p>
        </div>
        <div className="grid flex-1 gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">{copy.contactHeading}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-indigo-300" aria-hidden="true" />
                <a href="mailto:saglamyigithan@gmail.com" className="hover:text-white">
                  saglamyigithan@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-indigo-300" aria-hidden="true" />
                {copy.address}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">{copy.socialsHeading}</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={`${link.label}-${language}`}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
                    aria-label={link.title[language]}
                  >
                    <IconComponent className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-white/10 px-6 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.copyright}</p>
        <p>{copy.tagline}</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
};

export default Footer;
