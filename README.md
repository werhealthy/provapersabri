# Senty Landing

Iterative rebuild of the Senty landing page.

## Step 1

The current baseline includes:

- React + TypeScript + Vite
- centralized editable content in `src/content/site.ts`
- centralized Senty brand tokens in `src/styles/tokens.css`
- current Senty logo stored locally in `public/senty-logo.svg`
- responsive hero prototype
- GitHub Pages deployment workflow in `.github/workflows/deploy-pages.yml`
- GitHub Pages configured to publish from GitHub Actions

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

The project is intentionally kept small and componentized so future iterations can be reviewed step by step without accumulating versioned CSS overrides or hardcoded page copy.
