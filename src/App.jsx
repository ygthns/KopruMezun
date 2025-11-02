import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import WhySection from './components/WhySection';
import FeaturesSection from './components/FeaturesSection';
import SolutionsTabs from './components/SolutionsTabs';
import DataSovereignty from './components/DataSovereignty';
import DemoSection from './components/DemoSection';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';

const App = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        T\u00fcrkiye\u2019nin ilk yerli mezun a\u011f\u0131 ve mentorluk platformu
      </div>
      <Navbar onDemoClick={openDemo} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode((prev) => !prev)} />
      <main>
        <Hero />
        <TrustedBy />
        <WhySection />
        <FeaturesSection />
        <SolutionsTabs />
        <DataSovereignty />
        <DemoSection onDemoClick={openDemo} />
        <Testimonials />
        <Pricing onDemoClick={openDemo} />
        <section id="blog" className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-slate-100/70 px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Blog yak\u0131nda</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              T\u00fcrkiye\u2019den topluluk y\u00f6netimi, mezun deneyimi ve mentorluk i\u00e7eriklerini burada payla\u015faca\u011f\u0131z.
            </p>
            <button
              type="button"
              onClick={openDemo}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:text-slate-200"
            >
              Demo \u0130ste
            </button>
          </div>
        </section>
        <Faq />
      </main>
      <Footer />
      <DemoModal isOpen={isDemoOpen} onClose={closeDemo} />
    </div>
  );
};

export default App;
