# Remove Cases, Founders, and Update Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the portfolio and founders from the rendered landing page and replace every primary Macken logo with the supplied `m_V2.png`, without changing unrelated content or styling.

**Architecture:** Keep the existing React/Vite component structure intact. Remove only component mounts and navigation/CTA references that expose the portfolio or founders, then introduce one shared PNG asset used by the header, footer, and HTML favicon.

**Tech Stack:** React 19, Vite 7, CSS, static PNG assets

## Global Constraints

- Preserve the current section order for every section that remains.
- Preserve all remaining copy and the current language.
- Preserve colors, typography, spacing, animations, and responsiveness except for minimal logo sizing adjustments.
- Do not add sections, services, CTAs, dependencies, or content.
- Keep existing case media and founder photos in the repository.

---

### Task 1: Add the supplied brand asset

**Files:**
- Create: `public/macken-logo.png`
- Modify: `index.html`

**Interfaces:**
- Consumes: `C:/Users/Latchuk/Downloads/m_V2.png`
- Produces: public asset URL `/macken-logo.png`

- [ ] **Step 1: Verify the source image exists and record its dimensions**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
$image = [System.Drawing.Image]::FromFile('C:\Users\Latchuk\Downloads\m_V2.png')
"$($image.Width)x$($image.Height)"
$image.Dispose()
```

Expected: the command prints valid positive dimensions.

- [ ] **Step 2: Copy the supplied image into the public asset directory**

Run:

```powershell
Copy-Item -LiteralPath 'C:\Users\Latchuk\Downloads\m_V2.png' -Destination 'public\macken-logo.png'
```

- [ ] **Step 3: Point the document favicon to the shared asset**

Change the `<head>` in `index.html` to contain:

```html
<link rel="icon" type="image/png" href="/macken-logo.png" />
```

- [ ] **Step 4: Verify the copied file and favicon reference**

Run:

```powershell
Get-Item 'public\macken-logo.png'
rg -n 'macken-logo\.png' index.html
```

Expected: the PNG exists and `index.html` references it once.

### Task 2: Remove portfolio and founders from the rendered page

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Hero.jsx`

**Interfaces:**
- Consumes: existing component tree and section anchors
- Produces: rendered flow `Hero → Stats → Contact → Footer`

- [ ] **Step 1: Establish the failing source assertions**

Run:

```powershell
rg -n "import (About|Portfolio)|<(About|Portfolio) ?/?>" src\App.jsx
rg -n '#portfolio|Portfolio|View Cases' src\components\Navbar.jsx src\components\Hero.jsx
```

Expected: matches are found before the change.

- [ ] **Step 2: Remove the portfolio and founders mounts**

Delete these imports and JSX mounts from `src/App.jsx`:

```jsx
import About from './components/About';
import Portfolio from './components/Portfolio';
```

```jsx
<Portfolio />
<About />
```

- [ ] **Step 3: Remove links that target the deleted portfolio**

Delete the `Portfolio` navigation anchor from `src/components/Navbar.jsx`:

```jsx
<a href="#portfolio" className="nav-link hoverable">Portfolio</a>
```

Delete the `View Cases` CTA from `src/components/Hero.jsx`:

```jsx
<a href="#portfolio" className="btn btn-primary">View Cases</a>
```

- [ ] **Step 4: Verify the source assertions now pass**

Run:

```powershell
$matches = rg -n "import (About|Portfolio)|<(About|Portfolio) ?/?>" src\App.jsx
if ($LASTEXITCODE -eq 0) { throw $matches }
$matches = rg -n '#portfolio|>Portfolio<|View Cases' src\App.jsx src\components\Navbar.jsx src\components\Hero.jsx
if ($LASTEXITCODE -eq 0) { throw $matches }
```

Expected: both checks return no matches and do not throw.

### Task 3: Replace header and footer logos

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Navbar.css`

**Interfaces:**
- Consumes: `/macken-logo.png`
- Produces: header and footer `<img>` elements using the same primary brand asset

- [ ] **Step 1: Establish the failing logo assertion**

Run:

```powershell
rg -n "assets/logo\.svg|src=\{logo\}" src\App.jsx src\components\Navbar.jsx
```

Expected: old SVG imports and references are found.

- [ ] **Step 2: Replace React logo imports and sources**

Remove `logo.svg` imports from `src/App.jsx` and `src/components/Navbar.jsx`. Replace both old sources with:

```jsx
<img src="/macken-logo.png" alt="MACKEN" className="logo-svg-small" />
```

and:

```jsx
<img src="/macken-logo.png" alt="MACKEN Logo" className="logo-svg" />
```

- [ ] **Step 3: Apply only the sizing needed for the portrait PNG**

Update existing logo CSS so the image keeps its aspect ratio and does not expand the navigation:

```css
.logo-svg {
    width: auto;
    height: 42px;
    object-fit: contain;
}
```

Give the footer image an equivalent contained height through its existing class or current inline styling.

- [ ] **Step 4: Verify all primary logo references**

Run:

```powershell
$oldLogo = rg -n "assets/logo\.svg|src=\{logo\}" src\App.jsx src\components\Navbar.jsx
if ($LASTEXITCODE -eq 0) { throw $oldLogo }
rg -n 'macken-logo\.png' index.html src\App.jsx src\components\Navbar.jsx
```

Expected: no old imports or bindings; one shared PNG reference in the favicon, header, and footer.

### Task 4: Validate behavior and layout

**Files:**
- Verify: all modified source and asset files

**Interfaces:**
- Consumes: completed Tasks 1–3
- Produces: buildable production bundle with unchanged unrelated content

- [ ] **Step 1: Run lint**

Run:

```powershell
npm run lint
```

Expected: exit code 0.

- [ ] **Step 2: Run the production build**

Run:

```powershell
npm run build
```

Expected: exit code 0 and a generated `dist` bundle.

- [ ] **Step 3: Inspect the final diff for scope**

Run:

```powershell
git diff --check
git diff --stat
git diff -- src\App.jsx src\components\Navbar.jsx src\components\Navbar.css src\components\Hero.jsx index.html
```

Expected: only the requested removals, logo references, and minimal sizing changes appear.

- [ ] **Step 4: Verify desktop and mobile**

Start the local site with:

```powershell
npm run dev -- --host 127.0.0.1
```

Inspect desktop and mobile widths and confirm:

- the new logo is visible in header and footer without distortion;
- no portfolio/cases section or link is rendered;
- Fabio and Felipe do not appear;
- Stats, Contact, footer, animations, and remaining copy are unchanged.

- [ ] **Step 5: Commit the implementation**

Run:

```powershell
git add index.html public/macken-logo.png src/App.jsx src/components/Navbar.jsx src/components/Navbar.css src/components/Hero.jsx docs/superpowers/plans/2026-07-27-remove-cases-founders-update-logo.md
git commit -m "feat: remove cases and founders and update logo"
```
