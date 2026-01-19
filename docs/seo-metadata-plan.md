## SEO Metadata Plan for Daren Prince Author Site

This file contains SEO-optimized metadata, structured data, Open Graph tags, and H1 recommendations for all pages listed in the site navigation.

All pages will use this OG image: assets/images/og-image.jpg

Structured data follows the schema.org specifications.

## Deployment notes (GitHub Pages)

- Run `npm run postprocess:seo` with `DOMAIN` set before committing so canonical URLs, Open Graph data, JSON-LD, sitemap, and robots.txt stay aligned with production metadata.
- GitHub Pages ships committed HTML and metadata, so treat SEO output as a build artifact.
- Keep the homepage `<h1>` in the markup even if the hero uses shimmering or cinematic styling, so search engines always have a primary headline.

## Global metadata requirements

- Always include `<link rel="canonical" href="https://darenprince.com/...">`.
- Add `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">` on indexable pages.
- Set `<meta name="author" content="Daren Prince">` on every page.
- Add `<meta property="og:site_name" content="darenprince.com">`.
- Use JSON-LD that matches the page intent:
  - Homepage: `Organization`, `Person`, and `WebSite` schema.
  - Blog/article pages: `BlogPosting` plus `BreadcrumbList`.
  - Marketing/utility pages: `WebPage` plus `BreadcrumbList`.

---

==============================
PAGE: Homepage (index.html)
==============================

<title>Daren Prince | Author of Game On! & Unshakeable | Confidence, Healing & Real Connection</title>

<meta name="description" content="Official site of Daren Prince, author and communication coach. Explore real tools for confidence, relationships, and emotional healing through his bestselling books.">
<h1>Daren Prince | Author. Strategist. Storyteller.</h1>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Daren Prince | Author of Game On! & Unshakeable">
<meta property="og:description" content="Official author site of Daren Prince. Explore books on connection, healing, and confidence.">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://darenprince.com/">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Daren Prince | Author of Game On! & Unshakeable">
<meta name="twitter:description" content="Explore Daren Prince’s bestselling books and breakthrough tools for confidence and connection.">
<meta name="twitter:image" content="assets/images/og-image.jpg">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Daren Prince",
  "url": "https://darenprince.com",
  "image": "https://darenprince.com/assets/images/og-image.jpg",
  "sameAs": [
    "https://www.amazon.com/author/darenprince",
    "https://www.goodreads.com/author/show/53671567.Daren_Prince"
  ],
  "jobTitle": "Author, Communication Strategist",
  "description": "Daren Prince is the author of Game On! and Unshakeable, offering emotionally intelligent guidance for dating, healing, and self-confidence."
}
</script>

Notes:

- Replace absolute URLs with actual domain in production.
- Ensure image at assets/images/og-image.jpg is optimized to 1200x630 for best OG rendering.

==============================
PAGE: Game On! Book Landing Page (/books/game-on)
==============================

<title>Game On! Master the Conversation & Win Her Heart | Book by Daren Prince</title>

<meta name="description" content="No gimmicks. No games. Just results. Game On! is the bold, psychology-backed guide to flirting, confidence, and connection. Available in print, Kindle, & audiobook.">
<h1>Game On! Master the Conversation & Win Her Heart</h1>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Game On! by Daren Prince">
<meta property="og:description" content="Discover the psychology-backed men's playbook for real attraction and conversation mastery.">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:type" content="book">
<meta property="og:url" content="https://darenprince.com/books/game-on">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Game On! by Daren Prince">
<meta name="twitter:description" content="Learn how to spark real connection, master confidence, and win her heart with no gimmicks.">
<meta name="twitter:image" content="assets/images/og-image.jpg">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Game On! Master the Conversation & Win Her Heart",
  "author": {
    "@type": "Person",
    "name": "Daren Prince"
  },
  "image": "https://darenprince.com/assets/images/og-image.jpg",
  "bookFormat": "https://schema.org/EBook",
  "isbn": "9798303844407",
  "offers": {
    "@type": "Offer",
    "price": "5.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://www.amazon.com/Game-Master-Conversation-Heart-Relationships-ebook/dp/B0DQHLK4G2"
  },
  "description": "Game On! is the ultimate men’s playbook for mastering authentic flirting, emotional connection, and confident dating. Real strategies, no games."
}
</script>

Notes:

- Be sure the Amazon product URL matches the live Kindle ASIN page.
- OG image must be pre-cropped to 1200x630px minimum for rich previews.
- Consider duplicating this block per book format (hardcover, audiobook) for A/B testing or micro-landing.

==============================
PAGE: Unshakeable Book Landing Page (/books/unshakeable)
==============================

<title>Unshakeable: Break Free From Narcissistic Manipulation | Book by Daren Prince</title>

