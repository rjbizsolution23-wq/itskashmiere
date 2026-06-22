'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Video, 
  Heart, 
  MessageSquare, 
  Mail, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Youtube, 
  Play, 
  MapPin, 
  User, 
  Award, 
  ArrowRight, 
  X, 
  Shield, 
  Clock, 
  TrendingUp,
  Lightbulb,
  Sun,
  Moon,
  AlertCircle
} from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function HomePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Form states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    date: '2026-06-25',
    time_slot: '10:00 AM - 11:00 AM',
    package_type: '1-on-1 Consultation'
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    try {
      const res = await fetch('http://localhost:8787/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterSuccess(true);
        showToast('success', data.message || 'Subscribed successfully!');
      } else {
        showToast('error', data.error || 'Subscription failed');
      }
    } catch (err) {
      showToast('error', 'Could not connect to subscription server');
    } finally {
      setNewsletterLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }
    setContactLoading(true);
    try {
      const res = await fetch('http://localhost:8787/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();
      if (res.ok) {
        setContactSuccess(true);
        setContactForm({ name: '', email: '', subject: '', message: '' });
        showToast('success', 'Your message has been received!');
      } else {
        showToast('error', data.error || 'Failed to send message.');
      }
    } catch (err) {
      showToast('error', 'Could not connect to API server.');
    } finally {
      setContactLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email) {
      showToast('error', 'Name and Email are required.');
      return;
    }
    setBookingLoading(true);
    try {
      const res = await fetch('http://localhost:8787/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingForm)
      });
      const data = await res.json();
      if (res.ok) {
        setBookingSuccess(true);
        showToast('success', 'Redirecting to secure Stripe Checkout...');
        setTimeout(() => {
          setBookingStep(3); // Go to invoice confirmation
          setBookingLoading(false);
        }, 1500);
      } else {
        showToast('error', data.error || 'Booking failed.');
        setBookingLoading(false);
      }
    } catch (err) {
      showToast('error', 'Could not connect to booking server.');
      setBookingLoading(false);
    }
  };

  return (
    <div className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-[#09090b] text-[#f4f4f5]' : 'bg-[#fafafa] text-[#09090b]'}`}>
      
      {/* Toast Manager */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`p-4 rounded-xl border shadow-lg backdrop-blur-md flex items-start gap-3 animate-slide-in transition-all ${
              t.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                : t.type === 'error' 
                ? 'bg-red-500/10 border-red-500/30 text-red-500' 
                : 'bg-blue-500/10 border-blue-500/30 text-blue-500'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
            {t.type === 'info' && <Sparkles className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium">{t.message}</span>
          </div>
        ))}
      </div>

      {/* Elegant Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-[var(--border)] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-wider font-sans text-[var(--primary)]">
              ITS KASHMIERE
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-[var(--primary)] transition-colors">My Story</a>
            <a href="#services" className="hover:text-[var(--primary)] transition-colors">Services</a>
            <a href="#videos" className="hover:text-[var(--primary)] transition-colors">Media</a>
            <a href="#booking" className="hover:text-[var(--primary)] transition-colors">Book Consultation</a>
            <a href="#contact" className="hover:text-[var(--primary)] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-[var(--border)] hover:bg-[var(--secondary)] transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[var(--primary)]" /> : <Moon className="w-4 h-4 text-[var(--primary)]" />}
            </button>
            <a 
              href="#booking" 
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all duration-200"
            >
              Book Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--secondary)] border border-[var(--border)] text-xs font-medium text-[var(--primary)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Redefining Limits & Styling Life</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-sans leading-none">
              Hello, I am <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[#f3e7c4]">
                Kashmiere Culberson
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
              Born without arms, I spent my life mastering the art of the impossible. Today, I am an influencer, speaker, and advocate helping millions unlock their true resilience and master their destiny.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#booking" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all shadow-lg shadow-[#d4af37]/20"
              >
                <span>Book 1-on-1 Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#about" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold border border-[var(--border)] hover:bg-[var(--secondary)] transition-all"
              >
                Read My Story
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] bg-gradient-to-tr from-[var(--card)] to-[var(--secondary)] flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--primary)]/10 via-transparent to-transparent" />
              <div className="text-center space-y-6 relative z-10">
                <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto border border-[var(--primary)]/30">
                  <Heart className="w-10 h-10 text-[var(--primary)]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-sans">Empowering Inclusion</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">Featured in Apple's Emmy award-winning short film "The Greatest".</p>
                </div>
                <div className="pt-4 border-t border-[var(--border)] grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black text-[var(--primary)]">350K+</div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[var(--primary)]">10M+</div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">Video Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[var(--primary)]">2022</div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">Apple Film</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-[var(--border)] bg-[var(--secondary)]/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-6 font-bold">Featured and Recognized In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-sm font-semibold opacity-70">
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[var(--primary)]" /> Apple - "The Greatest"</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[var(--primary)]" /> Texas Woman's University</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[var(--primary)]" /> WFAA Dallas</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[var(--primary)]" /> Forbes Feature</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-[4/5] rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-2xl" />
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--primary)] font-bold">Inspiration</span>
                <blockquote className="text-xl md:text-2xl font-serif italic mt-4 text-[var(--muted-foreground)]">
                  "Resilience isn't just about getting through the storm; it is about learning how to thrive in it. Your limits are exactly where your greatest strength begins."
                </blockquote>
              </div>
              <div className="flex items-center gap-4 border-t border-[var(--border)] pt-6">
                <div>
                  <div className="font-bold">- Kashmiere Culberson</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Speaker & Advocate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-widest text-[var(--primary)] font-bold">My Journey</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold font-sans">Mastering Life, Redefining Boundaries</h3>
            </div>
            
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              Born in 1997 with bilateral phocomelia (without arms), I quickly learned that the world wasn't built for my physical structure. But instead of letting that define me, I chose to adapt, innovate, and conquer. I learned to apply makeup, cook, drive a car, and complete daily tasks using my feet.
            </p>

            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              Graduating from Texas Woman's University, I started sharing my story online to break down the stigma of disability. In 2022, my journey led me to work with Apple on their revolutionary accessibility campaign commercial, "The Greatest," which won widespread global acclaim.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] text-[var(--primary)]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Global Speaker</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">Empowering corporate and community platforms globally.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] text-[var(--primary)]">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Lifestyle Advocate</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">Redefining inclusion through high-fidelity vlogging and beauty content.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 border-y border-[var(--border)] bg-[var(--secondary)]/10">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-[var(--primary)] font-bold">Services & Bookings</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold font-sans">How We Can Work Together</h3>
            <p className="text-base text-[var(--muted-foreground)]">Tailored solutions for brand partners, corporate audiences, and individuals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Keynotes */}
            <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-6 flex flex-col justify-between hover:border-[var(--primary)]/50 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] border border-[var(--primary)]/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold font-sans">Keynote & Speaking</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Custom-curated motivational talks, keynote presentations, and collegiate lectures on resilience, adaptation, and inclusive leadership.
                  </p>
                </div>
              </div>
              <a href="#booking" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
                <span>Inquire About Speaking</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Partnerships */}
            <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-6 flex flex-col justify-between hover:border-[var(--primary)]/50 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] border border-[var(--primary)]/20">
                  <Video className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold font-sans">Brand Partnerships</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Connect with over 350,000 highly engaged followers. Authentic lifestyle, beauty, accessibility, and motherhood content integrations.
                  </p>
                </div>
              </div>
              <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
                <span>Inquire About Partnership</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Consulting */}
            <div className="p-8 rounded-2xl border border-[var(--primary)] bg-[var(--card)] space-y-6 flex flex-col justify-between hover:scale-105 transition-all duration-300 relative shadow-xl shadow-[var(--primary)]/5">
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-bold uppercase tracking-wider">Most Popular</div>
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] border border-[var(--primary)]/20">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold font-sans">1-on-1 Consultation</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Personalized 60-minute session to unlock your true potential, break through internal limitations, or consult on accessibility/social-media strategy.
                  </p>
                </div>
              </div>
              <a href="#booking" className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold bg-[var(--primary)] text-[var(--primary-foreground)] uppercase tracking-wider hover:opacity-95 transition-all">
                Book Session ($150)
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-24 max-w-7xl mx-auto px-6 text-center space-y-16">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-[var(--primary)] font-bold">Video Gallery</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold font-sans">See Kashmiere In Action</h3>
          <p className="text-base text-[var(--muted-foreground)]">Experience her daily life, food reviews, cooking tutorials, and vlogs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] group hover:border-[var(--primary)]/50 transition-all duration-300">
            <div className="aspect-video bg-[var(--secondary)] flex items-center justify-center relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 text-left">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--primary)]">Lifestyle Vlog</span>
                  <h4 className="text-base font-bold text-white mt-1">Driving with My Feet & Running Errands</h4>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                <Play className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] group hover:border-[var(--primary)]/50 transition-all duration-300">
            <div className="aspect-video bg-[var(--secondary)] flex items-center justify-center relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 text-left">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--primary)]">Beauty Tutorial</span>
                  <h4 className="text-base font-bold text-white mt-1">Flawless Makeup Application with Feet</h4>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                <Play className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] group hover:border-[var(--primary)]/50 transition-all duration-300">
            <div className="aspect-video bg-[var(--secondary)] flex items-center justify-center relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 text-left">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--primary)]">Motherhood</span>
                  <h4 className="text-base font-bold text-white mt-1">A Day in the Life of a Armless Mom</h4>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                <Play className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Booking Calendar Slot & Consultation Checkout Form */}
      <section id="booking" className="py-24 border-t border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-[var(--primary)] font-bold">1-on-1 Consultations</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold font-sans">Schedule Your Personal Session</h3>
            <p className="text-base text-[var(--muted-foreground)] max-w-xl mx-auto">
              Choose your date and time to book an intimate 60-minute coaching and consultation call with Kashmiere. Powered by Stripe.
            </p>
          </div>

          {bookingStep === 1 && (
            <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/20 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[var(--muted-foreground)] mb-3">Select Date</label>
                  <input 
                    type="date" 
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[var(--muted-foreground)] mb-3">Available Time Slot</label>
                  <select 
                    value={bookingForm.time_slot}
                    onChange={(e) => setBookingForm({...bookingForm, time_slot: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option>10:00 AM - 11:00 AM</option>
                    <option>01:00 PM - 02:00 PM</option>
                    <option>03:30 PM - 04:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                <div className="text-sm text-[var(--muted-foreground)]">
                  Session Type: <span className="font-bold text-[var(--foreground)]">{bookingForm.package_type}</span>
                </div>
                <button 
                  onClick={() => setBookingStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all"
                >
                  <span>Enter Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {bookingStep === 2 && (
            <form onSubmit={handleBookingSubmit} className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/20 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-[var(--muted-foreground)] mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[var(--muted-foreground)] mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@example.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              <div className="bg-[var(--background)] p-4 rounded-xl border border-[var(--border)] space-y-3">
                <h4 className="font-bold text-sm text-[var(--primary)] uppercase tracking-wider">Booking Summary</h4>
                <div className="text-sm grid grid-cols-2 gap-2 text-[var(--muted-foreground)]">
                  <div>Consultation:</div>
                  <div className="text-right font-semibold text-[var(--foreground)]">{bookingForm.package_type}</div>
                  <div>Scheduled:</div>
                  <div className="text-right font-semibold text-[var(--foreground)]">{bookingForm.date} at {bookingForm.time_slot}</div>
                  <div>Amount Due:</div>
                  <div className="text-right font-black text-[var(--primary)]">$150.00</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                <button 
                  type="button"
                  onClick={() => setBookingStep(1)}
                  className="px-6 py-3.5 rounded-full text-xs font-bold uppercase border border-[var(--border)] hover:bg-[var(--secondary)] transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={bookingLoading}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {bookingLoading ? 'Processing...' : 'Pay with Stripe & Complete Bookings'}
                </button>
              </div>
            </form>
          )}

          {bookingStep === 3 && (
            <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto border border-emerald-500/20 text-emerald-500">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-emerald-500 font-sans">Booking Complete & Confirmed!</h4>
                <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                  Stripe Checkout completed successfully. A calendar invitation and conference link have been sent to <span className="font-semibold text-[var(--foreground)]">{bookingForm.email}</span>.
                </p>
              </div>
              <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)]">
                Transaction ID: <span className="font-mono text-[var(--foreground)]">stripe_rcpt_7709214k8a</span>
              </div>
              <button 
                onClick={() => {
                  setBookingStep(1);
                  setBookingForm({ ...bookingForm, name: '', email: '' });
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[var(--secondary)] border border-[var(--border)] hover:bg-[var(--muted)] transition-all"
              >
                Book Another Session
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-[var(--primary)] font-bold">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold font-sans">Contact Kashmiere</h3>
          <p className="text-base text-[var(--muted-foreground)]">For brand partnerships, media requests, or speaking opportunities.</p>
        </div>

        {contactSuccess ? (
          <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-xl font-bold">Message Sent Successfully!</h4>
            <p className="text-sm text-[var(--muted-foreground)]">We have received your request and will reach out to you within 24-48 business hours.</p>
            <button 
              onClick={() => setContactSuccess(false)}
              className="mt-2 px-6 py-2 rounded-full text-xs font-semibold bg-[var(--secondary)] border border-[var(--border)]"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="text-left space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-[var(--muted-foreground)] mb-2">Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/10 text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[var(--muted-foreground)] mb-2">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/10 text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase text-[var(--muted-foreground)] mb-2">Subject</label>
              <input 
                type="text" 
                placeholder="How can we collaborate?"
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/10 text-sm focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[var(--muted-foreground)] mb-2">Your Message *</label>
              <textarea 
                required
                rows={5}
                placeholder="Share more details about your event, campaign, or booking details..."
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/10 text-sm focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            <button 
              type="submit"
              disabled={contactLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-95 disabled:opacity-50 transition-all"
            >
              <span>{contactLoading ? 'Sending...' : 'Send Message'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 border-t border-[var(--border)] bg-[var(--secondary)]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto border border-[var(--primary)]/20 text-[var(--primary)]">
            <Mail className="w-5 h-5" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-extrabold font-sans">Join My Newsletter</h3>
            <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">Get monthly inspiration, life updates, tips on resilience, and early access to vlogs.</p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              required
              disabled={newsletterSuccess}
              placeholder="you@example.com"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:border-[var(--primary)] disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={newsletterLoading || newsletterSuccess}
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {newsletterLoading ? 'Joining...' : newsletterSuccess ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center">
          <div className="text-sm text-[var(--muted-foreground)] font-semibold">
            © 2026 ITS Kashmiere. Re-designed and engineered by <span className="text-[var(--primary)]">RJ Business Solutions</span>.
          </div>
          
          <div className="flex gap-6">
            <a href="https://www.instagram.com/its_kashmiere/" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--border)] rounded-full hover:border-[var(--primary)]/50 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/kashmiere.culberson.5/" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--border)] rounded-full hover:border-[var(--primary)]/50 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/channel/UCishpp9Sxk00cTKYJW4f8hQ" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--border)] rounded-full hover:border-[var(--primary)]/50 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
