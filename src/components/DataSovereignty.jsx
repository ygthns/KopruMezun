import { motion as Motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useFadeInUp } from '../hooks/useMotionPreferences';

const DataSovereignty = () => {
  const fade = useFadeInUp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.35),transparent_55%)]" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-6">
        <Motion.div className="relative rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-lg" {...fade}>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                KVKK Uyumlu
              </span>
              <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">Veri T\u00fcrkiye\u2019de Kal\u0131r</h2>
              <p className="mt-4 text-base text-white/80">
                K\u00f6pr\u00fcMezun, T\u00fcrkiye\u2019deki g\u00fcvenli veri merkezlerinde bar\u0131nd\u0131r\u0131l\u0131r. KVKK\u2019ya uyumlu s\u00fcre\u00e7ler, \u015fifreleme ve rol-tabanl\u0131 eri\u015fim ile verileriniz \u00fclke s\u0131n\u0131rlar\u0131 i\u00e7inde
                kal\u0131r.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 text-left">
              <Shield className="h-10 w-10 text-cyan-400" aria-hidden="true" />
              <div className="text-sm text-white/80">
                <p className="font-semibold">T\u00fcrkiye lokasyonu</p>
                <p>Ankara & \u0130stanbul veri merkezleri</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">KVKK\u2019ye sayg\u0131</p>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default DataSovereignty;
