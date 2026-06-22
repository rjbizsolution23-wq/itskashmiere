'use client';

import React, { useState } from 'react';
import { Sparkles, Calendar, Video, Mail, Instagram, Youtube, Facebook, ArrowRight, Heart } from 'lucide-react';

export default function StartPage() {
  const [theme] = useState<'dark' | 'light'>('dark');

  const links = [
    { title: 'Watch My Story (WFAA Feature)', icon: <Video className="w-5 h-5 text-[#d4af37]" />, url: 'https://www.youtube.com/channel/UCishpp9Sxk00cTKYJW4f8hQ', highlight: true },
    { title: 'Book 1-on-1 Consultation', icon: <Calendar className="w-5 h-5" />, url: '/#booking' },
    { title: 'Brand Partnerships', icon: <Sparkles className="w-5 h-5" />, url: '/partner' },
    { title: 'Speaking Engagements', icon: <Sparkles className="w-5 h-5" />, url: '/speaking' },
    { title: 'Confidence Workbook & Resources', icon: <Heart className="w-5 h-5" />, url: '/confidence' },
    { title: 'Subscribe to YouTube', icon: <Youtube className="w-5 h-5 text-red-500" />, url: 'https://www.youtube.com/channel/UCishpp9Sxk00cTKYJW4f8hQ' },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col items-center justify-between p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="w-full max-w-md space-y-8 text-center pt-12 relative z-10">
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f3e7c4] p-1 mx-auto shadow-xl shadow-[#d4af37]/10">
            <div className="w-full h-full rounded-full bg-[#18181b] flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-[#d4af37]" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">ITS KASHMIERE</h1>
            <p className="text-sm text-[var(--primary)] text-[#d4af37] font-semibold mt-1">Built Different. Living Fully.</p>
          </div>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto">
            Adaptive lifestyle creator, mother, speaker, and entrepreneur showing the world how to thrive without limits.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={`w-full p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                link.highlight 
                  ? 'bg-gradient-to-r from-[#d4af37]/20 to-amber-500/10 border-[#d4af37]/40 hover:border-[#d4af37]' 
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-zinc-800/50 text-zinc-300 group-hover:text-[#d4af37] transition-colors">
                  {link.icon}
                </div>
                <span className="font-semibold text-sm tracking-wide text-left">{link.title}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-[#d4af37] transition-all" />
            </a>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md text-center space-y-6 pt-12 pb-6 relative z-10">
        <div className="flex justify-center gap-6">
          <a href="https://www.instagram.com/its_kashmiere/" target="_blank" rel="noopener noreferrer" className="p-3 border border-zinc-800 rounded-full hover:border-[#d4af37]/50 text-zinc-400 hover:text-[#d4af37] transition-all">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/channel/UCishpp9Sxk00cTKYJW4f8hQ" target="_blank" rel="noopener noreferrer" className="p-3 border border-zinc-800 rounded-full hover:border-[#d4af37]/50 text-zinc-400 hover:text-[#d4af37] transition-all">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="https://www.facebook.com/kashmiere.culberson.5/" target="_blank" rel="noopener noreferrer" className="p-3 border border-zinc-800 rounded-full hover:border-[#d4af37]/50 text-zinc-400 hover:text-[#d4af37] transition-all">
            <Facebook className="w-5 h-5" />
          </a>
        </div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
          © 2026 ITS Kashmiere · RJ Business Solutions
        </p>
      </div>
    </div>
  );
}
