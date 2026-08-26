export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "How much does a commission cost?",
    answer:
      "Pricing depends on length, aesthetic and how many revision rounds you need. Send us your date and story, and we will follow up with an exact quote.",
  },
  {
    question: "How many revision rounds are included?",
    answer:
      "Every commission includes two rounds of revisions. Additional passes are available if your story keeps evolving.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Names, dates, a handful of reference images and the tone you are going for. A short brief call covers the rest before animation starts.",
  },
  {
    question: "Do you offer rush delivery?",
    answer:
      "Yes, rush turnaround is available for an additional fee, subject to our current schedule.",
  },
  {
    question: "What formats do we receive?",
    answer:
      "A vertical cut for stories and messaging apps, a horizontal cut for screens, and a source file ready for print or a QR code.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We direct commissions across time zones and deliver everything remotely.",
  },
];
