'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    // Mandatory
    fullName: '', nin: '', age: '', email: '', phone: '',
    stateOfOrigin: '', lga: '', indigeneCertificateUrl: '', passportPhotographUrl: '',
    track: '',

    // Track 1
    isActiveBusinessOwner: false, hasBasicLiteracy: false, hasSmartphone: false, hasWhatsApp: false, hasInternet: false,

    // Track 2
    tertiaryQualification: '', canCommunicateClearly: false, hasLaptop: false, hasComputerLiteracy: false,

    // Track 3
    isConfirmedCivilServant: false, approvalLetterUrl: '', hasOfficeComputerAccess: false, hasMsOfficeKnowledge: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedTrack = params.get('track');
    if (selectedTrack) {
      setFormData(prev => ({ ...prev, track: selectedTrack }));
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    // Basic validation for Step 1
    if (step === 1 && (!formData.fullName || !formData.nin || !formData.email || !formData.track)) {
      setErrorMsg('Please fill in all mandatory fields and select a track.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <div className="glass max-w-lg w-full rounded-3xl p-10 text-center shadow-2xl">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Thank you for applying to the Women's Empowerment Capacity Building Program. We have received your application and will contact you shortly.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
            <ArrowLeft className="w-5 h-5" /> Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-[100px]"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-500/20 rounded-full mix-blend-multiply filter blur-[100px]"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="mb-8 border-b pb-6 dark:border-slate-700/50">
            <h1 className="text-3xl font-bold mb-2">Program Application Form</h1>
            <p className="text-slate-600 dark:text-slate-400">Step {step} of 2: {step === 1 ? 'Personal Information' : 'Track Requirements'}</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="First Middle Surname" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">National Identity Number (NIN) *</label>
                    <input required name="nin" value={formData.nin} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="11-digit NIN" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Age *</label>
                    <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="Your age" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="preferably Gmail" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="WhatsApp linked" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State of Origin *</label>
                    <input required name="stateOfOrigin" value={formData.stateOfOrigin} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="Your state" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">LGA *</label>
                    <input required name="lga" value={formData.lga} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="Local Government Area" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Local Government Indigene Letter *</label>
                    <input required type="file" accept=".pdf,.jpg,.jpeg,.png" className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Training Track *</label>
                    <div className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-600 dark:text-slate-300 font-medium cursor-not-allowed">
                      {formData.track === 'ecommerce' ? 'Track I: E-Commerce & Digital Marketing' : 
                       formData.track === 'creative' ? 'Track II: Creative Tech & Gig Work' : 
                       formData.track === 'civil_service' ? 'Track III: Digital Civil Service' : 
                       'Please return to home to select a track'}
                    </div>
                    {/* Keep the actual value hidden so it still submits */}
                    <input type="hidden" name="track" value={formData.track} />
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button type="button" onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition">
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl mb-8">
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Track specific requirements</h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">Please provide the additional information required for your selected track.</p>
                </div>

                {formData.track === 'ecommerce' && (
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <input type="checkbox" name="isActiveBusinessOwner" checked={formData.isActiveBusinessOwner} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded" />
                      <span>I am an active business owner</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <input type="checkbox" name="hasBasicLiteracy" checked={formData.hasBasicLiteracy} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded" />
                      <span>I have basic literacy skills (reading/writing numbers, product names)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <input type="checkbox" name="hasSmartphone" checked={formData.hasSmartphone} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded" />
                      <span>I own a functional smartphone with a clear camera</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <input type="checkbox" name="hasWhatsApp" checked={formData.hasWhatsApp} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded" />
                      <span>I have a WhatsApp account and basic familiarity</span>
                    </label>
                  </div>
                )}

                {formData.track === 'creative' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Highest Tertiary Qualification</label>
                      <select name="tertiaryQualification" value={formData.tertiaryQualification} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition">
                        <option value="">Select Qualification</option>
                        <option value="Degree">Degree</option>
                        <option value="HND">HND</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Other">Any other qualification</option>
                      </select>
                    </div>
                    <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <input type="checkbox" name="canCommunicateClearly" checked={formData.canCommunicateClearly} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded" />
                      <span>I can read, write, and communicate clearly in English & native language</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <input type="checkbox" name="hasLaptop" checked={formData.hasLaptop} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded" />
                      <span>I own a functional personal laptop</span>
                    </label>
                    <div>
                      <label className="block text-sm font-medium mb-2 mt-4">Highest Qualification Certificate (Degree, HND, Diploma, or any other qualification) *</label>
                      <input required type="file" accept=".pdf,.jpg,.jpeg,.png" className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                    </div>
                  </div>
                )}

                {formData.track === 'civil_service' && (
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <input type="checkbox" name="isConfirmedCivilServant" checked={formData.isConfirmedCivilServant} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded" />
                      <span>I am a confirmed civil servant in state public service</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <input type="checkbox" name="hasOfficeComputerAccess" checked={formData.hasOfficeComputerAccess} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded" />
                      <span>I have a laptop or daily access to office computers</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <input type="checkbox" name="hasMsOfficeKnowledge" checked={formData.hasMsOfficeKnowledge} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded" />
                      <span>I have basic MS Office knowledge (typing, saving documents)</span>
                    </label>
                    <div>
                      <label className="block text-sm font-medium mb-2 mt-4">Department Approval / No-Objection Letter *</label>
                      <input required type="file" accept=".pdf,.jpg,.jpeg,.png" className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                    </div>
                  </div>
                )}

                <div className="pt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-full font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                    Back
                  </button>
                  <button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition disabled:opacity-70 shadow-lg">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'} <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
