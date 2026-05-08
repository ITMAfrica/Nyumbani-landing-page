"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronRight, User, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Dictionary } from "@/lib/dictionaries";

import heroPlatinum from "../photos/hero-1.jpg";

// ── Schema for contact capture (no tier selection) ──
export const contactCaptureSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().optional(),
});

export type ContactCaptureValues = z.infer<typeof contactCaptureSchema>;

// ── Glass field styles (matching enquire-modal) ──
const glassField =
  "w-full rounded-xl border border-white/30 bg-white/[0.06] pl-11 pr-4 py-3.5 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition placeholder:text-white/50 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/30 font-light text-sm";

const glassFieldError =
  "w-full rounded-xl border border-red-400/60 bg-white/[0.06] pl-11 pr-4 py-3.5 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm transition placeholder:text-white/50 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/30 font-light text-sm";

export type ContactCaptureModalProps = {
  open: boolean;
  thankYou: boolean;
  submitting: boolean;
  error: string | null;
  modal: Dictionary["modal"];
  onCloseAction: () => void;
  onSubmitAction: (data: ContactCaptureValues) => Promise<void>;
};

export function ContactCaptureModal({
  open,
  thankYou,
  submitting,
  error,
  modal,
  onCloseAction,
  onSubmitAction,
}: ContactCaptureModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactCaptureValues>({
    resolver: zodResolver(contactCaptureSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => reset(), 300);
      return () => clearTimeout(timer);
    }
  }, [open, reset]);

  const onSubmit = async (data: ContactCaptureValues) => {
    await onSubmitAction(data);
  };

  const labelClass =
    "text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 mb-1.5 block";

  const errorClass = "text-[11px] text-red-300 mt-1 font-light";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex h-[100dvh] items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="capture-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              if (thankYou || submitting) return;
              onCloseAction();
            }}
            aria-hidden
          />

          {/* Card panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/25 bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_32px_80px_-24px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            {/* Header image strip */}
            <div className="relative h-36 sm:h-44 shrink-0 overflow-hidden">
              <Image
                src={heroPlatinum}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 512px"
                placeholder="blur"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  if (thankYou || submitting) return;
                  onCloseAction();
                }}
                disabled={thankYou || submitting}
                className="absolute right-3 top-3 z-20 rounded-full border border-white/35 bg-white/[0.10] p-2 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-sm transition hover:bg-white/20 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Header text over image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  Nyumbani
                </p>
                <h3
                  id="capture-modal-title"
                  className="mt-1 font-serif text-xl font-normal text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] sm:text-2xl"
                >
                  {thankYou ? modal.thankYouContact : modal.captureTitle}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="bg-black/30 backdrop-blur-sm p-5 sm:p-6">
              {/* Thank you state */}
              {thankYou ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/15">
                    <svg
                      className="h-7 w-7 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="font-serif text-lg text-white sm:text-xl">
                    {modal.thankYouContact}
                  </p>
                </motion.div>
              ) : (
                <>
                  <p className="mb-6 text-sm font-light leading-relaxed text-white/80">
                    {modal.captureSubtitle}
                  </p>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                    noValidate
                  >
                    {/* Full Name */}
                    <div>
                      <label htmlFor="capture-name" className={labelClass}>
                        {modal.fullName}
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none"
                          strokeWidth={1.5}
                        />
                        <input
                          id="capture-name"
                          type="text"
                          autoComplete="name"
                          disabled={submitting}
                          placeholder={modal.fullName}
                          aria-label={modal.fullName}
                          className={errors.name ? glassFieldError : glassField}
                          {...register("name")}
                        />
                      </div>
                      {errors.name && (
                        <p className={errorClass} role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="capture-email" className={labelClass}>
                        {modal.email}
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none"
                          strokeWidth={1.5}
                        />
                        <input
                          id="capture-email"
                          type="email"
                          autoComplete="email"
                          disabled={submitting}
                          placeholder={modal.email}
                          aria-label={modal.email}
                          className={
                            errors.email ? glassFieldError : glassField
                          }
                          {...register("email")}
                        />
                      </div>
                      {errors.email && (
                        <p className={errorClass} role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="capture-phone" className={labelClass}>
                        {modal.phone}
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none"
                          strokeWidth={1.5}
                        />
                        <input
                          id="capture-phone"
                          type="tel"
                          autoComplete="tel"
                          disabled={submitting}
                          placeholder={modal.phone}
                          aria-label={modal.phone}
                          className={glassField}
                          {...register("phone")}
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gold/50 bg-gold/25 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-gold/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? modal.submitting : modal.submitContact}
                      <ChevronRight
                        className="h-4 w-4"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </button>

                    {error && (
                      <p className="text-xs text-red-200 text-center" role="alert">
                        {error}
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
