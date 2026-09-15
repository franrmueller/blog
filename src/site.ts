export const SITE = {
  name: "Fran's blog",
  /** Shown in the footer. */
  shortName: 'Fran Müller',
  /** Shown in the footer beside the name, in italic. */
  tagline:
    'Some of my conversations with Claude, synthesized into blog posts documenting my learning journey.',
  description: 'Some of my conversations with Claude, synthesized into blog posts documenting my learning journey.',
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
