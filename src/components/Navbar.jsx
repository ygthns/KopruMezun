import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: '\u00dcr\u00fcn', href: '#urun' },
  { label: '\u00d6zellikler', href: '#ozellikler' },
  { label: '\u00c7\u00f6z\u00fcmler', href: '#cozumler' },
  { label: 'Fiyatland\u0131rma', href: '#fiyatlandirma' },
  { label: 'SSS', href: '#sss' },
  { label: 'Blog', href: '#blog', disabled: true },
];

const Navbar = ({ onDemoClick, isDarkMode, onToggleDarkMode }) => {
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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#urun" className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 font-bold text-white dark:bg-slate-100 dark:text-slate-900">
            KM
          </span>
          K\u00f6pr\u00fcMezun
        </a>
        <nav className="hidden items-center gap-10 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
          {navItems.map((item) =>
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
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
            aria-label={isDarkMode ? 'Ayd\u0131nl\u0131k moda ge\u00e7' : 'Karanl\u0131k moda ge\u00e7'}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={onDemoClick}
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Demo \u0130ste
          </button>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200 md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Men\u00fcy\u00fc a\u00e7"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 px-6 pb-6 pt-4 text-sm shadow-lg md:hidden dark:border-slate-800/80 dark:bg-slate-950/95">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) =>
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
              onClick={onToggleDarkMode}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
              aria-label={isDarkMode ? 'Ayd\u0131nl\u0131k moda ge\u00e7' : 'Karanl\u0131k moda ge\u00e7'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {isDarkMode ? 'Ayd\u0131nl\u0131k Mod' : 'Karanl\u0131k Mod'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onDemoClick();
              }}
              className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Demo \u0130ste
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

Navbar.propTypes = {
  onDemoClick: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
};

export default Navbar;
