'use client';

import React, { useState } from 'react';
import { Sparkles, Award, MapPin, Calendar, CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error';
  message: string;
}

export default function SpeakingPage() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [form, setForm] = useState({ name: '', email: '', org: '', date: '', details: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://itskashmiere-api.rickjefferson.workers.dev';

  const showToast = (type: 'success' | 'error', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.org || !form.details) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name + " (" + form.org + ")",
          email: form.email,
          subject: `Speaking Request - Date: ${form.date || 'TBD'}`,
          message: form.details
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        showToast('success', 'Speaking request submitted successfully!');
      } else {
        showToast('error', data.error || 'Failed to submit speaking request.');
      }
    } catch (err) {
      showToast('error', 'Could not connect to API server.');
    } finally {
      setLoading(false);
    }
  };

  const topics = [
    { title: 'Built Different: Confidence Without Permission', desc: 'A deeply personal talk exploring self-acceptance, overcoming staring eyes, and developing internal confidence regardless of your circumstances.' },
    { title: 'Mastering Adaptation & Daily Innovation', desc: 'How to redesign your approach to life when standard methods are built without you in mind. Practical strategies for resilience and agility.' },
    { title: 'Faith, Purpose, & Physical Structures', desc: 'Finding purpose and serving God when born into an unconventional physical shape. Uplifting, highly motivational messaging.' }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans pb-24">
      {/* Toast Manager */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((t) => (
          <div key={t.id} className={`p-4 rounded-xl border shadow-lg backdrop-blur-md flex items-start gap-3 animate-slide-in ${t.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
            {t.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium">{t.message}</span>
          </div>
        ))}
      </div>

      <header className="border-b border-zinc-800/80 sticky top-0 bg-[#09090b]/80 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="font-extrabold text-xl tracking-wider text-[#d4af37]">ITS KASHMIERE</a>
          <a href="/start" className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#d4af37] transition-colors">Start Hub</a>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-[#d4af37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Keynote Speaking & Engagements</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Keynotes That Inspire <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e7c4]">
              Real Adaptability
            </span>
          </h1>
          <p className="text-zinc-400 leading-relaxed text-lg">
            Whether addressing universities, national conferences, local communities, or corporate workspaces, Kashmiere delivers high-energy storytelling on perseverance, faith, inclusion, and the physical mastery ofBilaterally phocomelia lifestyle.
          </p>

          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-bold text-[#d4af37]">Key Presentation Topics</h3>
            {topics.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 space-y-2">
                <h4 className="font-bold text-base">{t.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          {success ? (
            <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-center space-y-6">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold text-emerald-500">Speaking Inquiry Sent!</h2>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                Thank you for submitting a speaking engagement invitation. Our scheduling representatives will contact you shortly to review event logistics, date availability, and keynote honorariums.
              </p>
              <button onClick={() => setSuccess(false)} className="px-6 py-2.5 rounded-full text-xs font-bold border border-zinc-800 hover:bg-zinc-900">Book Another Date</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 space-y-6">
              <h3 className="text-xl font-bold">Invite Kashmiere to Speak</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Your Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Organization / School *</label>
                  <input type="text" required value={form.org} onChange={(e) => setForm({...form, org: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Email Address *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Preferred Event Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Event Scope & Details *</label>
                <textarea rows={4} required placeholder="Tell us about your audience, event format (virtual or in-person), location, theme, and key goals..." value={form.details} onChange={(e) => setForm({...form, details: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 rounded-xl text-sm font-semibold bg-[#d4af37] text-black hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                <span>{loading ? 'Submitting...' : 'Send Speaking Request'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
