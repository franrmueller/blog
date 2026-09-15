export const SITE = {
  name: 'Francisco Rodriguez Müller',
  /** Shown in the footer. */
  shortName: 'Fran Müller',
  description: 'Notes on enterprise technology, and on the mind.',
} as const;

export const SECTIONS = {
  work: {
    title: 'Work',
    description: 'Posts on SAP, AI, cloud and enterprise technology.',
  },
  mind: {
    title: 'Mind',
    description:
      'Posts on philosophy, neuroscience, psychology, consciousness, physics and religion.',
  },
} as const;

export type Section = keyof typeof SECTIONS;

export const SECTION_KEYS = Object.keys(SECTIONS) as Section[];

/** Flip to true to publish /library/ and show the book icon in the header. */
export const LIBRARY_PUBLIC = false;
