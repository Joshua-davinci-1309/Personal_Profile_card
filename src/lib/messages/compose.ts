import type { Message, MessageStatus } from "./types";
import { projectTypeLabels } from "./types";
import { site } from "@/content/site";

const STATUS_SUBJECT: Record<MessageStatus, string> = {
  draft: "Draft",
  queued: "Ready to send",
};

/**
 * Build a `mailto:` payload from a stored message.
 *
 * The site is static, so "sending" means handing a fully composed email to the
 * visitor's mail client. Nothing is transmitted silently — which is exactly the
 * behaviour people expect from a contact form that cannot call an API yet.
 */
export function composeEmail(message: Message) {
  const subject = `Project enquiry — ${projectTypeLabels[message.projectType]}`;
  const body = [
    message.body,
    "",
    "—",
    `From: ${message.name}`,
    `Email: ${message.email}`,
    `Prepared: ${new Date(message.updatedAt).toLocaleString("en-GB")}`,
  ].join("\n");

  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { href, subject, body, statusLabel: STATUS_SUBJECT[message.status] };
}
