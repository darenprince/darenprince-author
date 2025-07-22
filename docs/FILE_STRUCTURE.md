
# 🗂 Project File Structure for Daren Prince Author Platform

This document details the exact folder and file structure used in the Codex-powered website project for Daren Prince. It includes descriptions, naming logic, and usage context to ensure consistency across all development and design efforts.

---

## 🔧 Root Directory

```
/ (Project Root)
├── index.html                 # Homepage (dark mode layout)
├── components.html            # Demo page listing every UI component
├── assets/                    # Images, logos and compiled CSS
├── scss/                      # Source SCSS files
├── js/                        # JavaScript helpers
├── member/                    # Member area (in progress)
├── docs/                      # Project documentation
├── test/                      # Demo layouts and checks
├── package.json               # Build scripts and dependencies
├── package-lock.json          # Version-locked dependencies
├── setup.sh                   # Initialization script
├── .gitignore                 # Files/folders to exclude from version control
├── netlify.toml               # Optional Netlify deployment config
├── README.md                  # Project overview and instructions
├── LICENSE.md                 # Licensing info
```

---

## 🧱 SCSS Directory Structure

```
/scss/
├── styles.scss                # Main entry point importing all modules
├── base/                      # Resets, globals, typography, variables
├── layout/                    # Header, footer and grid helpers
├── components/                # Buttons, forms and reusable pieces
├── themes/                    # Light/dark theme partials
├── tokens/                    # Brand color definitions
├── utilities/                 # Helper classes and mixins
```

---

## 🧩 Component Library

```
/components/
├── _buttons.scss             # Default button styles
├── _forms.scss               # Input fields and form layout
├── _cards.scss               # Card layouts
├── _modals.scss              # Modal windows
├── _alerts.scss              # Alert messages
├── _toggles.scss             # Toggle switches
├── _hero.scss                # Hero banner section
├── _testimonials.scss        # Testimonial grid
├── _downloads.scss           # Download cards
├── _viewer.scss              # Embedded document viewer
```

---

## 📝 Documentation

```
/docs/
├── README.md                 # Repo root readme
├── brand-style-guide.md      # HEX color tokens, voice/tone, branding rules
├── assets-brand-README.md    # Logo/icon usage, naming rules
├── AGENTS.md                 # Codex agent behavior and tone setup
├── CODEX_PROMPTS.md          # Prompt library and modular instruction stacks
```

---

## 🖼 Brand Assets

```
/assets/
├── brand/                    # Press kit and official PDFs
├── images/                   # Backgrounds and thumbnails
├── icons/                    # Social icon set (32x32)
├── logos/                    # Logo variations
├── styles.css                # Main compiled stylesheet
├── styles.css.map            # Source map for the stylesheet
```

---

## 🔐 Member Area

```
/member/
├── index.html                # Member login/dashboard
├── styles.scss               # Source styles for the area
├── styles.css                # Compiled stylesheet
├── styles.css.map            # Source map for the compiled CSS
```

---

## 📦 JavaScript (Optional)

```
/js/
├── main.js                  # Global site logic
├── mobile-nav.js            # Navigation toggle script
```

---

## 🧪 Testing + Deployment

```
/test/
├── test.html                 # Basic layout test page
```

---

## 🛠 Misc

- **Colors:** Only use HEX values defined in `brand-style-guide.md`
- **Dark Mode:** Always active by default — light mode not required.
- **Fonts:** CodyHouse system defaults, no custom brand fonts (yet)
- **Filenames:** Follow all conventions from `assets-brand-README.md`

---

This file should be used as a universal reference for:
- ✅ Codex building blocks
- ✅ Brand compliance
- ✅ Asset usage & dev consistency

## 🏗 Build Commands

Run the Sass build scripts via npm:

```bash
npm run build   # compile SCSS once
npm run watch   # watch for changes and recompile
```
