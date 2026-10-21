export interface Stat {
  label: string;
  value: string;
  detail: string;
}

/** Proof points. Only claim what is true and checkable. */
export const stats: Stat[] = [
  {
    label: "Years in production",
    value: "3+",
    detail: "Health-care and business systems running on live data since 2022.",
  },
  {
    label: "Reach",
    value: "Countrywide",
    detail: "Deployments that support facilities beyond the Copperbelt.",
  },
  {
    label: "Delivery",
    value: "On schedule",
    detail: "Increment-based delivery with a written scope before any code.",
  },
];
