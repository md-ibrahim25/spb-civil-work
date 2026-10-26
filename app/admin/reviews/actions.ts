"use server";

import { updateTag } from "next/cache";
import { headers } from "next/headers";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { deleteReview, REVIEWS_TAG, setReviewStatus, type ReviewStatus } from "@/lib/reviews";

// Server actions can be called directly, so check the password again here
// (the proxy already checked it for the page itself).
async function requireAdmin() {
  if (!isAdminAuthorized((await headers()).get("authorization"))) throw new Error("Not authorised");
}

export async function changeStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as ReviewStatus;
  if (!["pending", "approved", "hidden"].includes(status)) return;
  await setReviewStatus(id, status);
  // Refresh the public review lists right away.
  updateTag(REVIEWS_TAG);
}

export async function removeReview(formData: FormData) {
  await requireAdmin();
  await deleteReview(String(formData.get("id")));
  updateTag(REVIEWS_TAG);
}
