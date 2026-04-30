'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useI18n } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionaries';

import heroPlatinum from '../photos/hero-1.jpg';
import heroGold from '../photos/hero-2.jpg';
import sectionVillaTop from '../photos/105_MARCUS_GARDEN_SERVICED_APARTMENT/IMG_5001.webp';
import sectionVillaBottom from '../photos/IMAGINE_BY_BENAA_SERVICED_APARTMENT/IMG_4450.webp';

const HERO_LOGO_URL =
  'https://auzyjcdanenhoqyrbjxg.supabase.co/storage/v1/object/public/images/users/7a23a808-8309-4bff-b922-1a9db7482400/e38b6f4a-4227-48e6-8f6d-b3acea7daa8c.png';

function getHeroContent(dict: Dictionary) {
  return [
    {
      tagline: dict.hero.platinum.tagline,
      title: dict.hero.platinum.title,
      description: dict.hero.platinum.description,
      footer: dict.hero.platinum.footer,
      image: heroPlatinum,
    },
    {
      tagline: dict.hero.gold.tagline,
      title: dict.hero.gold.title,
      description: dict.hero.gold.description,
      footer: dict.hero.gold.footer,
      image: heroGold,
    },
  ];
}

const glassField =
  'w-full rounded-xl border border-white/30 bg-white/[0.06] px-4 py-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition placeholder:text-white/60 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/30 font-light';

const glassSelect = `${glassField} appearance-none`;

