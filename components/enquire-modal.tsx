"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dictionary } from "@/lib/dictionaries";
import { leadFormSchema, type LeadFormValues } from "@/lib/validations";

import heroPlatinum from "../photos/hero-1.jpg";
import heroGold from "../photos/hero-2.jpg";

const glassField =
  "w-full rounded-xl border border-white/30 bg-white/[0.06] px-4 py-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition placeholder:text-white/60 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/30 font-light text-sm";

const glassFieldError =
  "w-full rounded-xl border border-red-400/60 bg-white/[0.06] px-4 py-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition placeholder:text-white/60 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/30 font-light text-sm";

const glassSelect =
  "w-full rounded-xl border border-white/30 bg-white/[0.06] px-4 py-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/30 font-light text-sm appearance-none cursor-pointer";

export type EnquireModalProps = {
  open: boolean;
  leadThankYou: boolean;
  leadSubmitting: boolean;
  leadError: string | null;
  modal: Dictionary["modal"];
  onCloseAction: () => void;
  onLeadSubmitAction: (data: LeadFormValues) => Promise<void>;
};

export function EnquireModal({
  open,
  leadThankYou,
  leadSubmitting,
  leadError,
  modal,
  onCloseAction,
  onLeadSubmitAction,
}: EnquireModalProps) {
  const [selectedTier, setSelectedTier] = useState<"gold" | "platinum" | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tier: undefined,
    },
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setSelectedTier(null);
        reset();
      }, 300); // wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [open, reset]);

  const handleTierSelect = (tier: "gold" | "platinum") => {
    setSelectedTier(tier);
    setValue("tier", tier);
  };

  const handleBack = () => {
    setSelectedTier(null);
    setValue("tier", undefined as unknown as "gold");
  };

  const onSubmit = async (data: LeadFormValues) => {
    await onLeadSubmitAction(data);
  };

  const cardOverlay = (
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
  );

  const labelClass =
    "text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 mb-1.5 block";

  const errorClass = "text-[11px] text-red-300 mt-1 font-light";

  const formFields = (
    <div className="flex flex-col gap-3">
      {/* Name */}
      <div>
        <label htmlFor="lead-name" className={labelClass}>
          {modal.fullName}
        </label>
        <input
          id="lead-name"
          type="text"
          autoComplete="name"
          disabled={leadSubmitting}
          placeholder={modal.fullName}
          aria-label={modal.fullName}
          className={errors.name ? glassFieldError : glassField}
          {...register("name")}
        />
        {errors.name && (
          <p className={errorClass} role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="lead-email" className={labelClass}>
          {modal.email}
        </label>
        <input
          id="lead-email"
          type="email"
          autoComplete="email"
          disabled={leadSubmitting}
          placeholder={modal.email}
          aria-label={modal.email}
          className={errors.email ? glassFieldError : glassField}
          {...register("email")}
        />
        {errors.email && (
          <p className={errorClass} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="lead-phone" className={labelClass}>
          {modal.phone}
        </label>
        <input
          id="lead-phone"
          type="tel"
          autoComplete="tel"
          disabled={leadSubmitting}
          placeholder={modal.phone}
          aria-label={modal.phone}
          className={glassField}
          {...register("phone")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={leadSubmitting}
        className="mt-2 inline-flex w-fit items-center gap-2 border border-gold bg-gold/30 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white rounded-full transition hover:bg-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {leadSubmitting ? modal.submitting : modal.submitContact}
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      </button>

      {leadError && (
        <p className="text-xs text-red-200" role="alert">
          {leadError}
        </p>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex h-[100dvh] min-h-0 flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/[0.12] backdrop-blur-[2px]"
            onClick={() => {
              if (leadThankYou) return;
              onCloseAction();
            }}
            aria-hidden
          />

          {/* Full-screen glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
            className="relative isolate z-10 flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto border-x border-white/30 bg-white/[0.11] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_24px_80px_-20px_rgba(0,0,0,0.2)] backdrop-blur-md"
          >
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-8 sm:px-10 sm:py-10 lg:max-w-6xl">
              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  if (leadThankYou) return;
                  onCloseAction();
                }}
                disabled={leadThankYou}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/35 bg-white/[0.08] p-2 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-sm transition hover:bg-white/15 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="mb-8 max-w-2xl pr-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  {modal.enquire}
                </p>
                <h3
                  id="contact-modal-title"
                  className="mt-2 font-serif text-2xl font-normal text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] sm:text-4xl"
                >
                  {leadThankYou
                    ? modal.thankYouContact
                    : selectedTier
                      ? modal.requestInfo
                      : modal.chooseApproach}
                </h3>
                {!leadThankYou && (
                  <p className="mt-3 text-sm font-light text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]">
                    {selectedTier
                      ? modal.leaveDetails
                      : modal.chooseApproachDesc}
                  </p>
                )}
              </div>

              {/* Thank you state */}
              {leadThankYou && (
                <div className="flex flex-1 items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <p className="font-serif text-2xl text-white sm:text-3xl">
                      {modal.thankYouContact}
                    </p>
                  </motion.div>
                </div>
              )}

              {/* Tier selection + Form */}
              {!leadThankYou && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  {/* ==================== GOLD ==================== */}
                  {selectedTier === "gold" ? (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="relative flex flex-col overflow-hidden rounded-2xl border border-gold/60 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] ring-2 ring-gold/30"
                      noValidate
                    >
                      <div className="relative aspect-[16/6] w-full shrink-0 overflow-hidden">
                        <Image
                          src={heroGold}
                          alt="Nyumbani Gold"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          placeholder="blur"
                        />
                        {cardOverlay}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                            {modal.livingCollection}
                          </p>
                          <p className="mt-0.5 font-serif text-xl text-white sm:text-2xl">
                            {modal.gold}
                          </p>
                        </div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm p-4 sm:p-5">
                        {/* Back button */}
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={leadSubmitting}
                          className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 transition hover:text-white/90"
                        >
                          <ArrowLeft size={14} strokeWidth={2} />
                          {modal.backToCollections}
                        </button>
                        {formFields}
                      </div>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleTierSelect("gold")}
                      disabled={leadSubmitting || selectedTier !== null}
                      className="group relative flex min-h-[360px] overflow-hidden rounded-2xl border border-white/20 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 disabled:pointer-events-none disabled:opacity-40"
                    >
                      <Image
                        src={heroGold}
                        alt="Nyumbani Gold"
                        fill
                        className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        placeholder="blur"
                      />
                      {cardOverlay}
                      <div className="relative mt-auto flex w-full flex-col gap-3 p-6 sm:p-8">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                            {modal.livingCollection}
                          </p>
                          <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">
                            {modal.gold}
                          </p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 border border-gold/50 bg-gold/15 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition group-hover:bg-gold/25 rounded-full">
                          {modal.enquireCta}
                          <ChevronRight
                            className="h-3.5 w-3.5 opacity-90 transition-transform group-hover:translate-x-0.5"
                            strokeWidth={2}
                          />
                        </span>
                      </div>
                    </button>
                  )}

                  {/* ==================== PLATINUM ==================== */}
                  {selectedTier === "platinum" ? (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="relative flex flex-col overflow-hidden rounded-2xl border border-gold/60 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] ring-2 ring-gold/30"
                      noValidate
                    >
                      <div className="relative aspect-[16/6] w-full shrink-0 overflow-hidden">
                        <Image
                          src={heroPlatinum}
                          alt="Nyumbani Platinum"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          placeholder="blur"
                        />
                        {cardOverlay}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                            {modal.investmentCollection}
                          </p>
                          <p className="mt-0.5 font-serif text-xl text-white sm:text-2xl">
                            {modal.platinum}
                          </p>
                        </div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm p-4 sm:p-5">
                        {/* Back button */}
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={leadSubmitting}
                          className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 transition hover:text-white/90"
                        >
                          <ArrowLeft size={14} strokeWidth={2} />
                          {modal.backToCollections}
                        </button>
                        {formFields}
                      </div>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleTierSelect("platinum")}
                      disabled={leadSubmitting || selectedTier !== null}
                      className="group relative flex min-h-[360px] overflow-hidden rounded-2xl border border-white/20 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 disabled:pointer-events-none disabled:opacity-40"
                    >
                      <Image
                        src={heroPlatinum}
                        alt="Nyumbani Platinum"
                        fill
                        className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        placeholder="blur"
                      />
                      {cardOverlay}
                      <div className="relative mt-auto flex w-full flex-col gap-3 p-6 sm:p-8">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                            {modal.investmentCollection}
                          </p>
                          <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">
                            {modal.platinum}
                          </p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 border border-gold/50 bg-gold/15 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition group-hover:bg-gold/25 rounded-full">
                          {modal.enquireCta}
                          <ChevronRight
                            className="h-3.5 w-3.5 opacity-90 transition-transform group-hover:translate-x-0.5"
                            strokeWidth={2}
                          />
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
