import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Team members — MDX. The file name is the username (and the /about/<username>
// slug). The body is the long-form "about me" / bio.
const team = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    // Path under /public (self-hosted — no third-party requests).
    avatar: z.string(),
    order: z.number().default(99),
    tagline: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
  }),
});

export const collections = { team };