export function HomeClient({
  initialSearch,
}: {
  initialSearch: Record<string, string | string[] | undefined>;
}) {
  const { dict } = useI18n();
  const HERO_CONTENT = getHeroContent(dict);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'gold' | 'platinum' | null>(null);

  const howWeWorkRef = useRef<HTMLElement>(null);

  const { scrollYProgress: howWeWorkProgress } = useScroll({
    target: howWeWorkRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY1 = useTransform(howWeWorkProgress, [0, 1], ['-15%', '15%']);
  const parallaxY2 = useTransform(howWeWorkProgress, [0, 1], ['10%', '-10%']);

  const openEnquireModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeEnquireModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
    const enquire =
      typeof initialSearch.enquire === 'string'
        ? initialSearch.enquire
        : Array.isArray(initialSearch.enquire)
          ? initialSearch.enquire[0]
          : undefined;
    if (enquire !== '1') return;

    queueMicrotask(() => {
      openEnquireModal();
      window.history.replaceState(null, '', '/');
    });
  }, [openEnquireModal, initialSearch]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative h-[100dvh] min-h-[650px] sm:min-h-[700px] flex flex-col">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_CONTENT[currentImageIndex].image}
                alt={`${dict.hero.alt} ${currentImageIndex + 1}`}
                fill
                className="object-cover object-center"
                priority
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-32 max-w-[1600px] mx-auto w-full">
          <div className="max-w-xl w-full">
            <Link
              href="/"
              className="mb-6 sm:mb-8 inline-flex shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 rounded-sm"
              aria-label="Nyumbani — accueil"
            >
              <Image
                src={HERO_LOGO_URL}
                alt=""
                width={200}
                height={68}
                className="h-11 w-auto sm:h-14 object-contain object-left drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]"
                sizes="(max-width: 640px) 180px, 200px"
                priority
                referrerPolicy="no-referrer"
              />
            </Link>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white"
            >
              <motion.span 
                className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 sm:mb-6"
              >
                {HERO_CONTENT[currentImageIndex].tagline}
              </motion.span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif mb-5 sm:mb-7 leading-[1.1] sm:leading-[1.1] font-normal">
                {HERO_CONTENT[currentImageIndex].title}
              </h1>
              
              <p className="text-sm md:text-base font-light opacity-90 leading-relaxed mb-5 sm:mb-7 max-w-lg">
                {HERO_CONTENT[currentImageIndex].description}
              </p>
              
              <p className="text-xs sm:text-sm md:text-base font-medium italic opacity-90 leading-relaxed mb-8 sm:mb-12 max-w-lg border-l-2 border-gold pl-4 sm:pl-5">
                {HERO_CONTENT[currentImageIndex].footer}
              </p>
              
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openEnquireModal}
              className="hidden sm:inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase px-6 py-2.5 rounded-full transition hover:bg-white/20 hover:border-white/50"
            >
              {dict.hero.enquireNow}
            </button>
          </div>
            </motion.div>
          </AnimatePresence>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute z-10 right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 text-white font-serif text-2xl">
          {HERO_CONTENT.map((_, index) => {
            const isActive = index === currentImageIndex;
            return (
              <button
                key={index} 
                onClick={() => setCurrentImageIndex(index)}
                className={`flex items-center gap-4 group cursor-pointer transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
              >
                <div className={`h-[2px] bg-white transition-all duration-500 ${isActive ? 'w-12' : 'w-0 group-hover:w-8'}`} />
                <span className={`transition-all duration-300 ${isActive ? 'text-gold' : ''}`}>0{index + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll indicator */}
        <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.3em] font-light">{dict.hero.scroll}</span>
          <ChevronDown className="h-4 w-4" style={{ animation: 'bounce-slow 2s infinite' }} strokeWidth={1.5} />
        </div>
      </section>

      {/* Second Section: How We Work */}
      <section
        id="how-we-work"
        ref={howWeWorkRef}
        className="relative py-28 px-8 md:px-16 lg:px-32 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center bg-white overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Left Side: Staggered Images */}
        <div className="relative h-[600px] sm:h-[800px] w-full">
          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: parallaxY1 }}
            className="absolute top-0 left-0 w-3/4 h-[50%] z-10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5"
          >
            <Image
              src={sectionVillaTop}
              alt="Modern white villa exterior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 75vw, 450px"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/20 via-transparent to-gold/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ y: parallaxY2 }}
            className="absolute bottom-0 right-0 w-[65%] h-[60%] z-20 rounded-2xl overflow-hidden shadow-[-10px_10px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
          >
            <Image
              src={sectionVillaBottom}
              alt="Villa at dusk"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 65vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-gold/15 via-transparent to-navy/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </motion.div>

          <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-gold/30 rounded-br-3xl pointer-events-none" />
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
            <div className="h-[2px] w-12 bg-gold" />
            <h3 className="uppercase tracking-[0.2em] font-bold text-xs text-gold-dark">{dict.howWeWork.label}</h3>
          </motion.div>
          
          <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-4xl md:text-5xl font-serif font-normal leading-tight text-slate-900 mb-8">
            {dict.howWeWork.title}
          </motion.h2>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-slate-600 font-medium text-lg leading-relaxed mb-6">
            {dict.howWeWork.description}
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-slate-500 font-light leading-relaxed border-l-2 border-gold/30 pl-5">
            {dict.howWeWork.tiers}
          </motion.div>
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

                <div className="flex flex-1 flex-col">
                  <div className="mb-8 max-w-2xl pr-10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                      {dict.modal.enquire}
                    </p>
                    <h3
                      id="contact-modal-title"
                      className="mt-2 font-serif text-2xl font-normal text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] sm:text-4xl"
                    >
                      {dict.modal.chooseApproach}
                    </h3>
                    <p className="mt-3 text-sm font-light text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]">
                      {dict.modal.chooseApproachDesc}
                    </p>
                  </div>

                  <div className="grid flex-1 grid-cols-1 gap-5 sm:min-h-[min(420px,50vh)] sm:grid-cols-2 sm:gap-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTier('gold');
                        closeEnquireModal();
                        window.location.href = '/pricing/gold';
                      }}
                      className="group relative flex min-h-[280px] overflow-hidden rounded-2xl border border-white/20 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 sm:min-h-0"
                    >
                      <Image
                        src={heroGold}
                        alt="Nyumbani Gold — living collection"
                        fill
                        className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        placeholder="blur"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                      <div className="relative mt-auto flex w-full flex-col gap-3 p-6 sm:p-8">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                            {dict.modal.livingCollection}
                          </p>
                          <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">
                            {dict.modal.gold}
                          </p>
                        </div>
                          <span className="inline-flex w-fit items-center gap-2 border border-gold/50 bg-gold/15 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition group-hover:bg-gold/25 rounded-full">
                            {dict.modal.enquireCta}
                            <ChevronRight className="h-3.5 w-3.5 opacity-90 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                          </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTier('platinum');
                        closeEnquireModal();
                        window.location.href = '/pricing/platinum';
                      }}
                      className="group relative flex min-h-[280px] overflow-hidden rounded-2xl border border-white/20 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 sm:min-h-0"
                    >
                      <Image
                        src={heroPlatinum}
                        alt="Nyumbani Platinum — investment collection"
                        fill
                        className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        placeholder="blur"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                      <div className="relative mt-auto flex w-full flex-col gap-3 p-6 sm:p-8">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                            {dict.modal.investmentCollection}
                          </p>
                          <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">
                            {dict.modal.premium}
                          </p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 border border-gold/50 bg-gold/15 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition group-hover:bg-gold/25 rounded-full">
                            {dict.modal.enquireCta}
                            <ChevronRight className="h-3.5 w-3.5 opacity-90 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                          </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
