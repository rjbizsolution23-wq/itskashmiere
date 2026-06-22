'use client';

import React, { useState } from 'react';
import { Sparkles, Video, Award, Heart, CheckCircle2, AlertCircle, Send, ArrowRight } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error';
  message: string;
}

export default function PartnerPage() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [form, setForm] = useState({ brand: '', contactName: '', email: '', budget: '$5,000 - $10,000', details: '' });
  const [loading, setLoading] = useState(false);
  const [success, setFormSuccess] = useState(false);

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
    if (!form.brand || !form.email || !form.details) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.contactName + " (Brand: " + form.brand + ")",
          email: form.email,
          subject: `Brand Partnership Inquiry - Budget: ${form.budget}`,
          message: form.details
        })
      });
      const data = await res.json();
      if (res.ok) {
        setFormSuccess(true);
        showToast('success', 'Inquiry sent successfully!');
      } else {
        showToast('error', data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      showToast('error', 'Could not connect to API server.');
    } finally {
      setLoading(false);
    }
  };

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
            <span>Brand Partnership Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Partner with a Creator <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e7c4]">
              People Actually Trust
            </span>
          </h1>
          <p className="text-zinc-400 leading-relaxed text-lg">
            Kashmiere offers authentic brand integrations spanning lifestyle, parenting, accessibility, self-care, and beauty. Build a powerful organic narrative directly to her dedicated multi-platform audience of over 900,000+ total followers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20">
              <h3 className="text-3xl font-black text-[#d4af37]">530K+</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-bold">TikTok Followers</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20">
              <h3 className="text-3xl font-black text-[#d4af37]">250K+</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-bold">YouTube Subscribers</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          {success ? (
            <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-center space-y-6">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold text-emerald-500">Inquiry Received!</h2>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                Thank you for your interest in partnering with Kashmiere. Our collaborations management team will get back to you within 24-48 business hours with custom proposal scopes and our media kit.
              </p>
              <button onClick={() => setFormSuccess(false)} className="px-6 py-2.5 rounded-full text-xs font-bold border border-zinc-800 hover:bg-zinc-900">Send Another Request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 space-y-6">
              <h3 className="text-xl font-bold">Request Brand Collaboration</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Brand / Company Name *</label>
                  <input type="text" required value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Contact Person *</label>
                  <input type="text" required value={form.contactName} onChange={(e) => setForm({...form, contactName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Business Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Estimated Campaign Budget</label>
                <select value={form.budget} onChange={(e) => setForm({...form, budget: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none">
                  <option>$1,500 - $3,000</option>
                  <option>$3,000 - $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Inquiry & Collaboration Details *</label>
                <textarea rows={4} required placeholder="Outline your deliverables, platform channels, expected timeline, and collaboration ideas..." value={form.details} onChange={(e) => setForm({...form, details: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 rounded-xl text-sm font-semibold bg-[#d4af37] text-black hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                <span>{loading ? 'Submitting...' : 'Send Inquiry Request'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
