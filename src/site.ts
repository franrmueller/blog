export const SITE = {
  name: 'Francisco Rodriguez Müller',
  description: 'Notes on enterprise technology, and on the mind.',
  linkedin: 'https://www.linkedin.com/in/franrmueller',
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
