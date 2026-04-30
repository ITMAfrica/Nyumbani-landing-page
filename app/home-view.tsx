'use client';

import { useState, useEffect, useCallback, useRef, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useI18n } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionaries';
import { EnquireModal } from '@/components/enquire-modal';

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
      image: heroPlatinum,
    },
    {
      tagline: dict.hero.gold.tagline,
      title: dict.hero.gold.title,
      description: dict.hero.gold.description,
      image: heroGold,
    },
  ];
}

const INTRO_DONE_KEY = 'nyumbani_intro_done';
const INTRO_LEGACY_KEY = 'nyumbani_visited';

export function HomeView({
  initialSearch,
}: {
  initialSearch: Record<string, string | string[] | undefined>;
}) {
  const enquireParam =
    typeof initialSearch.enquire === 'string'
      ? initialSearch.enquire
      : Array.isArray(initialSearch.enquire)
        ? initialSearch.enquire[0]
        : undefined;

  const { dict } = useI18n();
  const HERO_CONTENT = getHeroContent(dict);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<'lead' | 'tier'>('tier');
  const [leadThankYou, setLeadThankYou] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const howWeWorkRef = useRef<HTMLElement>(null);

  const { scrollYProgress: howWeWorkProgress } = useScroll({
    target: howWeWorkRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY1 = useTransform(howWeWorkProgress, [0, 1], ['-15%', '15%']);
  const parallaxY2 = useTransform(howWeWorkProgress, [0, 1], ['10%', '-10%']);

  const persistIntroDone = useCallback(() => {
    try {
      localStorage.setItem(INTRO_DONE_KEY, '1');
      localStorage.removeItem(INTRO_LEGACY_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const openTierModal = useCallback(() => {
    setModalView('tier');
    setLeadThankYou(false);
    setLeadError(null);
    setIsModalOpen(true);
  }, []);

  const closeEnquireModal = useCallback(() => {
    setIsModalOpen(false);
    if (modalView === 'lead') {
      persistIntroDone();
    }
    setLeadThankYou(false);
    setLeadError(null);
    setModalView('tier');
  }, [modalView, persistIntroDone]);

  const handleLeadSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const rawName = (form.elements.namedItem('lead-name') as HTMLInputElement | null)?.value?.trim();
      const rawEmail = (form.elements.namedItem('lead-email') as HTMLInputElement | null)?.value?.trim();
      if (!rawName || !rawEmail) return;
      setLeadSubmitting(true);
      setLeadError(null);
      try {
        const response = await fetch('/api/mail/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: rawName, email: rawEmail }),
        });
        if (!response.ok) {
          throw new Error('lead_submit_failed');
        }
        persistIntroDone();
        try {
          localStorage.setItem(
            'nyumbani_last_lead',
            JSON.stringify({ name: rawName, email: rawEmail, t: Date.now() }),
          );
        } catch {
          /* ignore */
        }
        setLeadThankYou(true);
        window.setTimeout(() => {
          setLeadThankYou(false);
          setModalView('tier');
          setIsModalOpen(false);
        }, 2200);
      } catch {
        setLeadError(dict.modal.sendFailed);
      } finally {
        setLeadSubmitting(false);
      }
    },
    [dict.modal.sendFailed, persistIntroDone],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_CONTENT.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onOpen = () => openTierModal();
    window.addEventListener('nyumbani:open-enquire', onOpen);
    return () => window.removeEventListener('nyumbani:open-enquire', onOpen);
  }, [openTierModal]);

  useEffect(() => {
    if (enquireParam === '1') return;
    try {
      if (localStorage.getItem(INTRO_DONE_KEY) || localStorage.getItem(INTRO_LEGACY_KEY)) return;
      const timer = window.setTimeout(() => {
        setModalView('lead');
        setLeadThankYou(false);
        setIsModalOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    } catch {
      /* localStorage unavailable */
    }
  }, [enquireParam]);

  useEffect(() => {
    if (enquireParam !== '1') return;

    queueMicrotask(() => {
      openTierModal();
      window.history.replaceState(null, '', '/');
    });
  }, [enquireParam, openTierModal]);

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
          <div className="max-w-xl w-full flex flex-col gap-20 sm:gap-28">
            <Link
              href="/"
              className="inline-flex shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 rounded-sm"
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
              className="text-white flex flex-col gap-6 sm:gap-8"
            >
              <motion.span 
                className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-gold"
              >
                {HERO_CONTENT[currentImageIndex].tagline}
              </motion.span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.1] sm:leading-[1.1] font-normal">
                {HERO_CONTENT[currentImageIndex].title}
              </h1>
              
              <p className="text-sm md:text-base font-light opacity-90 leading-relaxed max-w-lg">
                {HERO_CONTENT[currentImageIndex].description}
              </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openTierModal}
              className="hidden sm:inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase px-6 py-2.5 rounded-full transition hover:bg-white/20 hover:border-white/50"
            >
              {dict.hero.enquireNow}
            </button>
          </div>
            </motion.div>
          </AnimatePresence>
          </div>
        </div>

        {/* Carousel Indicators — bottom row on small screens avoids overlap with hero copy; sidebar from md */}
        <div className="pointer-events-auto absolute z-20 flex gap-8 text-white font-serif text-xl sm:text-2xl max-md:bottom-[7.25rem] max-md:left-1/2 max-md:right-auto max-md:-translate-x-1/2 max-md:flex-row max-md:flex-nowrap max-md:items-center max-md:justify-center max-md:px-4 md:inset-x-auto md:bottom-auto md:left-auto md:translate-x-0 md:right-8 md:top-1/2 md:-translate-y-1/2 md:flex-col md:items-end md:gap-6 lg:right-16">
          {HERO_CONTENT.map((_, index) => {
            const isActive = index === currentImageIndex;
            return (
              <button
                key={index}
                type="button"
                aria-current={isActive ? 'true' : undefined}
                aria-label={HERO_CONTENT[index].tagline}
                onClick={() => setCurrentImageIndex(index)}
                className={`touch-manipulation flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-3 px-2 py-1 [-webkit-tap-highlight-color:transparent] transition-all duration-500 sm:gap-4 md:min-h-0 md:min-w-0 md:justify-start md:p-0 group cursor-pointer ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
              >
                <div
                  className={`hidden h-[2px] bg-white transition-all duration-500 md:block ${isActive ? 'w-10 sm:w-12' : 'w-0 group-hover:w-6 sm:group-hover:w-8'}`}
                />
                <span className={`leading-none transition-all duration-300 ${isActive ? 'text-gold' : ''}`}>
                  0{index + 1}
                </span>
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
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-slate-600 font-normal text-lg leading-relaxed mb-6">
            {dict.howWeWork.description}
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-slate-500 font-light leading-relaxed border-l-2 border-gold/30 pl-5">
            {dict.howWeWork.tiers}
          </motion.div>
        </motion.div>
      </section>

      <EnquireModal
        open={isModalOpen}
        view={modalView}
        leadThankYou={leadThankYou}
        leadSubmitting={leadSubmitting}
        leadError={leadError}
        modal={dict.modal}
        onClose={closeEnquireModal}
        onLeadSubmit={handleLeadSubmit}
        onSelectGold={() => {
          closeEnquireModal();
          window.location.href = '/pricing/gold';
        }}
        onSelectPlatinum={() => {
          closeEnquireModal();
          window.location.href = '/pricing/platinum';
        }}
      />
    </main>
  );
}
