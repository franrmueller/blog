export const SITE = {
  name: "Fran's blog",
  /** Shown in the footer. */
  shortName: 'Fran Müller',
  /** Shown in the footer beside the name, in italic. */
  tagline:
    'Some of my conversations with Claude, synthesized into blog posts documenting my learning journey.',
  description: 'Some of my conversations with Claude, synthesized into blog posts documenting my learning journey.',
  /** The footer's AI disclaimer: the button label and the note it opens. */
  aiDisclaimer: {
    label: 'AI Disclaimer',
    text:
      "I use Claude as a learning companion for research, structuring ideas, and polishing wording. None of the ideas here are original to me; I'm a student of people far smarter than I am. What I can promise is that I don't publish anything I don't fully understand.",
  },
  /** The footer name's pop-up: the author's profiles, in the order shown. */
  social: {
    linkedin: 'https://www.linkedin.com/in/franrmueller/',
    instagram: 'https://www.instagram.com/franrmuller/',
  },
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
    /** Shown above the post list on the section page. */
    about:
      'Earth is a pocket of complexity that stayed stable long enough for ever more complex systems to give rise to human civilization. The universe has granted me a short run to fight entropy, at what may be the most interesting moment to have one.',
  },
} as const;

export type Section = keyof typeof SECTIONS;

export const SECTION_KEYS = Object.keys(SECTIONS) as Section[];

/** Flip to true to publish /library/ and show the book icon in the header. */
export const LIBRARY_PUBLIC = false;
