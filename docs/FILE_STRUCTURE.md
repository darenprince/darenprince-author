
# 🗂 Project File Structure for Daren Prince Author Platform

This document details the exact folder and file structure used in the Codex-powered website project for Daren Prince. It includes descriptions, naming logic, and usage context to ensure consistency across all development and design efforts.

---

## 🔧 Root Directory

```
/ (Project Root)
├── index.html                 # Homepage (dark mode layout)
├── components.html            # UI kit reference for reusable components
├── assets/                    # Compiled CSS and images
├── scss/                      # Source SCSS files
├── js/                        # JavaScript helpers
├── member/                    # Member area (in progress)
├── docs/                      # Documentation
├── test/                      # Demo layouts and checks
├── package.json               # Build scripts and dependencies
├── package-lock.json          # Version-locked dependencies
├── setup.sh                   # Initialization script
├── .gitignore                 # Files/folders to exclude from version control
├── netlify.toml               # (Optional) Netlify deployment config file
├── README.md                  # Project overview and instructions
├── LICENSE.md                 # Licensing info
```

---

## 🧱 SCSS Directory Structure

```
/scss/
├── styles.scss                # Main entry point importing all modules
├── base/
│   ├── _variables.scss        # Global variables
│   ├── _mixins.scss           # Reusable mixins
│   ├── _reset.scss            # Reset/CSS normalization
│   ├── _globals.scss          # Element defaults
│   └── _typography.scss       # Headings and type styles
├── layout/
│   ├── _grid.scss             # Grid system
│   ├── _header.scss           # Site header layout
│   └── _footer.scss           # Footer layout
├── components/
│   ├── _buttons.scss          # Button styles
│   └── _forms.scss            # Form elements
├── themes/
│   ├── _dark.scss             # Dark theme variables
│   └── _light.scss            # Light theme variables
├── tokens/
│   └── _colors.scss           # Brand color tokens
├── utilities/
│   └── _helpers.scss          # Helper classes
```

---

## 🧩 Component Library

```
/components/
├── _buttons.scss             # Default buttons, ghost buttons, icon buttons
├── _nav.scss                 # Header nav styles (mobile & desktop)
├── _footer.scss              # Footer styling and layout
├── _cards.scss               # Card blocks for UI
├── _modals.scss              # Modal layout and transitions
├── _forms.scss               # Input fields, selects, radio, toggles, validation
├── _badges.scss              # Category tags, labels
├── _alerts.scss              # Notification UI styles
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
├── css/                      # Compiled styles output
├── brand/                    # Press kit and marketing PDFs
├── images/                   # Backgrounds and thumbnails
├── icons/                    # Social icon set (32x32)
├── logos/                    # Logo variations
```

---

## 🔐 Members + Downloads

```
/downloads/
├── book-preview-gameon.pdf   # Sample preview (Game On)
├── audio-teasers/            # Audio samples for books
├── exclusive/                # Gated content (available after login)
```

```
/member/
├── index.html                # Placeholder for login/member dashboard
├── styles.scss               # Member-only theme
```

---

## 📦 JavaScript (Optional)

```
/js/
├── mobile-nav.js             # Navigation toggle script
├── modal.js                  # Modal open/close logic
├── form-validation.js        # Form input and error handler
```

---

## 🧪 Testing + Deployment

```
/test/
├── layout-debug.html         # Tests for grid/wrapping behavior
├── accessibility.html        # Contrast, alt text, focus states
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

