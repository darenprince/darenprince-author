The official project **README.md** is located inside of the main docs folder here:
=====
[View Official README.md](./docs/README.md)
=====
[View Documentation Folder](./docs/)


# 🖥️ Daren Prince Author Platform & Website

Welcome to the official development repository for **Daren M. Prince**, bestselling author of *Game On! Master the Conversation & Win Her Heart*. This site is the digital command center for Daren’s entire brand ecosystem – designed to convert browsers into readers, amplify the author's voice, and build a movement around real connection, emotional intelligence, and modern masculinity.

---

## ⚡️ Mission

This project is built to:

- Showcase Daren’s published and upcoming books
- Deliver his message with confidence, clarity, and brand consistency
- Powerfully reflect the Game On! brand identity (fonts, colors, energy, language)
- Support future expansions like courses, member access, podcasting, affiliate integration, and more
- Be deployed lightning-fast via Netlify with clean modular SCSS and prompt-driven component builds via OpenAI Codex

---

## 🔧 Stack Overview

- **Framework**: Pure HTML + Modular SCSS (CodyHouse-style system)
- **Dark Mode Default**: Site is styled with dark mode as the baseline
- **Theme Toggle**: Each page has a button that switches `theme-dark` and `theme-light`
- **Build Tools**: Node, npm, Netlify CLI
- **Auto Deployment**: Netlify CI/CD connected to GitHub main branch
- **Prompt Engine**: Codex by OpenAI powers real-time generation of components, prompts, and site logic

---

## 🧠 Codex Integration

This project is driven by AI collaboration through OpenAI’s Codex:

- Modular prompts generate SCSS components
- Systematic integration with Codex logic tracked in `docs/CODEX_PROMPTS.md`
- Brand-aware personality definitions in `docs/AGENTS.md`

⚠️ All prompts, component logic, and layout flow must follow the official strategy and never deviate from:
- Brand fonts
- HEX color values
- REM-based spacing logic
- No dashes, no truncation, no approximations

---

## 🎨 Visual Identity

Brand identity is governed by the **Game On! Press Kit** (stored in `/assets/brand/`).

**Fonts:**
For UI and website text, Default CodyHouse style Sans Serif fonts are to be used consistently.

- Futura Bold (Primary Headline)
- Helvetica Medium (Secondary Headline / Navigation)
- Knockout Welterweight (Accents & Stylized Labels)
- Helvetica Now (Body, System, Utility)

**Color Palette:**
- `#FDFDFD` White
- `#D5D5D5` Light Gray
- `#B8BAB7` Medium Gray
- `#3B3C3B` Charcoal
 - `#070A06` Black
- `#456F3A` Deep Green
- `#6DA667` Medium Green
- `#87BD72` Bright Green
- `#8CD679` Light Lime Green
- `#C2E9C1` Mint Green

Design must follow clean, bold, masculine UI logic with large readable typography, generous spacing, and no frills.

---

## 🎛 CSS Variables & Tokens

Color variables live in `scss/tokens/_css-vars.scss` and are applied globally under `:root`. The file also defines `.theme-light` overrides so the theme toggle can swap palettes.

Sass variables in `scss/tokens/_colors.scss` map directly to those custom properties. Reference these Sass tokens throughout components so color changes remain centralized.

**Adding a new token**
1. Declare `--color-name` in `_css-vars.scss`.
2. Add `$name: var(--color-name);` to `_colors.scss`.
3. Run `npm run build` to update the compiled CSS.

---

## 🌐 Site Structure

```plaintext
📁 /assets/         # Logos, icons, images, compiled CSS
📁 /scss/           # Modular SCSS (base, layout, components, utilities)
📁 /js/             # Custom scripts (optional)
📁 /member/         # Gated content area (future)
📁 /docs/           # Prompts, logic, visual guide, file structure docs
📄 index.html       # Homepage
📄 components.html  # Master demo sheet for all UI components
📄 setup.sh         # Local setup script
📄 netlify.toml     # Redirect and build config
```

---

## 📄 Planned Pages

1. **Home**
   - Hero headline, featured book, video embed, reviews, email opt-in

2. **Explore Books**
   - Grid layout with all books, buy links, taglines

3. **Book Detail Pages**
   - Per-title highlights with formats, reviews, trailers

4. **About Daren**
   - Long bio, quote, press portrait, personal facts (son DJ, iced coffee, true crime)

5. **Press & Media**
   - Download center for logos, press kit, media requests

6. **Blog**
   - Card layout with sort-by-tag filters and deep posts

7. **Contact**
   - Email form (no CAPTCHA), direct links to social media, email

## 📦 Container Variants

Layout containers keep content grounded and intentional. Use these classes to control width and create contrast:

- `.container` – centers content with adaptive max-width.
- `.container--spaced` – same width plus vertical and horizontal padding; no background or border.
- `.container--border` – adds a 1px solid border and padding on a transparent backdrop.
- `.container--dark` – dark gray background, white text, and generous padding for high-contrast blocks.

---

## 🛠️ UI Utilities

`/js/ui.js` provides small helpers for toast notifications and progress bars.
Include the module on any page that needs them:

```html
<script type="module" src="/js/ui.js"></script>
```

Usage:

```javascript
// showToast is an alias of GameOnUI.toast
GameOnUI.showToast('Saved!', 'success');
const bar = document.querySelector('.progress');
GameOnUI.showProgress(bar);
GameOnUI.setProgress(bar, 50);
```

---

## ✍️ Writing & Voice

This brand does not tolerate fluff, gimmicks, or generic advice.

**Tone = Confident + Real + Psychology-backed + Emotionally intelligent**

Approved language includes:
- “Master the conversation”
- “Authentic attraction”
- “Magnetic energy”
- “Unfiltered honesty”
- “Modern dating decoded”
- “Conversations that hit different”

All public content, meta descriptions, button text, and landing copy must reflect the **Game On! Vibe**: bold, magnetic, no shortcuts, real confidence.

---

## 🚀 Deployment & Development

Build Tools:
```bash
./scripts/local_setup.sh   # install deps and compile once
./scripts/start_dev.sh     # watch files & launch dev server
npm run build              # one-time SCSS compilation
npm run watch              # live watching and compiling
```

Local Preview (via Netlify CLI):
```bash
npm install -g netlify-cli
netlify dev
```

Deployment: Push to `main` auto-deploys via Netlify CI/CD.

### Supabase Setup

1. Copy `.env.example` to `.env` and fill in `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
2. Run `npm run build` (or `npm run watch`) to generate `js/env.js` with your credentials.
3. Apply database changes with the Supabase CLI:
   ```bash
   supabase db push
   ```
   This creates tables like `profiles` and configures Row-Level Security.
4. Deploy edge functions as needed, e.g.:
   ```bash
   supabase functions deploy secure-storage
   ```
5. For production hosts (Netlify, etc.), set the same environment variables in the project settings so the build step can access them.

### Dashboard on Netlify
1. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` env vars in your Netlify project.
2. Deploy the site and visit `/login.html` to sign in.
3. Authenticated users are redirected to `dashboard.html` where they can manage files and profile info.


---

## 🔒 Licensing

This project is protected under [CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/)

> No commercial reuse. No alteration of branding. Attribution required.

---

## 📬 Contact

- Official Site: [darenprince.com](https://www.darenprince.com)
- Press & Media: [press@darenprince.com](mailto:press@darenprince.com)
- Publisher: [publishing@darenprince.com](mailto:publishing@darenprince.com)

---

Built with 🔥 by Daren Prince & OpenAI Codex
