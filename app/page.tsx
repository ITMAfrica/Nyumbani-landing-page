'use client';

import { useState, useEffect, useCallback } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { ArrowLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import heroPlatinum from '../photos/GARDEN_CITY_RESIDENCE_302_SERVICED_APARTMENTS/IMG_4191.webp';
import heroGold from '../photos/5B4_MI_VIDA_SERVICED_APARTMENT/IMG_4379.webp';
import sectionVillaTop from '../photos/105_MARCUS_GARDEN_SERVICED_APARTMENT/IMG_5001.webp';
import sectionVillaBottom from '../photos/IMAGINE_BY_BENAA_SERVICED_APARTMENT/IMG_4450.webp';

const HERO_CONTENT: {
  tagline: string;
  title: string;
  description: string;
  footer: string;
  image: StaticImageData;
}[] = [
  {
    tagline: "Nyumbani Platinum",
    title: "Own Nyumbani Platinum Living from $75,000",
    description: "Flexible payment plans available crafted to make premium living within reach without compromise. This is your opportunity to secure a home that reflects your standard and builds your long-term value.",
    footer: "Enquire now and reserve your Nyumbani Platinum unit before prices move up.",
    image: heroPlatinum,
  },
  {
    tagline: "Nyumbani Gold",
    title: "Start Smart with Nyumbani Gold from $16,000 | $267/month",
    description: "Flexible, interest-free payment plans with zero deposit making it easier than ever to step into property ownership without pressure. Whether you're buying your first home or investing in high-growth areas, Nyumbani Gold puts you ahead.",
    footer: "Enquire now and lock in your Nyumbani Gold unit before demand drives prices higher.",
    image: heroGold,
  },
];

/** Champs — verre léger (flou discret pour garder le texte net) */
const glassField =
  'w-full rounded-xl border border-white/30 bg-white/[0.06] px-4 py-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition placeholder:text-white/60 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 font-light';

const glassSelect = `${glassField} appearance-none`;

type EnquireTier = 'gold' | 'premium';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquirePhase, setEnquirePhase] = useState<'pick' | 'form'>('pick');
  const [enquireTier, setEnquireTier] = useState<EnquireTier | null>(null);

  const openEnquireModal = useCallback(() => {
    setEnquirePhase('pick');
    setEnquireTier(null);
    setIsModalOpen(true);
  }, []);

  const closeEnquireModal = useCallback(() => {
    setIsModalOpen(false);
    setEnquirePhase('pick');
    setEnquireTier(null);
  }, []);

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7939/ingest/32182873-86dd-4f51-a134-758351def889', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '4fc41a' },
      body: JSON.stringify({
        sessionId: '4fc41a',
        runId: 'repro-1',
        hypothesisId: 'H1',
        location: 'app/page.tsx:Home',
        message: 'Home client component mounted (bundle executed)',
        data: { path: typeof window !== 'undefined' ? window.location.pathname : '' },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }, []);
  // #endregion

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_CONTENT.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const onOpen = () => openEnquireModal();
    window.addEventListener('nyumbani:open-enquire', onOpen);
    return () => window.removeEventListener('nyumbani:open-enquire', onOpen);
  }, [openEnquireModal]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = new URLSearchParams(window.location.search);
    if (q.get('enquire') === '1') {
      openEnquireModal();
      window.history.replaceState(null, '', '/');
    }
  }, [openEnquireModal]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative h-[100dvh] min-h-[650px] sm:min-h-[700px] flex flex-col">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_CONTENT[currentImageIndex].image}
                alt={`Modern luxury home ${currentImageIndex + 1}`}
                fill
                className="object-cover object-center"
                priority
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center px-8 py-6 w-full max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 text-white">
            <Image 
              src="https://auzyjcdanenhoqyrbjxg.supabase.co/storage/v1/object/public/images/users/7a23a808-8309-4bff-b922-1a9db7482400/e38b6f4a-4227-48e6-8f6d-b3acea7daa8c.png" 
              alt="Nyumbani Logo" 
              width={160} 
              height={54} 
              className="object-contain w-[140px] h-auto sm:w-[160px]"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-32 max-w-[1600px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-xl text-white"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif mb-4 sm:mb-6 leading-tight sm:leading-tight font-normal">
                {HERO_CONTENT[currentImageIndex].title}
              </h1>
              
              <p className="text-sm md:text-base font-light opacity-90 leading-relaxed mb-4 sm:mb-6 max-w-lg">
                {HERO_CONTENT[currentImageIndex].description}
              </p>
              
              <p className="text-xs sm:text-sm md:text-base font-medium italic opacity-90 leading-relaxed mb-6 sm:mb-10 max-w-lg border-l-2 border-[#d4af37] pl-3 sm:pl-4">
                {HERO_CONTENT[currentImageIndex].footer}
              </p>
              
              <button 
                type="button"
                onClick={openEnquireModal}
                className="bg-[#1f2d3d] hover:bg-[#2c3d52] text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-6 py-3 sm:px-8 sm:py-4 transition shadow-xl"
              >
                Enquire Now
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators right absolute */}
        <div className="absolute z-10 right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 text-white font-serif text-2xl">
          {HERO_CONTENT.map((_, index) => {
            const isActive = index === currentImageIndex;
            return (
              <div 
                key={index} 
                onClick={() => setCurrentImageIndex(index)}
                className={`flex items-center gap-4 group cursor-pointer transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
              >
                <div className={`h-[2px] bg-white transition-all duration-500 ${isActive ? 'w-12' : 'w-0 group-hover:w-12'}`} />
                <span>0{index + 1}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Second Section: How We Work */}
      <section
        id="how-we-work"
        className="py-24 px-8 md:px-16 lg:px-32 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-white overflow-hidden"
      >
        
        {/* Left Side: Staggered Images */}
        <div className="relative h-[600px] sm:h-[800px] w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-0 left-0 w-3/4 h-[50%] z-10 shadow-2xl"
          >
            <Image
              src={sectionVillaTop}
              alt="Modern white villa exterior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 75vw, 450px"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-0 right-0 w-[65%] h-[60%] z-20 shadow-[-10px_10px_30px_rgba(0,0,0,0.1)]"
          >
            <Image
              src={sectionVillaBottom}
              alt="Villa at dusk"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 65vw, 400px"
            />
          </motion.div>
        </div>

        {/* Right Side: Text Content */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col max-w-xl"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-[#a78b5e]" />
            <h3 className="uppercase tracking-widest font-bold text-sm text-slate-800">How we work</h3>
          </motion.div>
          
          <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-4xl md:text-5xl font-serif font-normal leading-tight text-slate-900 mb-8">
            Simplifying real estate ownership across Africa
          </motion.h2>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-slate-600 font-medium text-lg leading-relaxed mb-6">
            Nyumbani is a Nairobi-headquartered property brokerage and investment advisory firm dedicated to simplifying real estate ownership for individuals, families, professionals, and diaspora investors across Africa. With the backing of ITM Group—a pan-African business powerhouse with footprints across 23 entities in Africa, Europe, and the UAE—Nyumbani is uniquely positioned to offer trusted, cross-border property solutions to both local and international clients.
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-slate-500 font-light leading-relaxed mb-10">
            Nyumbani operates two client tiers: Nyumbani Platinum (premium, luxury-focused) and Nyumbani Gold (accessible, value-driven), ensuring every market segment can access professional property services aligned with international standards.
          </motion.div>
          
          <motion.button variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="bg-[#1f2d3d] hover:bg-[#2c3d52] text-white text-xs font-semibold tracking-wider uppercase px-8 py-4 transition w-fit">
            View All Developments
          </motion.button>
        </motion.div>
      </section>

      {/* Contact: Enquire flow — collection cards then form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex h-[100dvh] min-h-0 flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/[0.12] backdrop-blur-[2px]"
              onClick={closeEnquireModal}
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: 'spring', duration: 0.45, bounce: 0.12 }}
              className="relative isolate z-10 flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto border-x border-white/30 bg-white/[0.11] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_24px_80px_-20px_rgba(0,0,0,0.2)] backdrop-blur-md"
            >
              <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-8 sm:px-10 sm:py-10 lg:max-w-6xl">
                <button
                  type="button"
                  onClick={closeEnquireModal}
                  className="absolute right-4 top-4 z-20 rounded-full border border-white/35 bg-white/[0.08] p-2 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-sm transition hover:bg-white/15"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>

                <AnimatePresence mode="wait">
                  {enquirePhase === 'pick' ? (
                    <motion.div
                      key="pick"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-1 flex-col"
                    >
                      <div className="mb-8 max-w-2xl pr-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                          Enquire
                        </p>
                        <h3
                          id="contact-modal-title"
                          className="mt-2 font-serif text-2xl font-normal text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] sm:text-4xl"
                        >
                          Choose your approach
                        </h3>
                        <p className="mt-3 text-sm font-light text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]">
                          Select Nyumbani Gold or Premium to continue with your request.
                        </p>
                      </div>

                      <div className="grid flex-1 grid-cols-1 gap-5 sm:min-h-[min(420px,50vh)] sm:grid-cols-2 sm:gap-6">
                        <button
                          type="button"
                          onClick={() => {
                            setEnquireTier('gold');
                            setEnquirePhase('form');
                          }}
                          className="group relative flex min-h-[280px] overflow-hidden rounded-2xl border border-white/20 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/80 sm:min-h-0"
                        >
                          <Image
                            src={heroGold}
                            alt="Nyumbani Gold — living collection"
                            fill
                            className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            placeholder="blur"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                          <div className="relative mt-auto flex w-full flex-col gap-3 p-6 sm:p-8">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                                Living collection
                              </p>
                              <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">
                                Nyumbani Gold
                              </p>
                            </div>
                            <span className="inline-flex w-fit items-center gap-2 border border-white/45 bg-white/10 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition group-hover:bg-white/20">
                              Enquire
                              <ChevronRight className="h-3.5 w-3.5 opacity-90" strokeWidth={2} />
                            </span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEnquireTier('premium');
                            setEnquirePhase('form');
                          }}
                          className="group relative flex min-h-[280px] overflow-hidden rounded-2xl border border-white/20 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/80 sm:min-h-0"
                        >
                          <Image
                            src={heroPlatinum}
                            alt="Nyumbani Premium — investment collection"
                            fill
                            className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            placeholder="blur"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                          <div className="relative mt-auto flex w-full flex-col gap-3 p-6 sm:p-8">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                                Investment collection
                              </p>
                              <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">
                                Premium
                              </p>
                            </div>
                            <span className="inline-flex w-fit items-center gap-2 border border-white/45 bg-white/10 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition group-hover:bg-white/20">
                              Enquire
                              <ChevronRight className="h-3.5 w-3.5 opacity-90" strokeWidth={2} />
                            </span>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="mx-auto flex w-full max-w-xl flex-1 flex-col lg:max-w-2xl"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setEnquirePhase('pick');
                          setEnquireTier(null);
                        }}
                        className="mb-4 flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/80 transition hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                        Back to collections
                      </button>

                      <div className="mb-6 pr-10">
                        <h3
                          id="contact-modal-title"
                          className="font-serif text-2xl font-normal text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4),0_0_20px_rgba(0,0,0,0.35)] sm:text-3xl"
                        >
                          Request Information
                        </h3>
                        {enquireTier ? (
                          <p className="mt-2 text-sm font-medium text-[#d4af37]">
                            {enquireTier === 'gold'
                              ? 'Nyumbani Gold — Living collection'
                              : 'Premium — Investment collection'}
                          </p>
                        ) : null}
                        <p className="mt-2 text-sm font-light text-white/95 [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
                          Leave your details and our team will contact you shortly.
                        </p>
                      </div>

                      <form
                        className="flex flex-1 flex-col gap-4 pb-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          closeEnquireModal();
                        }}
                      >
                        {/* 1. Language Choice */}
                        <div>
                  <label htmlFor="language" className="sr-only">Preferred Language</label>
                  <select 
                    id="language"
                    required
                    defaultValue=""
                    className={glassSelect}
                  >
                    <option value="" disabled className="text-slate-500">Preferred Language / Langue</option>
                    <option value="english" className="bg-slate-800 text-white">English</option>
                    <option value="french" className="bg-slate-800 text-white">Français</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    className={glassField} 
                  />
                </div>

                {/* 2. Email */}
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    className={glassField} 
                  />
                </div>

                {/* 3. Country Code & Phone Number */}
                <div className="flex gap-3">
                  <div className="w-1/3">
                    <label htmlFor="countryCode" className="sr-only">Country Code</label>
                    <input 
                      id="countryCode" 
                      type="text" 
                      placeholder="+Code" 
                      required 
                      className={glassField} 
                    />
                  </div>
                  <div className="w-2/3">
                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                    <input 
                      id="phone" 
                      type="tel" 
                      placeholder="Phone Number" 
                      required 
                      className={glassField} 
                    />
                  </div>
                </div>

                {/* 4. Investment Plan */}
                <div>
                  <label htmlFor="investmentPlan" className="sr-only">Investment Plan</label>
                  <select 
                    id="investmentPlan"
                    required
                    defaultValue=""
                    className={glassSelect}
                  >
                    <option value="" disabled className="text-slate-500">Select Investment Plan</option>
                    <option value="1bed" className="bg-slate-800 text-white">1 bedroom/Studio (USD 16K and below)</option>
                    <option value="2bed" className="bg-slate-800 text-white">2 bedroom (USD 30,000 and below)</option>
                    <option value="3bed" className="bg-slate-800 text-white">3 bedroom (USD 75,000 and below)</option>
                    <option value="3bed_plus" className="bg-slate-800 text-white">3 or more bedrooms (Above USD 75,000)</option>
                    <option value="shares" className="bg-slate-800 text-white">Shares and Bonds etc in Investment</option>
                  </select>
                </div>

                {/* 5. Reason for Investment */}
                <div>
                  <label htmlFor="reason" className="sr-only">Reason for Investment</label>
                  <select 
                    id="reason"
                    required
                    defaultValue=""
                    className={glassSelect}
                  >
                    <option value="" disabled className="text-slate-500">Reason for Investment</option>
                    <option value="occupancy" className="bg-slate-800 text-white">Occupancy (Living In)</option>
                    <option value="short_term" className="bg-slate-800 text-white">Short Term Rental (e.g. Airbnb)</option>
                    <option value="long_term" className="bg-slate-800 text-white">Long Term Rental</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  className="mt-2 w-full rounded-xl border border-white/25 bg-gradient-to-b from-[#d4af37] to-[#b5952f] py-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_0_0_rgba(255,255,255,0.25),0_12px_40px_-8px_rgba(0,0,0,0.45)] transition hover:brightness-110"
                >
                  Submit Request
                </button>
              </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
