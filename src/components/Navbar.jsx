import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';

const NAV_LINKS = {
  tr: [
    { label: 'Ürün', href: '#urun' },
    { label: 'Özellikler', href: '#ozellikler' },
    { label: 'Çözümler', href: '#cozumler' },
    { label: 'Fiyatlandırma', href: '#fiyatlandirma' },
    { label: 'SSS', href: '#sss' },
    { label: 'Blog', href: '#blog', disabled: true },
  ],
  en: [
    { label: 'Product', href: '#urun' },
    { label: 'Features', href: '#ozellikler' },
    { label: 'Solutions', href: '#cozumler' },
    { label: 'Pricing', href: '#fiyatlandirma' },
    { label: 'FAQ', href: '#sss' },
    { label: 'Blog', href: '#blog', disabled: true },
  ],
};

const CTA_LABEL = {
  tr: 'Demo İste',
  en: 'Request Demo',
};

const LANGUAGE_BUTTON = {
  tr: { label: 'English', aria: 'İngilizce diline geç' },
  en: { label: 'Türkçe', aria: 'Switch to Turkish language' },
};

const DARK_MODE_ARIA = {
  tr: (isDark) => (isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'),
  en: (isDark) => (isDark ? 'Switch to light mode' : 'Switch to dark mode'),
};

const BRAND_ALT = {
  tr: 'KöprüMezun logosu',
  en: 'KöprüMezun logo',
};

const Navbar = ({ language, onLanguageChange, onDemoClick, isDarkMode, onToggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  const handleLanguageToggle = () => {
    onLanguageChange(language === 'tr' ? 'en' : 'tr');
  };

  const links = NAV_LINKS[language];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#urun" className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
          <span className="relative flex h-14 items-center overflow-hidden sm:h-16">
            <img
              src="/logos/koprubeyazlogo.svg"
              alt={BRAND_ALT[language]}
              className="block h-[140%] w-auto translate-y-[4%] dark:hidden sm:h-[160%]"
            />
            <img
              src="/logos/kopruyazisizbeyazlogo.svg"
              alt={BRAND_ALT[language]}
              className="hidden h-[140%] w-auto translate-y-[4%] dark:block sm:h-[160%]"
            />
          </span>
          <span className="sr-only">KöprüMezun</span>
        </a>
        <nav className="hidden items-center gap-10 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
          {links.map((item) =>
            item.disabled ? (
              <span key={item.label} className="cursor-not-allowed text-slate-400 dark:text-slate-500" aria-disabled="true">
                {item.label}
              </span>
            ) : (
              <a key={item.label} href={item.href} className="transition hover:text-indigo-500">
                {item.label}
              </a>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
            aria-label={LANGUAGE_BUTTON[language].aria}
          >
            <Languages className="h-4 w-4" />
            {LANGUAGE_BUTTON[language].label}
          </button>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
            aria-label={DARK_MODE_ARIA[language](isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={onDemoClick}
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {CTA_LABEL[language]}
          </button>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200 md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={language === 'tr' ? 'Menüyü aç' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 px-6 pb-6 pt-4 text-sm shadow-lg md:hidden dark:border-slate-800/80 dark:bg-slate-950/95">
          <nav className="flex flex-col gap-4">
            {links.map((item) =>
              item.disabled ? (
                <span key={item.label} className="cursor-not-allowed text-slate-400 dark:text-slate-600" aria-disabled="true">
                  {item.label}
                </span>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-medium text-slate-700 transition hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleLanguageToggle}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
              aria-label={LANGUAGE_BUTTON[language].aria}
            >
              <Languages className="h-4 w-4" />
              {LANGUAGE_BUTTON[language].label}
            </button>
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
              aria-label={DARK_MODE_ARIA[language](isDarkMode)}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {isDarkMode ? (language === 'tr' ? 'Aydınlık Mod' : 'Light Mode') : language === 'tr' ? 'Karanlık Mod' : 'Dark Mode'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onDemoClick();
              }}
              className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {CTA_LABEL[language]}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

Navbar.propTypes = {
  language: PropTypes.oneOf(['tr', 'en']).isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onDemoClick: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
};

export default Navbar;

