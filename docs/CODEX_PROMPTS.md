# 🧠 CODEX_PROMPTS.md Codex Prompt Library (Live Site Expansion)

This file defines modular, SCSS-based prompt logic for continuing development of the official Daren Prince Author Website. Every prompt must follow the global rules defined below.

---

## 🔁 GLOBAL CONFIG PROMPT

```
Always:
- Use dark mode by default
- Build with CodyHouse SCSS logic, mobile-first
- Maintain SCSS folder structure: components/, layout/, tokens/, etc.
- Use spacing system defined in MASTER_PLAN.md
- Brand colors must follow HEX palette, no approximations
- Every time a component is added or modified:
  • Add demo version to components.html
  • Update CODEX_PROMPTS.md with prompt used
  • Document logic inside /docs/ or /scss/ if needed
- Never use dashes, hyphens, or shorthand content
- No external libraries  everything must be native, modular, and reusable
```

---

## ✅ ALREADY IMPLEMENTED

[001] Button Module  
▶️ Use Case: Generate .btn, .btn--primary, hover states, Cody grid logic  
💡 Prompt Logic: "Build a modular button class using brand colors and Cody-style grid spacing."

[002] Hero Section  
▶️ Use Case: Responsive hero with heading, subtitle, CTA  
💡 Prompt Logic: "Create a homepage hero with brand tone, responsive alignment, and dark-mode layout."

[003] Book Preview  
▶️ Use Case: Showcase book cover with 3D perspective and CTA  
💡 Prompt Logic: "Build a reusable 3D book card with shadow, call to action, and dynamic sizing."

[004] Testimonials Grid  
▶️ Use Case: Scrollable or stacked reviews with name/photo  
💡 Prompt Logic: "Build a testimonial module with grid system, review body, and user details."

[005] Alerts & Modals  
▶️ Use Case: Success/error messages, modal overlay  
💡 Prompt Logic: "Design a full-width alert system with color-coded feedback and close button."

[006] Embedded File Viewer  
▶️ Use Case: PDF preview, press kit embed  
💡 Prompt Logic: "Embed a scrollable viewer using iframe + fallback styling, mobile-friendly."

---

## 🧱 HIGH PRIORITY PROMPTS

[007] Vertical Video Embed Block  
▶️ Use Case: Embed portrait-format trailer across pages  
💡 Prompt Logic: "Create a responsive SCSS embed block for vertical/portrait videos. Must support Vimeo or MP4 with fallback."

[008] Audio Player Embed  
▶️ Use Case: Drop-in block for MP3 or podcast  
💡 Prompt Logic: "Write a media block to embed audio files. Include player, title label, and SCSS customization."

[009] Multi-Media Wrapper Block  
▶️ Use Case: Wrap vertical video, audio, or YouTube into one system  
💡 Prompt Logic: "Build a media-agnostic component that switches layouts depending on content type."

[010] Sticky Navigation  
▶️ Use Case: Global header with logo, nav links, and mobile drawer  
💡 Prompt Logic: "Build a sticky nav that uses CodyHouse spacing and flex grid, mobile-first with aria roles."

[011] Global Footer  
▶️ Use Case: 34 column footer with nav, copyright, opt-in  
💡 Prompt Logic: "Build a dark-mode footer with 4 sections, full brand nav, and responsive layout."

---

## 🔒 MID PRIORITY (NEXT PHASE)

[012] Tabs System  
▶️ Use Case: Product page tabs for Summary / Sample / Behind-the-Scenes  
💡 Prompt Logic: "Create a tab UI with CodyHouse SCSS logic and keyboard accessibility."

[013] CTA Bar  
▶️ Use Case: Global or inline call to action banner  
💡 Prompt Logic: "Design a call-to-action strip with padding, text, button, and breakpoint logic."

[014] Member Login Prep  
▶️ Use Case: Gated content block scaffold  
💡 Prompt Logic: "Write a login form wrapper for future authentication flow. Should include input, password, remember me."

---

## 📂 FILE STRUCTURE + DOC HELPERS

[099] Docs Sync Reminder  
▶️ Use Case: Force prompt to update all supporting docs  
💡 Prompt Logic: "After this, remember to update README.md, CODEX_PROMPTS.md, MASTER_PLAN.md, and add live demo to components.html"

[015] Book Detail Tab System  
▶️ Use Case: Multi-tab layout for book preview, description, video trailer, and exclusive content  
💡 Prompt Logic: "Build a full tabbed interface using CodyHouse SCSS. Include buttons to toggle between Front Cover, Back Cover, and 3D view inside the preview tab. All tabs must share a persistent sticky area with buy button, dropdown, and short description. Description tab includes long-form copy and book metadata chart. Trailer tab has a portrait video block with controls. Members-only tab displays blurred preview and login CTA."
