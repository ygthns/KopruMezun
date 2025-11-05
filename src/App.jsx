import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import WhySection from './components/WhySection';
import FeaturesSection from './components/FeaturesSection';
import ProfileShowcase from './components/ProfileShowcase';
import SolutionsTabs from './components/SolutionsTabs';
import DataSovereignty from './components/DataSovereignty';
import DemoSection from './components/DemoSection';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';

const bannerCopy = {
  tr: 'Türkiye’nin ilk yerli mezun ağı ve mentorluk platformu',
  en: 'Turkey’s first home-grown alumni network and mentorship platform',
};

const blogCopy = {
  tr: {
    heading: 'Blog yakında',
    body: 'Türkiye’den topluluk yönetimi, mezun deneyimi ve mentorluk içeriklerini burada paylaşacağız.',
    cta: 'Demo İste',
  },
  en: {
    heading: 'Blog coming soon',
    body: 'We will soon share alumni engagement, community management, and mentorship insights from Turkey right here.',
    cta: 'Request Demo',
  },
};

const App = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('tr');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('load', handleHashScroll);
    return () => window.removeEventListener('load', handleHashScroll);
  }, []);

  const openDemo = () => setIsDemoOpen(true);
  const closeDemo = () => setIsDemoOpen(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased transition dark:bg-slate-950 dark:text-slate-100">
      <div className="border-b border-indigo-100 bg-indigo-500/10 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
        {bannerCopy[language]}
      </div>
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onDemoClick={openDemo}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />
      <main>
        <Hero language={language} />
        <TrustedBy language={language} />
        <WhySection language={language} />
        <FeaturesSection language={language} />
        <ProfileShowcase language={language} />
        <SolutionsTabs language={language} />
        <DataSovereignty language={language} />
        <DemoSection language={language} onDemoClick={openDemo} />
        <Testimonials language={language} />
        <Pricing language={language} onDemoClick={openDemo} />
        <section id="blog" className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-slate-100/70 px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{blogCopy[language].heading}</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{blogCopy[language].body}</p>
            <button
              type="button"
              onClick={openDemo}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
            >
              {blogCopy[language].cta}
            </button>
          </div>
        </section>
        <Faq language={language} />
      </main>
      <Footer language={language} />
      <DemoModal language={language} isOpen={isDemoOpen} onClose={closeDemo} />
    </div>
  );
};

export default App;
