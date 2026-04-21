# 🖥️ Daren Prince Author Platform & Website

⚠️ **Legacy:** This file is kept for historical reference. For the latest information see `docs/README.md`.

Welcome to the official development repository for **Daren M. Prince**, bestselling author of _Game On! Master the Conversation & Win Her Heart_. This site is the digital command center for Daren’s entire brand ecosystem designed to convert browsers into readers, amplify the author's voice, and build a movement around real connection, emotional intelligence, and modern masculinity.

---

## ⚡️ Mission

This project is built to:

- Showcase Daren’s published and upcoming books
- Deliver his message with confidence, clarity, and brand consistency
- Powerfully reflect the Game On! brand identity (fonts, colors, energy, language)
- Support future expansions like courses, member access, podcasting, affiliate integration, and more
- Be deployed via GitHub Pages with clean modular SCSS and prompt-driven component builds via OpenAI Codex

---

## 🔧 Stack Overview

- **Framework**: Pure HTML + Modular SCSS (CodyHouse-style system)
- **Dark Mode Default**: Site is styled with dark mode as the baseline
- **Build Tools**: Node, npm
- **Auto Deployment**: GitHub Pages connected to the GitHub main branch
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

**Official Fonts:**

- League Spartan (Primary Headline)
- Futura (Secondary Headline / Navigation)
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
📄 CNAME            # GitHub Pages custom domain
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
npm run build   # one-time SCSS compilation
npm run watch   # live watching and compiling
```

Local Preview (via Python):

```bash
PORT=8080 ./scripts/start_dev.sh
```

Deployment: Push to `main` to publish via GitHub Pages.

---

## 🔒 Licensing

This project is protected under [CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/)

> No commercial reuse. No alteration of branding. Attribution required.

---

## 📬 Contact

- Official Site: [darenprince.com](https://darenprince.com)
- Press & Media: [press@darenprince.com](mailto:press@darenprince.com)
- Publisher: [publishing@darenprince.com](mailto:publishing@darenprince.com)

---

Built with 🔥 by Daren Prince & OpenAI Codex
