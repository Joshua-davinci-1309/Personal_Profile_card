export interface Principle {
  id: string;
  title: string;
  body: string;
}

/**
 * The working agreement. These are commitments, not vibes — each one is
 * something a client can hold me to on a Friday afternoon.
 */
export const principles: Principle[] = [
  {
    id: "dates",
    title: "I deliver on the date I quote",
    body: "Scope is estimated honestly and shipped in visible increments. If something is going to slip, you hear it from me the week it slips — not on the deadline.",
  },
  {
    id: "reliable",
    title: "Reliability is the feature",
    body: "Health-care software is used by people who cannot afford a spinner. Error states, empty states, retries and logs get designed in from the first commit.",
  },
  {
    id: "maintainable",
    title: "Written for the next developer",
    body: "Typed interfaces, one source of truth per concern, no copy-pasted logic. DRY is not a slogan here; it is how the codebase stays cheap to change.",
  },
  {
    id: "problem-first",
    title: "I solve problems, not tickets",
    body: "Before writing code I ask what the system is meant to make possible. Sometimes the right answer is a form and a report, not a platform.",
  },
];
