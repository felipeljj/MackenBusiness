# Visible Site PT-BR Translation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate every text rendered by the current landing page into natural Brazilian Portuguese while preserving `WE ARE MACKEN` exactly.

**Architecture:** Make copy-only changes inside the five files that render visible page text and update the HTML language attribute. Do not modify component structure, styling, animations, links, state, or hidden legacy components.

**Tech Stack:** React 19, JSX, Vite 7, HTML

## Global Constraints

- Preserve `WE ARE MACKEN` exactly.
- Preserve Macken, Instagram, B2B, white-label, motion, motion graphics, NDA, UX/UI, React, Next.js, front-end, and apps.
- Translate only Navbar, Hero, Stats, Contact, Footer, and visible accessibility copy.
- Do not modify unrendered case or founder components.
- Do not alter layout, styles, animations, links, state, or behavior.

---

### Task 1: Establish the failing English-copy assertion

**Files:**
- Verify: `index.html`
- Verify: `src/App.jsx`
- Verify: `src/components/Navbar.jsx`
- Verify: `src/components/Hero.jsx`
- Verify: `src/components/Stats.jsx`
- Verify: `src/components/Contact.jsx`

**Interfaces:**
- Consumes: current rendered copy
- Produces: a reproducible source assertion that fails before translation

- [ ] **Step 1: Search for every approved English source string**

Run:

```powershell
rg -n "Let's Talk|The premium B2B|Empowering your brand|Partner With Us|Quality born from delivery|Clients Worldwide|Videos Delivered|Sites Delivered|Apps Delivered|Scale Your Business|Premium Quality|Uncompromising aesthetic|High-End Video|Cinematic editing|Rapid Turnaround|Agile deployment|Strict NDA|We remain invisible|Scalable Tech|modern front-end stacks|UX/UI Design|Crafting intuitive|Let's talk business|Send us a direct message|Message on Instagram|All rights reserved" src\App.jsx src\components\Navbar.jsx src\components\Hero.jsx src\components\Stats.jsx src\components\Contact.jsx
```

Expected: matches are found, proving the assertion fails before implementation.

### Task 2: Translate document metadata, navigation, hero, metrics, contact, and footer

**Files:**
- Modify: `index.html`
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/Stats.jsx`
- Modify: `src/components/Contact.jsx`

**Interfaces:**
- Consumes: exact copy in `docs/superpowers/specs/2026-07-27-visible-site-pt-br-design.md`
- Produces: rendered PT-BR copy with unchanged component interfaces

- [ ] **Step 1: Set the document language**

Change:

```html
<html lang="en">
```

to:

```html
<html lang="pt-BR">
```

- [ ] **Step 2: Replace the visible strings**

Replace each English source string with the exact approved Portuguese string from the specification. Keep:

```jsx
const titleText = "WE ARE".split("");
const mackenText = "MACKEN".split("");
```

unchanged.

- [ ] **Step 3: Translate visible accessibility copy**

Change both logo alternatives to:

```jsx
alt="Logo MACKEN"
```

### Task 3: Verify the translation and production bundle

**Files:**
- Verify: all files modified by Task 2

**Interfaces:**
- Consumes: translated source
- Produces: a buildable PT-BR landing page

- [ ] **Step 1: Run the English-copy assertion again**

Run the Task 1 `rg` command.

Expected: no matches.

- [ ] **Step 2: Confirm the preserved heading**

Run:

```powershell
rg -n 'const titleText = "WE ARE"|const mackenText = "MACKEN"' src\components\Hero.jsx
```

Expected: exactly two matches.

- [ ] **Step 3: Confirm the document language and Portuguese copy**

Run:

```powershell
rg -n 'lang="pt-BR"|Vamos conversar|A solução premium|Qualidade construída|Escale o seu negócio|Todos os direitos reservados' index.html src\App.jsx src\components\Navbar.jsx src\components\Hero.jsx src\components\Stats.jsx src\components\Contact.jsx
```

Expected: all representative strings are found.

- [ ] **Step 4: Run the production build**

Run:

```powershell
npm run build
```

Expected: exit code 0.

- [ ] **Step 5: Commit**

Run:

```powershell
git add index.html src/App.jsx src/components/Navbar.jsx src/components/Hero.jsx src/components/Stats.jsx src/components/Contact.jsx docs/superpowers/specs/2026-07-27-visible-site-pt-br-design.md docs/superpowers/plans/2026-07-27-visible-site-pt-br.md
git commit -m "feat: translate visible site to Portuguese"
```
