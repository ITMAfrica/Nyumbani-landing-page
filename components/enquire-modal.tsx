"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Dictionary } from "@/lib/dictionaries";

import heroPlatinum from "../photos/hero-1.jpg";
import heroGold from "../photos/hero-2.jpg";

const glassField =
  "w-full rounded-xl border border-white/30 bg-white/[0.06] px-4 py-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition placeholder:text-white/60 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/30 font-light text-sm";

const glassSelect =
  "w-full rounded-xl border border-white/30 bg-navy/60 px-4 py-3 text-white/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/30 font-light text-sm appearance-none cursor-pointer";

export type EnquireModalProps = {
  open: boolean;
  leadThankYou: boolean;
  leadSubmitting: boolean;
  leadError: string | null;
  modal: Dictionary["modal"];
  onClose: () => void;
  onLeadSubmit: (
    e: FormEvent<HTMLFormElement>,
    tier: "gold" | "platinum",
  ) => void | Promise<void>;
};

export function EnquireModal({
  open,
  leadThankYou,
  leadSubmitting,
  leadError,
  modal,
  onClose,
  onLeadSubmit,
}: EnquireModalProps) {
  const [selectedTier, setSelectedTier] = useState<"gold" | "platinum" | null>(
    null,
  );

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!selectedTier) return;
    onLeadSubmit(e, selectedTier);
  };

  const cardOverlay = (
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
  );

  const chevronIcon = (
    <ChevronRight
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 rotate-90"
      strokeWidth={1.5}
    />
  );

  const leadFormFields = (
    <>
      <input
        id="lead-name"
        name="lead-name"
        type="text"
        autoComplete="name"
        required
        disabled={leadSubmitting}
        placeholder={modal.fullName}
        aria-label={modal.fullName}
        className={glassField}
      />
      <input
        id="lead-email"
        name="lead-email"
        type="email"
        autoComplete="email"
        required
        disabled={leadSubmitting}
        placeholder={modal.email}
        aria-label={modal.email}
        className={glassField}
      />
      <input
        id="lead-phone"
        name="lead-phone"
        type="tel"
        autoComplete="tel"
        disabled={leadSubmitting}
        placeholder={modal.phone}
        aria-label={modal.phone}
        className={glassField}
      />
      <div className="relative">
        <select
          id="lead-plan"
          name="lead-plan"
          disabled={leadSubmitting}
          defaultValue=""
          className={glassSelect}
        >
          <option value="" disabled>
            {modal.selectInvestmentPlan}
          </option>
          <option value="1bed">{modal.plan1bed}</option>
          <option value="2bed">{modal.plan2bed}</option>
          <option value="3bed">{modal.plan3bed}</option>
          <option value="3bedPlus">{modal.plan3bedPlus}</option>
          <option value="shares">{modal.planShares}</option>
        </select>
        {chevronIcon}
      </div>
      <div className="relative">
        <select
          id="lead-reason"
          name="lead-reason"
          disabled={leadSubmitting}
          defaultValue=""
          className={glassSelect}
        >
          <option value="" disabled>
            {modal.reasonForInvestment}
          </option>
          <option value="occupancy">{modal.reasonOccupancy}</option>
          <option value="shortTerm">{modal.reasonShortTerm}</option>
          <option value="longTerm">{modal.reasonLongTerm}</option>
        </select>
        {chevronIcon}
      </div>
    </>
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
              onClose();
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
                  onClose();
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
                  {leadThankYou ? modal.thankYouContact : modal.chooseApproach}
                </h3>
                {!leadThankYou && (
                  <p className="mt-3 text-sm font-light text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]">
                    {selectedTier
                      ? modal.leaveDetails
                      : modal.chooseApproachDesc}
                  </p>
                )}
              </div>

              {/* Cards */}
              {!leadThankYou && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  {/* ==================== GOLD ==================== */}
                  {selectedTier === "gold" ? (
                    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-gold/60 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] ring-2 ring-gold/30">
                      <div className="relative aspect-[16/8] w-full shrink-0 overflow-hidden">
                        <Image
                          src={heroGold}
                          alt="Nyumbani Gold"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          placeholder="blur"
                        />
                        {cardOverlay}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                            {modal.livingCollection}
                          </p>
                          <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">
                            {modal.gold}
                          </p>
                        </div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm p-6 sm:p-8">
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-4"
                          noValidate
                        >
                          {leadFormFields}
                          <button
                            type="submit"
                            disabled={leadSubmitting}
                            className="inline-flex w-fit items-center gap-2 border border-gold bg-gold/30 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white rounded-full transition hover:bg-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80"
                          >
                            {leadSubmitting
                              ? modal.submitting
                              : modal.submitContact}
                            <ChevronRight
                              className="h-3.5 w-3.5"
                              strokeWidth={2}
                              aria-hidden
                            />
                          </button>
                          {leadError ? (
                            <p className="text-xs text-red-200" role="alert">
                              {leadError}
                            </p>
                          ) : null}
                        </form>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedTier("gold")}
                      disabled={leadSubmitting}
                      className="group relative flex min-h-[360px] overflow-hidden rounded-2xl border border-white/20 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80"
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
                    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-gold/60 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] ring-2 ring-gold/30">
                      <div className="relative aspect-[16/8] w-full shrink-0 overflow-hidden">
                        <Image
                          src={heroPlatinum}
                          alt="Nyumbani Platinum"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          placeholder="blur"
                        />
                        {cardOverlay}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                            {modal.investmentCollection}
                          </p>
                          <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">
                            {modal.platinum}
                          </p>
                        </div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm p-6 sm:p-8">
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-4"
                          noValidate
                        >
                          {leadFormFields}
                          <button
                            type="submit"
                            disabled={leadSubmitting}
                            className="inline-flex w-fit items-center gap-2 border border-gold bg-gold/30 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white rounded-full transition hover:bg-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80"
                          >
                            {leadSubmitting
                              ? modal.submitting
                              : modal.submitContact}
                            <ChevronRight
                              className="h-3.5 w-3.5"
                              strokeWidth={2}
                              aria-hidden
                            />
                          </button>
                          {leadError ? (
                            <p className="text-xs text-red-200" role="alert">
                              {leadError}
                            </p>
                          ) : null}
                        </form>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedTier("platinum")}
                      disabled={leadSubmitting}
                      className="group relative flex min-h-[360px] overflow-hidden rounded-2xl border border-white/20 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80"
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
