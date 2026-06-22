import Link from 'next/link';
import { ArrowRight, CheckCircle2, MonitorSmartphone, PenTool, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-pink-500/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>

      <div className="z-10 container max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-16 space-y-4 flex flex-col items-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900 shadow-2xl mb-4 transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/first-lady.jpg" 
              alt="Her Excellency, First Lady of Zamfara State" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-5 py-2 rounded-full text-sm md:text-base font-semibold mb-2 shadow-sm border border-indigo-100 dark:border-indigo-800">
            Proudly Sponsored by Her Excellency, the First Lady of Zamfara State
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gradient pb-2 mt-4">
            Women's Empowerment
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-slate-100">
            Capacity Building Program
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A strategic initiative designed to empower women across key sectors through digital literacy, professional development, and practical training.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Track 1 */}
          <div className="glass rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-xl border-t-4 border-t-indigo-500 flex flex-col">
            <div 
              className="w-full h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-6 shadow-md overflow-hidden bg-no-repeat transition-all duration-300 hover:scale-105"
              style={{ backgroundImage: 'url(/tracks.jpg)', backgroundSize: '300% auto', backgroundPosition: 'left top' }}
            >
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">E-Commerce & Digital Marketing</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm">
              For Local Entrepreneurs & Market Women (Ages 18-45) to enhance their business through digital tools.
            </p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Must be an active business owner</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Functional smartphone required</li>
            </ul>
            <div className="mt-auto">
              <Link 
                href="/apply?track=ecommerce" 
                className="inline-flex w-full justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Apply for Track I <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Track 2 */}
          <div className="glass rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-xl border-t-4 border-t-pink-500 flex flex-col">
            <div 
              className="w-full h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-6 shadow-md overflow-hidden bg-no-repeat transition-all duration-300 hover:scale-105"
              style={{ backgroundImage: 'url(/tracks.jpg)', backgroundSize: '300% auto', backgroundPosition: 'center top' }}
            >
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Creative Tech & Gig Work</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm">
              For Female Graduates & Tech Enthusiasts (Ages 20-35) interested in design and online freelancing.
            </p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Graduate (Degree, HND, Diploma)</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Personal laptop required</li>
            </ul>
            <div className="mt-auto">
              <Link 
                href="/apply?track=creative" 
                className="inline-flex w-full justify-center items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Apply for Track II <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Track 3 */}
          <div className="glass rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-xl border-t-4 border-t-purple-500 flex flex-col">
            <div 
              className="w-full h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-6 shadow-md overflow-hidden bg-no-repeat transition-all duration-300 hover:scale-105"
              style={{ backgroundImage: 'url(/tracks.jpg)', backgroundSize: '300% auto', backgroundPosition: 'right top' }}
            >
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Digital Civil Service</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm">
              For Female Civil Servants in MDAs (Ages 25-50) to improve public service delivery through technology.
            </p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Confirmed civil servant</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Approval/No-Objection Letter</li>
            </ul>
            <div className="mt-auto">
              <Link 
                href="/apply?track=civil_service" 
                className="inline-flex w-full justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Apply for Track III <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center flex flex-col items-center">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 py-2 px-4 rounded-full inline-block">
            * All applicants must provide valid NIN and Indigene Certificate.
          </p>
        </div>
      </div>
    </main>
  );
}
