"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useI18n } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { LeadFormValues } from "@/lib/validations";
import { EnquireModal } from "@/components/enquire-modal";
import {
  ContactCaptureModal,
  type ContactCaptureValues,
} from "@/components/contact-capture-modal";

import heroPlatinum from "../photos/hero-1.jpg";
import heroGold from "../photos/hero-2.jpg";
import sectionVillaTop1 from "../photos/105_MARCUS_GARDEN_SERVICED_APARTMENT/IMG_4968.webp";
import sectionVillaTop2 from "../photos/105_MARCUS_GARDEN_SERVICED_APARTMENT/IMG_4974.webp";
import sectionVillaTop3 from "../photos/105_MARCUS_GARDEN_SERVICED_APARTMENT/IMG_4985.webp";
import sectionVillaTop4 from "../photos/105_MARCUS_GARDEN_SERVICED_APARTMENT/IMG_4995.webp";
import sectionVillaTop5 from "../photos/105_MARCUS_GARDEN_SERVICED_APARTMENT/IMG_5001.webp";
import sectionVillaTop6 from "../photos/105_MARCUS_GARDEN_SERVICED_APARTMENT/IMG_5006.webp";
import sectionVillaBottom1 from "../photos/IMAGINE_BY_BENAA_SERVICED_APARTMENT/IMG_4434.webp";
import sectionVillaBottom2 from "../photos/IMAGINE_BY_BENAA_SERVICED_APARTMENT/IMG_4442.webp";
import sectionVillaBottom3 from "../photos/IMAGINE_BY_BENAA_SERVICED_APARTMENT/IMG_4450.webp";
import sectionVillaBottom4 from "../photos/IMAGINE_BY_BENAA_SERVICED_APARTMENT/IMG_4455.webp";
import sectionVillaBottom5 from "../photos/IMAGINE_BY_BENAA_SERVICED_APARTMENT/IMG_4464.webp";
import sectionVillaBottom6 from "../photos/IMAGINE_BY_BENAA_SERVICED_APARTMENT/IMG_4469.webp";

const SECTION_TOP_IMAGES = [
  sectionVillaTop1,
  sectionVillaTop2,
  sectionVillaTop3,
  sectionVillaTop4,
  sectionVillaTop5,
  sectionVillaTop6,
];

const SECTION_BOTTOM_IMAGES = [
  sectionVillaBottom1,
  sectionVillaBottom2,
  sectionVillaBottom3,
  sectionVillaBottom4,
  sectionVillaBottom5,
  sectionVillaBottom6,
];

const HERO_LOGO_URL =
  "https://auzyjcdanenhoqyrbjxg.supabase.co/storage/v1/object/public/images/users/7a23a808-8309-4bff-b922-1a9db7482400/e38b6f4a-4227-48e6-8f6d-b3acea7daa8c.png";

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

const INTRO_DONE_KEY = "nyumbani_intro_done";
const INTRO_LEGACY_KEY = "nyumbani_visited";

