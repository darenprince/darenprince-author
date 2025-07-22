
# 🖥️ Daren Prince Author Platform & Website

Welcome to the official development repository for **Daren Prince's** author platform. This project is built with **pure SCSS**, responsive component styles inspired by the **CodyHouse framework**, and actively maintained using **OpenAI Codex** and auto-deployed via **Netlify**.

#Codex Powered Site Framework

Component system built with AI support from OpenAI Codex.

The site is designed to be clean, responsive, and expandable, with features including:

- 🔥 Custom global SCSS styling system (dark mode default)
- 🧩 Modular components: buttons, forms, nav, cards, etc.
- 📚 Individual book pages with purchase links and reviews
- 🎥 Media center: videos, trailers, and promotional content
- 📁 File download center with file preview support
- 📕 3D book cover component for interactive previews
- 🛡️ Member login system for exclusive content access
- 🚀 Auto-deploy via Netlify with clean file structure
- 📦 Built with scalability, performance, and brand alignment in mind

This repo serves as the central build system for maintaining, improving, and expanding the digital presence of Daren M. Prince across all author-related platforms.

---

## 🎯 Project Overview

- **Dark Mode by Default** — All components, layouts, and views are built assuming dark mode is the active theme.
- **SCSS-First** — All styling is modular and built using SCSS variables, functions, mixins, and partials.
- **Codex Integrated** — Prompt-driven development using OpenAI’s Codex (https://chat.openai.com/codex).
- **Custom Component Library** — `components.html` demos every UI component used across the site. Add new components here to keep them organized.
- **3D Book Cover** — see `docs/3d-book-guide.md` for customizing rotating book covers.

---

## 🗂️ Root Folder Structure
- Full folder structure and folder naming conventions can be found in `docs/FILE_STRUCTURE.md`

```bash
📁 assets/            # Compiled CSS, logos, icons and images
📁 scss/              # Source SCSS (base, layout, components, themes)
📁 js/                # Site scripts
📁 member/            # Member area HTML & styles
📁 docs/              # Documentation and guides
📁 test/              # Layout test page
📄 index.html         # Landing page
📄 components.html    # UI component showcase
📄 netlify.toml       # Deployment config
📄 setup.sh           # Local setup helper
📄 package.json       # Build scripts and dependencies
📝 README.md          # You are here!
```

> **Note:** `member/index.html` loads both the global `assets/styles.css` and a local `styles.css` file. Confirm both are necessary to avoid duplicate CSS.
> The file `js/main.js` is currently empty and can be removed unless future scripts are planned.

---

## 🎨 Design System

- **Fonts:** Uses CodyHouse system defaults (not the brand fonts from press kit)
- **Color Tokens:** See `docs/brand-style-guide.md` (exact HEX values for all branding)
- **Logos & Icons:** Follow `docs/assets-brand-README.md` for proper usage and naming logic

---

## 🤖 Codex AI Integration

This repo works hand-in-hand with OpenAI’s Codex to:

- Create SCSS components & layouts
- Maintain a prompt-driven development cycle
- Generate documentation and Markdown automatically

📄 Refer to:
- [`AGENTS.md`](./docs/AGENTS.md) — Active Codex personalities
- [`CODEX_PROMPTS.md`](./docs/CODEX_PROMPTS.md) — Modular prompt stack
- [`brand-style-guide.md`](./docs/brand-style-guide.md) — Visual identity references

---

## 🛠️ Setup Instructions

SCSS compilation is handled through npm scripts:

```bash
npm run build   # compile once
npm run watch   # watch for changes
```

---

## 🚀 Netlify Deployment

This site is **auto-deployed with Netlify** on each push to the `main` branch.  
Make sure your production build reflects correct folder structure and naming.

To manually deploy or preview builds locally:

```bash
npm install -g netlify-cli
netlify dev
```

Production domain and staging URLs are managed via the Netlify dashboard.

---

## 🗝️ Exclusive Content (Coming Soon)

A `/member` area will be added for gated content access using Codex + auth.

---

## 👀 Asset Naming & Image Guide

- Logos are named by **size** and **background intent**
  - `logo-web-for-dark-bg.png` = for use on dark backgrounds
  - `logo-web-for-light-bg.png` = for use on light backgrounds
  - `icon-32-facebook.svg` = 32x32 social icons
- Do not rename images from their current structure

See: [`assets-brand-README.md`](./docs/assets-brand-README.md)

---

## 💬 Brand Voice

Confident, bold, emotionally intelligent. No fluff. No manipulation. Just real, magnetic connection.
- Daren’s identity is defined in [`brand-style-guide.md`](./docs/brand-style-guide.md)
- Writing tone should reflect energy, psychology, and realness.

---

## 📜 Licensing

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/).

You are free to:

- 📤 **Share** — copy and redistribute the material in any medium or format  
- 🎨 **Adapt** — remix, transform, and build upon the material

Under the following terms:

- 🧠 **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.  
- 🚫 **NonCommercial** — You may not use the material for commercial purposes.

> No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

**© 2025 Daren M. Prince. All rights reserved.**

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc/4.0/)

---

## 🔐 Contact

This project is proprietary and custom-built for Daren Prince.

📧 Press inquiries: [press@darenprince.com](mailto:press@darenprince.com)  
🌐 Official Site: [darenprince.com](https://darenprince.com)

---
Built with 🔥 by Codex & Daren Prince.
