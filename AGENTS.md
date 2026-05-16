# Project Conventions

## Git — Conventional Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]
```

### Types
- `feat` — new feature
- `fix` — bug fix
- `refactor` — code change that neither fixes nor adds
- `style` — formatting, missing semicolons, etc (no production change)
- `docs` — documentation only
- `chore` — build, deps, config
- `perf` — performance improvement
- `test` — adding/updating tests
- `ui` — visual/design changes (use instead of `style` for CSS/component changes)

### Scope examples
`ui`, `seo`, `pwa`, `car-detail`, `catalog`, `home`, `contact`, `tracking`, `header`, `footer`, `simulator`, `gallery`, `theme`, `data`, `types`, `hooks`, `deps`

### Examples
```
feat(simulator): add financing calculator to car detail
fix(footer): correct broken navigation links
ui(home): redesign hero section with gradient
refactor(icons): migrate from lucide-react to phosphor-icons
chore(deps): remove lucide-react dependency
```

## Tech Stack
- React 19 + TypeScript + Tailwind CSS 4 + Vite 7
- pnpm (package manager)
- wouter (routing)
- @phosphor-icons/react (icons)
- shadcn/ui components

## Design System
- Dark-first (`:root` is dark, `.light` class for light mode)
- Linear-inspired design (Inter Variable font, indigo/violet accent palette)
- Brazilian dealership (Márcio Veículos), PT-BR throughout UI
- WhatsApp as exclusive client contact channel (5521972657221, seller: Roberto)

## Image System
- `client/public/images/cars/{id}/` folders with manifest-based discovery
- `manifest.json` auto-generated via `npm run images:init`
- Remote Unsplash fallback when local images unavailable