export function HomeView({
  initialSearch,
}: {
  initialSearch: Record<string, string | string[] | undefined>;
}) {
  const enquireParam =
    typeof initialSearch.enquire === "string"
      ? initialSearch.enquire
      : Array.isArray(initialSearch.enquire)
        ? initialSearch.enquire[0]
        : undefined;

  const { dict, lang } = useI18n();
  const HERO_CONTENT = getHeroContent(dict);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [topSlideIndex, setTopSlideIndex] = useState(0);
  const [bottomSlideIndex, setBottomSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadThankYou, setLeadThankYou] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const [captureThankYou, setCaptureThankYou] = useState(false);
  const [captureSubmitting, setCaptureSubmitting] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);

  const howWeWorkRef = useRef<HTMLElement>(null);

  const { scrollYProgress: howWeWorkProgress } = useScroll({
    target: howWeWorkRef,
    offset: ["start end", "end start"],
  });
  const parallaxY1 = useTransform(howWeWorkProgress, [0, 1], ["-15%", "15%"]);
  const parallaxY2 = useTransform(howWeWorkProgress, [0, 1], ["10%", "-10%"]);

  const persistIntroDone = useCallback(() => {
    try {
      localStorage.setItem(INTRO_DONE_KEY, "1");
      localStorage.removeItem(INTRO_LEGACY_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const openModal = useCallback(() => {
    setLeadThankYou(false);
    setLeadError(null);
    setIsModalOpen(true);
  }, []);

  const closeEnquireModal = useCallback(() => {
    setIsModalOpen(false);
    setLeadThankYou(false);
    setLeadError(null);
  }, []);

  const openCaptureModal = useCallback(() => {
    setCaptureThankYou(false);
    setCaptureError(null);
    setIsCaptureOpen(true);
  }, []);

  const closeCaptureModal = useCallback(() => {
    setIsCaptureOpen(false);
    setCaptureThankYou(false);
    setCaptureError(null);
  }, []);

  const handleCaptureSubmit = useCallback(
    async (data: ContactCaptureValues) => {
      setCaptureSubmitting(true);
      setCaptureError(null);

      // Mark intro as done immediately so the modal never reappears
      persistIntroDone();

      // Fire-and-forget: send data to backend without blocking the redirect.
      // keepalive: true ensures the request completes even after navigation.
      fetch("/api/mail/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
        keepalive: true,
      }).catch(() => {
        // Silently ignore – the user has already moved on.
      });

      // Redirect immediately to the destination page while the backend updates.
      window.location.href = "/pricing/platinum";
    },
    [persistIntroDone, lang],
  );

  const handleLeadSubmit = useCallback(
    async (data: LeadFormValues) => {
      setLeadSubmitting(true);
      setLeadError(null);

      try {
        const response = await fetch("/api/mail/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, lang }),
        });

        if (!response.ok) {
          throw new Error("lead_submit_failed");
        }

        persistIntroDone();
        setLeadThankYou(true);

        window.setTimeout(() => {
          setLeadThankYou(false);
          setIsModalOpen(false);
          if (data.tier === "gold") {
            window.location.href = "/pricing/gold";
          } else if (data.tier === "platinum") {
            window.location.href = "/pricing/platinum";
          }
        }, 1500);
      } catch {
        setLeadError(dict.modal.sendFailed);
      } finally {
        setLeadSubmitting(false);
      }
    },
    [persistIntroDone, dict.modal.sendFailed, lang],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_CONTENT.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Slideshow timers for How We Work section cards
  useEffect(() => {
    const timer = setInterval(() => {
      setTopSlideIndex((prev) => (prev + 1) % SECTION_TOP_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBottomSlideIndex((prev) => (prev + 1) % SECTION_BOTTOM_IMAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onOpen = () => openModal();
    window.addEventListener("nyumbani:open-enquire", onOpen);
    return () => window.removeEventListener("nyumbani:open-enquire", onOpen);
  }, [openModal]);

  useEffect(() => {
    if (enquireParam === "1") return;
    try {
      if (
        localStorage.getItem(INTRO_DONE_KEY) ||
        localStorage.getItem(INTRO_LEGACY_KEY)
      )
        return;
      const timer = window.setTimeout(() => {
        openCaptureModal();
      }, 1500);
      return () => clearTimeout(timer);
    } catch {
      /* localStorage unavailable */
    }
  }, [enquireParam, openCaptureModal]);

  useEffect(() => {
    if (enquireParam !== "1") return;

    queueMicrotask(() => {
      openModal();
      window.history.replaceState(null, "", "/");
    });
  }, [enquireParam, openModal]);

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
                <motion.span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-gold">
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
                    onClick={openModal}
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
                aria-current={isActive ? "true" : undefined}
                aria-label={HERO_CONTENT[index].tagline}
                onClick={() => setCurrentImageIndex(index)}
                className={`touch-manipulation flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-3 px-2 py-1 [-webkit-tap-highlight-color:transparent] transition-all duration-500 sm:gap-4 md:min-h-0 md:min-w-0 md:justify-start md:p-0 group cursor-pointer ${isActive ? "opacity-100" : "opacity-40 hover:opacity-80"}`}
              >
                <div
                  className={`hidden h-[2px] bg-white transition-all duration-500 md:block ${isActive ? "w-10 sm:w-12" : "w-0 group-hover:w-6 sm:group-hover:w-8"}`}
                />
                <span
                  className={`leading-none transition-all duration-300 ${isActive ? "text-gold" : ""}`}
                >
                  0{index + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll indicator */}
        <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.3em] font-light">
            {dict.hero.scroll}
          </span>
          <ChevronDown
            className="h-4 w-4"
            style={{ animation: "bounce-slow 2s infinite" }}
            strokeWidth={1.5}
          />
        </div>
      </section>

      {/* Second Section: How We Work */}
      <section
        id="how-we-work"
        ref={howWeWorkRef}
        className="relative py-24 md:py-32 px-8 md:px-16 lg:px-32 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center bg-white overflow-hidden"
      >
        {/* Ambient background blurs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/[0.025] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-navy/[0.025] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        {/* Left Side: Refined Staggered Images */}
        <div className="relative h-[550px] sm:h-[750px] md:h-[700px] w-full">
          {/* Top-left corner accent */}
          <div className="absolute -top-5 -left-5 w-20 h-20 border-t-2 border-l-2 border-gold/25 rounded-tl-3xl pointer-events-none z-30" />

          {/* Top image — slightly larger, more deliberate positioning */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ y: parallaxY1 }}
            className="absolute top-[4%] left-0 w-[72%] h-[52%] z-10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] ring-1 ring-black/5"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={topSlideIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={SECTION_TOP_IMAGES[topSlideIndex]}
                  alt={`Villa moderne — ${topSlideIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 75vw, 450px"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-br from-navy/15 via-transparent to-gold/8" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            {/* Slide indicators */}
            <div
              className="absolute bottom-3 right-3 z-[4] flex gap-1.5"
              aria-hidden
            >
              {SECTION_TOP_IMAGES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                    i === topSlideIndex
                      ? "bg-white scale-110"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Decorative middle element — a subtle gold line connecting the two images */}
          <div className="absolute top-[58%] left-[15%] w-[55%] h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent z-15 pointer-events-none" />

          {/* Bottom image — slightly refined shadow and positioning */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            style={{ y: parallaxY2 }}
            className="absolute bottom-[3%] right-0 w-[68%] h-[55%] z-20 rounded-2xl overflow-hidden shadow-[-8px_16px_48px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={bottomSlideIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={SECTION_BOTTOM_IMAGES[bottomSlideIndex]}
                  alt={`Villa au crépuscule — ${bottomSlideIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 65vw, 420px"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-bl from-gold/12 via-transparent to-navy/12" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {/* Slide indicators */}
            <div
              className="absolute bottom-3 right-3 z-[4] flex gap-1.5"
              aria-hidden
            >
              {SECTION_BOTTOM_IMAGES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                    i === bottomSlideIndex
                      ? "bg-white scale-110"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom-right corner accent */}
          <div className="absolute -bottom-4 -right-4 w-28 h-28 border-b-2 border-r-2 border-gold/25 rounded-br-3xl pointer-events-none z-30" />
        </div>

        {/* Right Side: Refined Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col max-w-[480px]"
        >
          {/* Label */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-12 bg-gold" />
            <h3 className="uppercase tracking-[0.2em] font-bold text-xs text-gold-dark">
              {dict.howWeWork.label}
            </h3>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="text-4xl md:text-5xl font-serif font-normal leading-[1.15] text-slate-900 mb-6"
          >
            {dict.howWeWork.title}
          </motion.h2>

          {/* Value pills — visual anchors between title and description */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
            className="flex flex-wrap gap-2.5 mb-7"
          >
            {dict.howWeWork.pills.map((pill, i) => (
              <motion.span
                key={pill}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                className={`inline-block text-[11px] font-semibold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full border ${
                  i === 0
                    ? "bg-navy/[0.05] border-navy-light/20 text-navy-light"
                    : "bg-platinum/30 border-platinum-dark/25 text-slate-700"
                }`}
              >
                {pill}
              </motion.span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="text-slate-600 font-normal text-base/relaxed md:text-lg/relaxed mb-6"
          >
            {dict.howWeWork.description}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="w-16 h-[1px] bg-gold/30 mb-6 origin-left"
          />

          {/* Tiers info */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="text-slate-500 font-light text-sm/relaxed md:text-base/relaxed border-l-2 border-gold/20 pl-5 mb-7"
          >
            {dict.howWeWork.tiers}
          </motion.div>


        </motion.div>
      </section>

      <ContactCaptureModal
        open={isCaptureOpen}
        thankYou={captureThankYou}
        submitting={captureSubmitting}
        error={captureError}
        modal={dict.modal}
        onCloseAction={closeCaptureModal}
        onSubmitAction={handleCaptureSubmit}
      />

      <EnquireModal
        open={isModalOpen}
        leadThankYou={leadThankYou}
        leadSubmitting={leadSubmitting}
        leadError={leadError}
        modal={dict.modal}
        onCloseAction={closeEnquireModal}
        onLeadSubmitAction={handleLeadSubmit}
      />
    </main>
  );
}
