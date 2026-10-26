"use server";

import { headers } from "next/headers";
import { services } from "@/content/services";
import { addReview, allowSubmission, reviewsEnabled } from "@/lib/reviews";

export type ReviewFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"rating" | "name" | "area" | "service" | "comment" | "phone", string>>;
  // What the visitor typed, sent back so the form can refill after an error.
  values?: { name: string; area: string; service: string; comment: string; phone: string };
};

const serviceSlugs = new Set([...services.map((s) => s.slug), "other"]);

// Collapse whitespace and drop control characters from free text.
const clean = (value: FormDataEntryValue | null, max: number) =>
  String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

export async function submitReview(_prev: ReviewFormState, formData: FormData): Promise<ReviewFormState> {
  if (!reviewsEnabled()) {
    return { status: "error", message: "Reviews aren't open yet. Please share your feedback on WhatsApp." };
  }

  // Honeypot: a hidden field real visitors never fill in.
  if (clean(formData.get("website"), 200)) return { status: "success" };

  const rating = Number(formData.get("rating"));
  const name = clean(formData.get("name"), 60);
  const area = clean(formData.get("area"), 60);
  const service = clean(formData.get("service"), 40);
  const comment = clean(formData.get("comment"), 1000);
  const phone = clean(formData.get("phone"), 15).replace(/\D/g, "");

  const errors: ReviewFormState["errors"] = {};
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Please choose a star rating.";
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!serviceSlugs.has(service)) errors.service = "Please choose the service you used.";
  if (comment.length < 10) errors.comment = "Please write a few words (at least 10 characters).";
  if (phone && !/^[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a 10-digit mobile number, or leave it empty.";
  const values = { name, area, service, comment, phone };
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    if (!(await allowSubmission(ip))) {
      return { status: "error", message: "You've already sent a few reviews today. Thank you! Please try again tomorrow.", values };
    }
    await addReview({ rating, name, area, service, comment, phone });
  } catch (error) {
    console.error("Saving review failed", error);
    return {
      status: "error",
      message: "Sorry, we couldn't save your review just now. Please try again later or send it to us on WhatsApp.",
      values,
    };
  }
  return {
    status: "success",
    message: "Thank you! Your review has been received and will appear on the website once it's approved.",
  };
}
