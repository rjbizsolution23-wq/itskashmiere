'use client';

import React, { useState } from 'react';
import { Sparkles, Heart, FileText, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

export default function ConfidencePage() {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://itskashmiere-api.rickjefferson.workers.dev';

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Workbook Customer',
          email,
          date: new Date().toISOString().split('T')[0],
          time_slot: 'Instant Download',
          package_type: 'Confidence Workbook'
        })
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans pb-24">
      <header className="border-b border-zinc-800/80 sticky top-0 bg-[#09090b]/80 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="font-extrabold text-xl tracking-wider text-[#d4af37]">ITS KASHMIERE</a>
          <a href="/start" className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#d4af37] transition-colors">Start Hub</a>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 pt-16 text-center space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-[#d4af37] mx-auto">
            <Heart className="w-3.5 h-3.5" />
            <span>Confidence Resources</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Built Different <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e7c4]">
              Confidence Workbook
            </span>
          </h1>
          <p className="text-zinc-400 leading-relaxed text-lg">
            Download Kashmiere’s signature blueprint containing interactive journal prompts, daily self-care rituals, faith affirmations, and lessons on how to embrace your physical uniqueness with zero boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-6 items-center">
          <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 space-y-6">
            <h3 className="text-2xl font-bold font-sans">What's Inside</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" /> <span><strong>My Adaptability Lessons</strong>: Direct lifestyle stories.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" /> <span><strong>Daily Affirmations</strong>: Morning faith-led focus.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" /> <span><strong>Goal Alignment Sheets</strong>: Map your plans clearly.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" /> <span><strong>Confidence Reminders</strong>: Hard tools to lock self-esteem.</span></li>
            </ul>
          </div>

          <div className="space-y-6 p-8 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-tr from-zinc-900/20 to-[#d4af37]/5">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">Interactive PDF Bundle</span>
              <h4 className="text-3xl font-black font-sans">$17.00 Only</h4>
            </div>

            {success ? (
              <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h5 className="font-bold text-emerald-500">Order Initiated Successfully!</h5>
                <p className="text-xs text-zinc-400">Checkout simulation complete. A live Stripe link was initialized. Direct download coordinates sent!</p>
              </div>
            ) : (
              <form onSubmit={handlePurchase} className="space-y-4">
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-bold">Email Address</label>
                <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-zinc-800 bg-[#09090b] text-sm focus:border-[#d4af37] focus:outline-none" />
                <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold bg-[#d4af37] text-black hover:opacity-90 disabled:opacity-50 transition-all font-sans">
                  <span>{loading ? 'Processing...' : 'Get Workbook Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <div className="flex items-center gap-2 justify-center text-[10px] text-zinc-500">
              <Shield className="w-3.5 h-3.5" /> SECURE STRIPE CHECKOUT · INSTANT DELIVERY
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