<meta name="description" content="Break the cycle of emotional abuse. Unshakeable shows you how to spot red flags, detach from narcissists, and rebuild confidence with real tools.">
<h1>Unshakeable: Break Free From Narcissistic Manipulation</h1>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Unshakeable by Daren Prince">
<meta property="og:description" content="The bold guide to overcoming toxic relationships and reclaiming your strength. Coming soon.">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:type" content="book">
<meta property="og:url" content="https://darenprince.com/books/unshakeable">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Unshakeable by Daren Prince">
<meta name="twitter:description" content="A powerful, real-world roadmap to healing from narcissistic abuse and emotional manipulation.">
<meta name="twitter:image" content="assets/images/og-image.jpg">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Unshakeable: Break Free From Narcissistic Manipulation",
  "author": {
    "@type": "Person",
    "name": "Daren Prince"
  },
  "image": "https://darenprince.com/assets/images/og-image.jpg",
  "bookFormat": "https://schema.org/EBook",
  "isbn": "TBD",
  "offers": {
    "@type": "Offer",
    "price": "TBD",
    "priceCurrency": "USD",
    "availability": "https://schema.org/PreOrder",
    "url": "https://darenprince.com/books/unshakeable"
  },
  "description": "Unshakeable is a powerful guide to identifying narcissistic abuse, breaking free from toxic relationships, and rebuilding emotional strength and clarity."
}
</script>

Notes:

- Replace ISBN and price once finalized.
- Ensure canonical URL and OG image are fully functional prior to launch.
- Add preorder or email waitlist CTA above the fold.

==============================
PAGE: Meet Daren Prince (/about)
==============================

<title>Meet Daren Prince | Author, Strategist & Dating Coach</title>

<meta name="description" content="Get to know Daren Prince—author of Game On! and Unshakeable. From heartbreak to healing, discover his story, values, and mission to help others grow.">
<h1>Daren Prince: Built by Fire. Driven by Purpose.</h1>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Meet Daren Prince">
<meta property="og:description" content="Author. Strategist. Real talker. Learn how Daren turned pain into purpose—and how he helps others master confidence and connection.">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://darenprince.com/about">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Meet Daren Prince">
<meta name="twitter:description" content="Discover the story behind the author of Game On! and Unshakeable. Learn how Daren Prince turned struggle into strength.">
<meta name="twitter:image" content="assets/images/og-image.jpg">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Daren Prince",
  "url": "https://darenprince.com/about",
  "image": "https://darenprince.com/assets/images/og-image.jpg",
  "jobTitle": "Author, Communication Strategist",
  "sameAs": [
    "https://www.amazon.com/author/darenprince",
    "https://www.goodreads.com/author/show/53671567.Daren_Prince"
  ],
  "description": "Daren Prince is the author of Game On! and Unshakeable, known for his emotionally intelligent approach to dating, healing, and personal growth."
}
</script>

Notes:

- Use `profile` OG type for author identity pages.
- Consider embedding a personal quote or video message in hero section.

==============================
PAGE: Press & Media (/media)
==============================

<title>Press & Media | Daren Prince – Interviews, Headshots & Contact</title>

<meta name="description" content="Official press kit for Daren Prince. Download high-res headshots, author bio, and request interviews or media appearances.">
<h1>Press Kit & Media Features</h1>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Press & Media | Daren Prince">
<meta property="og:description" content="Get press materials, headshots, and media inquiries for Daren Prince—author of Game On! and Unshakeable.">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://darenprince.com/media">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Daren Prince | Press Kit & Media Info">
<meta name="twitter:description" content="Download official press kit, author bio, and media assets for Daren Prince. Book him for podcasts, interviews, or speaking events.">
<meta name="twitter:image" content="assets/images/og-image.jpg">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Daren Prince",
  "url": "https://darenprince.com",
  "image": "https://darenprince.com/assets/images/og-image.jpg",
  "sameAs": [
    "https://www.amazon.com/author/darenprince",
    "https://www.goodreads.com/author/show/53671567.Daren_Prince"
  ],
  "jobTitle": "Author, Communication Strategist",
  "description": "Explore the official press and media resources for Daren Prince, including interviews, downloadable press kit, headshots, and contact information.",
  "knowsAbout": ["Book Marketing", "Dating Psychology", "Narcissistic Abuse Recovery"]
}
</script>

Notes:

- Include downloadable PDF press kit, image previews, and media contact email.
- Add `<link rel="canonical" href="https://darenprince.com/media">` to head for SEO.

==============================
PAGE: Swag (/swag)
==============================

<title>Game On! Swag | Wear Confidence. Spark Conversation.</title>

<meta name="description" content="Shop bold Game On! gear designed to elevate your vibe and rep your mindset. Clean designs. Real messages. Confidence on your chest.">
<h1>Wear the Mindset. Live the Message.</h1>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Game On! Swag">
<meta property="og:description" content="Shop high-vibe apparel inspired by Daren Prince's bestselling book Game On! Shirts, hoodies, and more.">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://darenprince.com/swag">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Game On! Swag by Daren Prince">
<meta name="twitter:description" content="Confidence, real talk, and style. Grab Game On! gear that says what you stand for.">
<meta name="twitter:image" content="assets/images/og-image.jpg">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Game On! Swag",
  "image": "https://darenprince.com/assets/images/og-image.jpg",
  "url": "https://darenprince.com/swag",
  "description": "Shop bold, conversation-sparking apparel based on the bestselling book Game On! by Daren Prince. Confidence never goes out of style.",
  "brand": {
    "@type": "Brand",
    "name": "Daren Prince"
  }
}
</script>

