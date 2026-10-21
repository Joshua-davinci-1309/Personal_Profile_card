import type { FieldErrors, MessageInput, ProjectType, ValidationResult } from "./types";
import { projectTypes } from "./types";

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  body: { min: 20, max: 2000 },
} as const;

/**
 * Pragmatic email check: the local part, an @, a dot-separated domain.
 * Deliberately not RFC 5322 — that regex rejects more real addresses than it accepts.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isProjectType(value: unknown): value is ProjectType {
  return typeof value === "string" && (projectTypes as readonly string[]).includes(value);
}

/** Pure, synchronous and dependency-free so it can be unit-tested as-is. */
export function validateMessage(input: MessageInput): ValidationResult {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const body = input.body.trim();

  if (name.length < LIMITS.name.min) {
    errors.name = "Please use at least 2 characters.";
  } else if (name.length > LIMITS.name.max) {
    errors.name = `Keep it under ${LIMITS.name.max} characters.`;
  }

  if (email.length === 0) {
    errors.email = "An email address is required so I can reply.";
  } else if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.email.max) {
    errors.email = "That email address does not look right.";
  }

  if (!isProjectType(input.projectType)) {
    errors.projectType = "Pick the closest match from the list.";
  }

  if (body.length < LIMITS.body.min) {
    errors.body = `Tell me a little more — at least ${LIMITS.body.min} characters.`;
  } else if (body.length > LIMITS.body.max) {
    errors.body = `Trim it to ${LIMITS.body.max} characters.`;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/** Normalised copy of user input, so stored records are never padded with stray spaces. */
export function normaliseMessageInput(input: MessageInput): MessageInput {
  return {
    name: input.name.trim().replace(/\s+/g, " "),
    email: input.email.trim().toLowerCase(),
    projectType: input.projectType,
    body: input.body.trim(),
  };
}
