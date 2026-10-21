/** Domain model for the contact module. Kept framework-free on purpose. */

export const projectTypes = [
  "health-care-systems",
  "business-platforms",
  "api-integration",
  "ui-engineering",
  "maintenance",
  "something-else",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export const projectTypeLabels: Record<ProjectType, string> = {
  "health-care-systems": "Health-care system",
  "business-platforms": "Business platform",
  "api-integration": "API / integration work",
  "ui-engineering": "UI engineering",
  maintenance: "Maintenance & performance",
  "something-else": "Something else",
};

/** `draft` is stored locally; `queued` is ready to be handed to the email client. */
export type MessageStatus = "draft" | "queued";

export interface Message {
  id: string;
  name: string;
  email: string;
  projectType: ProjectType;
  body: string;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
}

export type MessageInput = Pick<Message, "name" | "email" | "projectType" | "body">;

export type MessageField = keyof MessageInput;

export type FieldErrors = Partial<Record<MessageField, string>>;

export interface ValidationResult {
  valid: boolean;
  errors: FieldErrors;
}

export const emptyMessageInput: MessageInput = {
  name: "",
  email: "",
  projectType: "health-care-systems",
  body: "",
};
