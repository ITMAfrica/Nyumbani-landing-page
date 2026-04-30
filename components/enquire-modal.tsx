'use client';

import { useEffect, type FormEvent } from 'react';
import Image from 'next/image';
import { ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Dictionary } from '@/lib/dictionaries';

import heroPlatinum from '../photos/hero-1.jpg';
import heroGold from '../photos/hero-2.jpg';

const glassField =
  'w-full rounded-xl border border-white/30 bg-white/[0.06] px-4 py-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition placeholder:text-white/60 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/30 font-light';

export type EnquireModalView = 'lead' | 'tier';

export type EnquireModalProps = {
  open: boolean;
  view: EnquireModalView;
  leadThankYou: boolean;
  leadSubmitting: boolean;
  leadError: string | null;
  modal: Dictionary['modal'];
  onClose: () => void;
  onLeadSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onSelectGold: () => void;
  onSelectPlatinum: () => void;
};

export function EnquireModal({
  open,
  view,
  leadThankYou,
  leadSubmitting,
  leadError,
  modal,
  onClose,
  onLeadSubmit,
  onSelectGold,
  onSelectPlatinum,
}: EnquireModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const backdropDismiss = () => {
    if (view === 'lead' && leadThankYou) return;
    onClose();
  };

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
          <div
            className="absolute inset-0 bg-black/[0.12] backdrop-blur-[2px]"
            onClick={backdropDismiss}
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

              <div className="flex flex-1 flex-col">
                <div className="mb-8 max-w-2xl pr-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                    {modal.enquire}
                  </p>
                  <h3
                    id="contact-modal-title"
                    className="mt-2 font-serif text-2xl font-normal text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] sm:text-4xl"
                  >
                    {view === 'lead' ? modal.captureTitle : modal.chooseApproach}
                  </h3>
                  <p className="mt-3 text-sm font-light text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]">
                    {view === 'lead' ? modal.captureSubtitle : modal.chooseApproachDesc}
                  </p>
                </div>

                {view === 'lead' ? (
                  leadThankYou ? (
                    <div className="flex flex-1 flex-col items-start justify-center py-12 sm:py-16">
                      <p className="font-serif text-2xl text-white sm:text-3xl [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                        {modal.thankYouContact}
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={onLeadSubmit}
                      className="flex max-w-md flex-col gap-5 sm:gap-6"
                      noValidate
                    >
                      <div>
                        <label htmlFor="lead-name" className="sr-only">
                          {modal.fullName}
                        </label>
                        <input
                          id="lead-name"
                          name="lead-name"
                          type="text"
                          autoComplete="name"
                          required
                          disabled={leadSubmitting}
                          placeholder={modal.fullName}
                          className={glassField}
                        />
                      </div>
                      <div>
                        <label htmlFor="lead-email" className="sr-only">
                          {modal.email}
                        </label>
                        <input
                          id="lead-email"
                          name="lead-email"
                          type="email"
                          autoComplete="email"
                          required
                          disabled={leadSubmitting}
                          placeholder={modal.email}
                          className={glassField}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        className="inline-flex w-fit items-center gap-2 border border-gold/50 bg-gold/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-gold/25 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80"
                      >
                        {leadSubmitting ? modal.submitting : modal.submitContact}
                        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      </button>
                      {leadError ? (
                        <p className="text-xs text-red-200" role="alert">
                          {leadError}
                        </p>
                      ) : null}
                    </form>
                  )
                ) : (
                  <div className="grid flex-1 grid-cols-1 gap-5 sm:min-h-[min(420px,50vh)] sm:grid-cols-2 sm:gap-6">
                    <button
                      type="button"
                      onClick={onSelectGold}
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

                    <button
                      type="button"
                      onClick={onSelectPlatinum}
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
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
