// Central site metadata + social links. Used for SEO, Open Graph, JSON-LD.
export const SITE = {
  name: 'RedSec',
  url: 'https://redsec.cc',
  tagline: 'Learn to red team.',
  description:
    'RedSec is a free, open learning center for red teaming and offensive security. Structured paths, hands-on labs, and cheatsheets — no accounts, no tracking, one click from any lesson.',
  // Default Open Graph image (1200×630), generated from the brand mark.
  ogImage: '/og.png',
  locale: 'en_US',
  keywords: [
    'red teaming',
    'offensive security',
    'penetration testing',
    'ethical hacking',
    'privilege escalation',
    'web exploitation',
    'capture the flag',
    'cybersecurity training',
    'infosec learning',
  ],
  social: {
    github: 'https://github.com/redsecc/website',
    // Vanity redirect that always points at the current Discord invite.
    discord: 'https://discord.redsec.cc',
  },
} as const;
