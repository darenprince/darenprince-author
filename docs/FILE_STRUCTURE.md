
# 🗂 Project File Structure for Daren Prince Author Platform

This document details the exact folder and file structure used in the Codex-powered website project for Daren Prince. It includes descriptions, naming logic, and usage context to ensure consistency across all development and design efforts.

---

## 🔧 Root Directory

```
/ (Project Root)
├── index.html                 # Homepage (dark mode layout)
├── components.html           # UI kit reference for reusable site components
├── assets/                   # Images, icons, logos, compiled CSS
├── scss/                     # Source SCSS files
├── js/                       # JavaScript helpers
├── member/                   # Member area (in progress)
├── docs/                     # Project documentation
├── test/                     # Demo/testing pages
├── package.json              # Build scripts and dependencies
├── package-lock.json         # Exact package versions
├── setup.sh                  # Initialization script
├── .gitignore                # Files/folders to exclude from version control
├── LICENSE.md                # License information
├── README.md                 # Project overview and instructions
├── netlify.toml              # (Optional) Netlify deployment config file
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
│   └── _helpers.scss          # Helper classes and mixins
```

---

## 🧩 Component Library

```
/components/
├── _buttons.scss             # Default button styles
├── _forms.scss               # Input fields and form layout
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
├── css/                      # Compiled CSS output
├── icons/                    # Social icons
├── images/                   # Backgrounds and photography
├── logos/                    # Site logos and retailer badges
├── styles.css                # Main compiled stylesheet
├── styles.css.map            # Source map for the stylesheet
```

---

## 🔐 Member Area

```
/member/
├── index.html                # Placeholder for login/member dashboard
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
