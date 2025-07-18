
# 🧠 CODEX_PROMPTS.md — Codex Prompt Library

This file contains modular, reusable Codex prompts for building and maintaining the Daren Prince author website.

---

## 🟢 Global Config Prompt

```plaintext
Use dark mode as the default theme. SCSS should follow the CodyHouse design system.
Use the following color palette (HEX format only), and reference filenames EXACTLY as defined in assets-brand-README.md.
```

---

## 📄 Page Builds

```plaintext
Generate a full HTML + SCSS page called components.html. Include previews of buttons, forms, navbars, alerts, cards, and toggles. Use dark mode and mobile-first responsive layout. Do not use external libraries.
```

```plaintext
Build a dedicated product page layout for a book. Include:
- Hero section with logo and cover image
- Author bio block
- Purchase links module (Amazon, Apple, etc.)
- Ratings + review grid
- Tabs for “Summary,” “Sample Chapter,” and “Behind the Scenes”
```

---

## 🧱 Components

```plaintext
Create a button group in SCSS using Codyhouse grid logic. Variants: primary, accent, success, error. Must support hover and disabled state. Match HEX colors from brand-style-guide.md.
```

```plaintext
Design a responsive form module with custom inputs, text areas, and validation. Use only SCSS, avoid JavaScript unless needed.
```

---

## 🗂️ File & Structure Helpers

```plaintext
Create/organize folders for: /components, /forms, /utils, /layout, /tokens, /docs. Build a structure to scale.
```

```plaintext
Write a new SCSS reset file that includes Cody-style normalize, modern box-sizing, and theme-aware variables.
```

---

## 📜 Markdown & Docs

```plaintext
Write an onboarding.md file explaining how to use this repo and modify components. Keep tone casual but clear. Target audience: beginner coder.
```
