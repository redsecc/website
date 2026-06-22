# RedSec

A free, open project for learning red teaming. Static, **no accounts, no
backend, no trackers**.

## Two sites, two branches

This repo holds two Astro sites that share one brand/design system:

| Branch  | Site | Domain | What it is |
| ------- | ---- | ------ | ---------- |
| `main`  | Marketing / landing | `redsec.cc` | Hero, About, links out to the learning platform. **No learning materials.** |
| `learn` | Learning platform | `learn.redsec.cc` | Paths, lessons, labs, reference — the actual content. |

> **GitHub Pages note:** a single repo can host only one Pages site. `main`
> deploys to `redsec.cc` from this repo. To serve `learn.redsec.cc`, deploy the
> `learn` branch from a separate repo (or another host) — Pages can't publish
> two custom domains from one repo.

- **Stack:** [Astro](https://astro.build) (static output), MDX content
  collections (on `learn`), [Expressive Code](https://expressive-code.com),
  self-hosted fonts ([Inter](https://fontsource.org/fonts/inter) +
  [JetBrains Mono](https://fontsource.org/fonts/jetbrains-mono)).
- **No third-party requests:** no Google Fonts CDN, no analytics, no cookies.
- **Learner state (learn):** progress is stored in `localStorage` only (key
  `redsec:progress`), per-device — never synced to a server.

## Prerequisites

- **Node.js 20 or newer** (Node 22 recommended)
- npm (ships with Node)

## Local development

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:4321)
npm run build    # build the static site to ./dist
npm run preview  # preview the production build locally
```

> The dev server respects the configured `base`, so it serves the site at the
> same path the production build uses.

## Content

All content lives in `src/content/` as Astro content collections:

| Collection  | Location                   | Format | Notes |
| ----------- | -------------------------- | ------ | ----- |
| `paths`     | `src/content/paths/`       | YAML   | Learning-path metadata (`title`, `slug`, `summary`, `order`, `icon`). |
| `lessons`   | `src/content/lessons/`     | MDX    | `title`, `path` (a path slug), `order`, `difficulty`, `summary`, `tags`. |
| `labs`      | `src/content/labs/`        | MDX    | `title`, `objective`, `difficulty`, optional `targetUrl`/`download`. Hints + solution in the body via `<details>`. |
| `reference` | `src/content/reference/`   | MDX    | `title`, `summary`, `order`. |

Schemas are defined and validated in `src/content.config.ts`.

To add a lesson: drop a `.mdx` file in `src/content/lessons/`, set its
frontmatter `path` to an existing path slug, and it appears automatically in
that path (ordered by `order`) with prev/next navigation and progress tracking.

## Deployment (GitHub Pages)

This repo ships a workflow at `.github/workflows/deploy.yml` that builds with
`withastro/action` and publishes via GitHub Pages.

1. Push to the **`main`** branch (the workflow also supports manual
   `workflow_dispatch`).
2. In the repository, go to **Settings → Pages → Build and deployment →
   Source: GitHub Actions**.
3. The site deploys to the URL configured in `astro.config.mjs`.

### `site` / `base` configuration

`astro.config.mjs` is currently set up for a **custom domain**:

```js
site: 'https://redsec.cc',
base: '/',
```

There's a `public/CNAME` file containing `redsec.cc`. In **Settings → Pages →
Custom domain**, set `redsec.cc`, and create these DNS records with your
registrar:

| Type    | Host  | Value |
| ------- | ----- | ----- |
| `A`     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `CNAME` | `www` | `<USERNAME>.github.io` |

(The four `A` records are GitHub Pages' apex IPs.) Enable **Enforce HTTPS**
once the certificate is issued.

#### Deploying somewhere other than `redsec.cc`

The `site`/`base` values depend on **where** you deploy:

- **Custom domain** (current setup): `site: 'https://your-domain'`,
  `base: '/'`, and `public/CNAME` contains your domain.
- **User/organization page** (`https://<USERNAME>.github.io`):
  `site: 'https://<USERNAME>.github.io'`, `base: '/'`, and **delete**
  `public/CNAME`.
- **Project page** (`https://<USERNAME>.github.io/<REPO>`):
  `site: 'https://<USERNAME>.github.io'`, `base: '/<REPO>'`, and **delete**
  `public/CNAME`.

Because `base` may be a subpath, **all internal links and assets go through the
`withBase()` helper** in `src/lib/base.ts` (it reads `import.meta.env.BASE_URL`).
Keep using it for new links so nothing breaks under a project subpath.

`public/.nojekyll` is included so GitHub Pages serves files/folders that start
with `_` (Astro's `_astro/` build output) without Jekyll processing.

## Project structure

```text
.
├─ .github/workflows/deploy.yml   # GitHub Pages build + deploy
├─ astro.config.mjs               # site/base, integrations, EC theme
├─ public/
│  ├─ CNAME                       # custom domain (redsec.cc)
│  ├─ .nojekyll
│  └─ favicon.svg                 # derived from the logo mark
└─ src/
   ├─ assets/redsec_logo.svg      # the brand mark (see note below)
   ├─ components/                 # Header, Footer, cards, Callout, TOC, islands
   ├─ content/                    # paths / lessons / labs / reference
   ├─ content.config.ts           # collection schemas
   ├─ layouts/BaseLayout.astro
   ├─ lib/base.ts                 # withBase() helper
   ├─ pages/                      # routes
   ├─ scripts/progress.ts         # localStorage progress (no server)
   └─ styles/global.css           # design tokens + base styles
```

## Things to fill in

- **Logo:** `src/assets/redsec_logo.svg` is currently a generated placeholder
  mark in the brand red (`#B01927`). Drop in the real `redsec_logo.svg` at that
  path to replace it everywhere (the header and `public/favicon.svg`).
- **Community links:** the footer links to `https://github.com/redsecc/website`
  and `https://discord.gg/asm` — edit them in `src/components/Footer.astro`.

## License

[MIT](./LICENSE). Educational content for **authorized testing only**.
