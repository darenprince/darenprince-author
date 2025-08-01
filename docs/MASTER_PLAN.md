
==================================================
        AUTHOR WEBSITE MASTER STRATEGY
 Comprehensive Design, Coding, Copy & Deployment
==================================================

📌 PROJECT SCOPE:
This is the official digital home for author Daren Prince. It will:

- Serve as a platform to showcase multiple books
- Build the author's reputation and credibility
- Convert visitors into readers, followers, and clients
- Support future offerings (courses, member portal, affiliate sales)
- Reflect Daren's Game On! brand identity with precision and consistency

==================================================
PHASE 1: FOUNDATIONAL DESIGN STRATEGY
==================================================

1. ✅ Brand Alignment
   - Use default CodyHouse fonts for all UI.
   - Brand fonts (League Spartan, Futura, Knockout Welterweight, Helvetica Now) reserved for graphics or print assets
   - Apply HEX-coded color palette consistently: Charcoal, Deep Greens, Mint Green, White, etc.
   - Maintain bold, real, emotionally intelligent tone in layout and microcopy
   - Avoid all hyphens, dashes, or truncated content
   - Deliver a modern, masculine, clean UI that reflects confidence and depth

2. ✅ UX Structure & Layout Logic
   - Consistency across ALL sections is critical
   - Define a spacing system using REM units (not pixels)
     • E.g., margin-top: 2rem, padding: 1.5rem, gap: 1rem
   - Use a container system (max-width adaptive) to keep content readable on all devices
   - Visual hierarchy:
     • Use H1-H3 tags with consistent sizes and spacing
     • Ensure white space is generous and balanced
     • No crowding or inconsistent alignment
   - Use modular SCSS naming patterns with clear structure:
     • .btn, .hero-section, .book-card, .testimonial, etc.

3. ✅ Page-Level Sitemap
   - Home
   - Explore Books (showcase multiple titles)
   - Book Detail Pages (optional per title)
   - About Daren
   - Press & Media
   - Blog
   - Contact
   - Member Portal (future)
   - Funnels (sales pages, opt-ins)

==================================================
PHASE 2: PAGE COPY & CONTENT STRATEGY
==================================================

1. Home
   - Hero Section: Core message, bold tagline, CTA
   - Book Section: Featured title(s) with link to Explore Books
   - Testimonials: Scrollable or grid
   - Video: Book trailer or interview embedded
   - Email Opt-In: CTA-driven form
   - Footer: Full nav, signup, copyright

2. Explore Books
   - Grid layout for all books
   - Each book:
     • Cover Image
     • Subtitle and tagline
     • Buy links (Amazon, Apple, Google, etc.)
     • CTA (Read Preview, Buy Now)

3. About Daren
   - Pull from long-form bio in press kit
   - Feature quote and 1-2 portraits
   - Include personal connection points (e.g., iced coffee, son DJ, true crime)

4. Press & Media
   - Downloads (press kit, sample chapter, media sheet)
   - Logos, headshots, interviews
   - Podcast/audio embeds or video reel
   - Link to booking/press inquiry

5. Blog
   - Summary grid with clean card layout
   - Post title, excerpt, date
   - Tag-based sorting
   - CTA inside or below posts

6. Contact
   - Simple clean form with fields: name, email, message
   - No CAPTCHA
   - Display direct email: press@darenprince.com
   - Link social icons (brand matched)

7. Footer
   - 3-4 column layout
   - Sections: Quick Links, Newsletter Signup, Connect, Copyright
   - Use same spacing rhythm (padding, grid, typography)

==================================================
PHASE 3: SCSS, SPACING & STRUCTURE STRATEGY
==================================================

📁 SCSS FOLDER STRUCTURE:
/scss/
  ├── main.scss
  ├── base/          (resets, typography, variables)
  ├── components/    (buttons, hero, book-card, etc.)
  ├── layout/        (grid, container, spacing)
  ├── utilities/     (helper classes, visibility)

✅ SPACING SYSTEM (Mobile-First, REM Units)
- Use a consistent spacing scale:
  0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 5rem
- Margin/Padding/Gap rules apply sitewide
- Use layout utility classes: .margin-top-md, .gap-lg, etc.

✅ RESPONSIVE SYSTEM
- Mobile-first media queries
- Layout breakpoints at: 480px, 768px, 1024px, 1440px

-✅ TYPOGRAPHY
- Headings: Use default CodyHouse font stack (e.g., H1 = 3.2rem)
- Body: sans-serif (Helvetica Now or system font)
- Line height, letter spacing defined for legibility

==================================================
PHASE 4: COMPONENT LIBRARY PLAN
==================================================

Each reusable component should:
- Be defined in /components
- Use modular SCSS
- Accept class modifiers where needed (e.g., .btn--primary, .card--highlight)

Component List:
- ✅ Sticky Navigation
- ✅ Hero Section
- ✅ Book Grid + Book Cards
- ✅ Testimonial Grid + Cards
- ✅ PDF Viewer
- ✅ Email Signup Field
- ✅ CTA Bar
- ✅ Footer
- ✅ Blog Summary Tile
- ✅ Mobile Drawer Nav

==================================================
PHASE 5: DEPLOYMENT, PERFORMANCE & SEO
==================================================

🚀 Netlify Hosting:
- Connect GitHub repo for automatic CI/CD
- Set up custom domain (via Netlify dashboard)
- Configure `netlify.toml` with redirect and 404 rules

📈 Performance:
- Compress all assets
- Lazy load images and embeds
- Use SVGs and webp where possible
- Bundle JS and minify CSS

🔎 SEO:
- Write custom meta tags for each page
- Use Open Graph tags and Twitter cards
- Add site title and descriptions
- Accessible: ARIA labels, keyboard nav, skip to content

==================================================
PHASE 6: FUTURE GROWTH & MONETIZATION
==================================================

- Integrate Stripe or Gumroad (courses, books, services)
- Connect ConvertKit/Mailchimp for list building
- Add MemberSpace or Outseta for protected content
- Enable podcast or YouTube embed support
- Add CMS later (Netlify CMS, Sanity) if needed

==================================================
COMMITMENT TO CONSISTENCY & QUALITY
==================================================

Every layout, button, heading, and image must:
- Follow exact spacing and style rules
- Be coded cleanly using SCSS modules
- Be documented in MASTER_PLAN.txt
- Have its logic explained in CODEX_PROMPTS.txt

NEVER truncate. NEVER approximate. NEVER violate branding.

==================================================
