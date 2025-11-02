import { Mail, MapPin, Linkedin, Instagram, Globe } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: '#', title: 'LinkedIn (yak\u0131nda)' },
  { icon: Instagram, label: 'Instagram', href: '#', title: 'Instagram (yak\u0131nda)' },
  { icon: Globe, label: 'Blog', href: '#blog', title: 'Blog (yak\u0131nda)' },
];

const Footer = () => (
  <footer id="iletisim" className="bg-slate-950 py-16 text-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:justify-between">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">K\u00f6pr\u00fcMezun</p>
        <p className="mt-4 text-2xl font-semibold">T\u00fcrkiye\u2019de geli\u015ftirildi. Veriler T\u00fcrkiye\u2019de kal\u0131r.</p>
        <p className="mt-4 text-sm text-white/70">
          Topluluklar\u0131n\u0131z\u0131, mezunlar\u0131n\u0131z\u0131 ve mentorluk programlar\u0131n\u0131z\u0131 tek bir yerli platformda u\u00e7tan uca y\u00f6netin.
        </p>
      </div>
      <div className="grid flex-1 gap-10 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">\u0130leti\u015fim</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-indigo-300" aria-hidden="true" />
              <a href="mailto:hello@koprumezun.com" className="hover:text-white">
                hello@koprumezun.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-indigo-300" aria-hidden="true" />
              \u0130stanbul, T\u00fcrkiye
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Sosyal</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
                  aria-label={link.title}
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
      <p>\u00a9 K\u00f6pr\u00fcMezun \u2014 T\u00fcrkiye\u2019de geli\u015ftirildi. Veriler T\u00fcrkiye\u2019de kal\u0131r.</p>
      <p>T\u00fcrkiye\u2019nin ilk yerli mezun a\u011f\u0131 ve mentorluk platformu</p>
    </div>
  </footer>
);

export default Footer;