Notes:

- Integrate Printful, Shopify, or Teespring platform for actual product management.
- Ensure product images have proper alt text and JSON-LD schema if dynamically loaded.

==============================
PAGE: Blog (/blog)
==============================

<title>The Game On! Blog | Confidence, Connection & Real Talk with Daren Prince</title>

<meta name="description" content="No-fluff insights on confidence, dating, emotional mastery, and personal growth. From the mind of Daren Prince. Bold truth, zero gimmicks.">
<h1>Real Talk for the Modern Man</h1>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="The Game On! Blog by Daren Prince">
<meta property="og:description" content="Unfiltered takes on dating, connection, and confidence. Read the latest insights from Daren Prince.">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://darenprince.com/blog">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="The Game On! Blog">
<meta name="twitter:description" content="New articles weekly on real connection, emotional resilience, and dating without bullshit.">
<meta name="twitter:image" content="assets/images/og-image.jpg">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "The Game On! Blog",
  "url": "https://darenprince.com/blog",
  "description": "The official blog of Daren Prince—featuring bold, emotionally intelligent articles about confidence, relationships, codependency recovery, and dating psychology.",
  "publisher": {
    "@type": "Person",
    "name": "Daren Prince"
  }
}
</script>

Notes:

- Apply BlogPosting schema to individual posts under `/blog/[slug]`.
- Include `author`, `headline`, `datePublished`, and `image` fields on post pages.
- Support category/tags for SEO-rich structure: Confidence, Dating, Breakups, Narcissism, etc.

==============================
PAGE: Collaborations (/collabs)
==============================

<title>Collaborate with Daren Prince | Partnerships, Affiliates & Guest Projects</title>

<meta name="description" content="Want to work with Daren Prince? Explore partnerships, affiliate opportunities, guest content, and creator collaborations. Let’s build something bold.">
<h1>Let’s Collaborate</h1>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Collaborate with Daren Prince">
<meta property="og:description" content="From affiliate partnerships to guest appearances, Daren Prince is open to bold, aligned collaborations. Reach out today.">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://darenprince.com/collabs">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Partner with Daren Prince">
<meta name="twitter:description" content="Explore affiliate and content partnerships with Daren Prince—bestselling author, strategist, and coach.">
<meta name="twitter:image" content="assets/images/og-image.jpg">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Collaborate with Daren Prince",
  "url": "https://darenprince.com/collabs",
  "description": "Explore collaborations, affiliate opportunities, and strategic partnerships with Daren Prince.",
  "creator": {
    "@type": "Person",
    "name": "Daren Prince"
  }
}
</script>

Notes:

- Consider embedding an affiliate form or Calendly scheduler.
- Make use of CTAs like “Pitch a Collab” or “Become an Affiliate” with tracking links.

==============================
PAGE: Contact (/contact)
==============================

<title>Contact Daren Prince | Media, Coaching & Speaking Inquiries</title>

<meta name="description" content="Want to connect with Daren Prince? Submit interview requests, speaking inquiries, or direct messages here. Let’s talk about it.">
<h1>Let’s Talk About It</h1>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Contact Daren Prince">
<meta property="og:description" content="Reach out to Daren Prince for media, coaching, or collab opportunities. He reads every message.">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://darenprince.com/contact">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Contact Daren Prince">
<meta name="twitter:description" content="Have a question, request, or idea? Send a message directly to Daren Prince.">
<meta name="twitter:image" content="assets/images/og-image.jpg">

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Daren Prince",
  "url": "https://darenprince.com/contact",
  "mainEntity": {
    "@type": "Person",
    "name": "Daren Prince",
    "url": "https://darenprince.com"
  },
  "description": "Use this page to contact author Daren Prince for media, podcast, coaching, or collaboration opportunities. Expect a personal reply if it’s real."
}
</script>

Notes:

- Make sure your contact form includes name, email, and message fields.
- Validate entries and ensure mobile responsiveness for best experience.
- Avoid CAPTCHA if possible—keep UX friction low.

==============================
SCHEMA TEMPLATE: BlogPosting (for blog/:slug pages)
==============================

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://darenprince.com/blog/sample-post-slug"
  },
  "headline": "Blog Post Title Goes Here",
  "description": "Short summary of the post (around 150–200 characters).",
  "image": "https://darenprince.com/assets/images/og-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Daren Prince",
    "url": "https://darenprince.com/about"
  },
  "publisher": {
    "@type": "Person",
    "name": "Daren Prince",
    "logo": {
      "@type": "ImageObject",
      "url": "https://darenprince.com/assets/images/og-image.jpg"
    }
  },
  "datePublished": "2025-07-31",
  "dateModified": "2025-07-31"
}
</script>

Instructions:

- Replace `headline`, `description`, and `image` as needed per blog post
- Ensure `datePublished` and `dateModified` reflect ISO 8601 format (YYYY-MM-DD)
- Replace URL in `mainEntityOfPage` with the actual post URL
- Embed inside `<head>` or just before closing </body>
