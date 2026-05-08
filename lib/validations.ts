import { z } from "zod";

// ── Lead / Enquire form ──
export const leadFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().optional(),
  tier: z.enum(["gold", "platinum"]),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

// ── Newsletter form ──
export const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
