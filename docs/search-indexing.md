# 🔍 Search Indexing

Search engines should only see what we invite them to. Our dark-mode baseline and SCSS-powered layout don't affect crawlers, but they set the tone for a disciplined indexing strategy.

---

## `robots.txt`

[`public/robots.txt`](../public/robots.txt) tells crawlers what to ignore. Keep it lean and intentional.

```txt
User-agent: *
Disallow: /admin/
```

Use `Disallow` to block private paths and `Allow` for exceptions. Update this file whenever new sections launch.

---

## `sitemap.xml`

[`public/sitemap.xml`](../public/sitemap.xml) lists every page we want indexed. Search engines rely on this map to crawl efficiently.

```xml
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://darenprince.com/</loc></url>
</urlset>
```

Add a `<url>` block for each new public page. Remove entries or add `<lastmod>` tags as needed to keep the map current.

---

## Meta Robots Tag

Mark individual pages directly when you need custom rules:

```html
<meta name="robots" content="noindex, nofollow" />
```

Place this inside the `<head>` of any HTML file to stop indexing or link following. SCSS styling remains untouched.

---

## Updating Search Index Exclusions

The search index builder lives in [`src/search/build-index.mjs`](../src/search/build-index.mjs). To exclude pages from our on-site search, expand the `ignore` array:

```javascript
const htmlFiles = globSync('**/*.html', {
  cwd: pagesDir,
  absolute: true,
  ignore: ['search.html', 'draft.html']
});
```

Run `npm run build:search` after updates to regenerate the index.

---

## Managing the Sitemap

**Add a page**
1. Create the HTML file and style it with our SCSS tokens.
2. Append its path to [`public/sitemap.xml`](../public/sitemap.xml).
3. Commit both files.

**Exclude a page**
1. Remove or comment out its `<url>` block in the sitemap.
2. Add a `Disallow` rule in [`public/robots.txt`](../public/robots.txt) or a `<meta name="robots" content="noindex">` tag.
3. Update the `ignore` array in [`build-index.mjs`](../src/search/build-index.mjs) if the page should vanish from internal search.

Stay bold. Index only what builds the brand and keep everything else in the shadows.
