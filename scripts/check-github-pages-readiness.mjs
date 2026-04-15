#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { globby } from 'globby';
import { load } from 'cheerio';

const repoRoot = process.cwd();

const DEPLOYMENT_PAGE_GLOBS = [
  'index.html',
  'home.html',
  'book.html',
  'meet-daren-prince.html',
  'press.html',
  'contact.html',
  'labs.html',
  'leanin.html',
  'ots.html',
  'haley.html',
  'updated-hero.html',
  'nexuswho.html',
  'promotion-tools.html',
  'sitemap.html',
  '404.html',
  'labs/products/*.html',
];

const STRICT_METADATA_PAGES = new Set([
  'index.html',
  'book.html',
  'contact.html',
  'meet-daren-prince.html',
  'press.html',
  'labs.html',
  'haley.html',
]);

const BRAND_THEME_COLORS = new Set([
  '#456f3a',
  '#6da667',
  '#87bd72',
  '#8cd679',
  '#3b3c3b',
  '#212121',
  '#161616',
  '#070a06',
]);

const messages = [];
const log = (level, file, message) => messages.push({ level, file, message });

const mapSiteUrlToPath = (value) => {
  if (!value) return null;
  if (value.startsWith('/')) return value;
  try {
    const parsed = new URL(value);
    if (parsed.hostname === 'www.darenprince.com' || parsed.hostname === 'darenprince.com') {
      return parsed.pathname;
    }
  } catch {
    return null;
  }
  return null;
};

const fileExists = async (projectPath) => {
  try {
    await fs.access(path.join(repoRoot, projectPath));
    return true;
  } catch {
    return false;
  }
};

const htmlFiles = await globby(DEPLOYMENT_PAGE_GLOBS, {
  cwd: repoRoot,
  onlyFiles: true,
  expandDirectories: false,
});

for (const relativeFile of htmlFiles.sort()) {
  const source = await fs.readFile(path.join(repoRoot, relativeFile), 'utf8');

  if (/netlify/i.test(source)) {
    log('error', relativeFile, 'Contains Netlify references. GitHub Pages is the only supported host.');
  }

  const $ = load(source);
  const head = $('head');
  if (!head.length) {
    log('error', relativeFile, 'Missing <head> element.');
    continue;
  }

  const iconLinks = head.find('link[rel~="icon"]');
  const themeColor = head.find('meta[name="theme-color"]').attr('content')?.trim().toLowerCase();
  const ogImage = head.find('meta[property="og:image"]').attr('content')?.trim();
  const twitterImage = head.find('meta[name="twitter:image"]').attr('content')?.trim();

  if (STRICT_METADATA_PAGES.has(relativeFile)) {
    if (!iconLinks.length) log('error', relativeFile, 'Missing favicon <link rel="icon"> metadata.');
    if (!ogImage) log('error', relativeFile, 'Missing Open Graph image (og:image).');
    if (!twitterImage) log('error', relativeFile, 'Missing Twitter social image (twitter:image).');
    if (!themeColor) log('warning', relativeFile, 'Missing browser chrome <meta name="theme-color">.');
  }

  if (themeColor && !BRAND_THEME_COLORS.has(themeColor)) {
    log('warning', relativeFile, `Theme color "${themeColor}" is outside the core brand palette.`);
  }

  for (const [label, value] of [
    ['og:image', ogImage],
    ['twitter:image', twitterImage],
  ]) {
    const projectPath = mapSiteUrlToPath(value);
    if (!projectPath) continue;
    const cleanPath = projectPath.replace(/^\//, '');
    const exists = await fileExists(cleanPath);
    if (!exists) {
      log('error', relativeFile, `${label} points to missing asset path "${projectPath}".`);
    }
  }

  for (const link of iconLinks.toArray()) {
    const href = $(link).attr('href')?.trim();
    const projectPath = mapSiteUrlToPath(href);
    if (!projectPath) continue;
    if (projectPath.startsWith('/assets/icons/generated/')) {
      continue; // generated during build
    }
    const cleanPath = projectPath.replace(/^\//, '');
    const exists = await fileExists(cleanPath);
    if (!exists) {
      log('error', relativeFile, `Icon reference points to missing asset path "${projectPath}".`);
    }
  }
}

const errors = messages.filter((item) => item.level === 'error');
const warnings = messages.filter((item) => item.level === 'warning');
for (const item of messages) {
  const prefix = item.level === 'error' ? 'ERROR' : 'WARN';
  console.log(`[${prefix}] ${item.file}: ${item.message}`);
}
console.log(`\nGitHub Pages readiness summary: ${errors.length} error(s), ${warnings.length} warning(s), ${htmlFiles.length} page(s) checked.`);
if (errors.length) process.exit(1);
