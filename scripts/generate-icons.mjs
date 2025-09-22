#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import favicons from 'favicons';
import fs from 'fs-extra';
import { globby } from 'globby';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const MASTER_ICON = path.join(ROOT_DIR, 'assets', 'icons', 'icon-master.PNG');
const OUTPUT_DIR = path.join(ROOT_DIR, 'assets', 'icons', 'generated');
const SNIPPET_PATH = path.join(OUTPUT_DIR, 'icon-head.html');
const PUBLIC_PATH = '/assets/icons/generated';
const START_MARKER = '<!-- Apple PWA + Safari enhancements -->';
const END_MARKER = '<!-- End Apple PWA + Safari enhancements -->';

async function ensureMasterIcon() {
  const exists = await fs.pathExists(MASTER_ICON);
  if (!exists) {
    throw new Error(`Master icon not found at ${MASTER_ICON}`);
  }
}

function buildFaviconsConfig() {
  return {
    path: PUBLIC_PATH,
    appName: 'Daren Prince',
    appShortName: 'Daren Prince',
    appDescription: 'Official website for author Daren Prince.',
    developerName: 'Daren Prince',
    developerURL: 'https://darenprince.com',
    dir: 'auto',
    lang: 'en-US',
    background: 'transparent',
    theme_color: '#111217',
    display: 'standalone',
    orientation: 'any',
    start_url: '/',
    version: '1.0',
    logging: false,
    manifestPath: `${PUBLIC_PATH}/site.webmanifest`,
    pixel_art: false,
    loadManifestWithCredentials: false,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: false,
      windows: true,
      yandex: true,
    },
  };
}

function createBlock(htmlSnippet, indent) {
  const innerIndent = `${indent}  `;
  const snippetLines = htmlSnippet
    .trim()
    .split('\n')
    .map((line) => `${innerIndent}${line}`)
    .join('\n');
  const bannerReminder = `${innerIndent}<!-- Smart App banner is rendered by js/main.js -->`;
  return `${indent}${START_MARKER}\n${bannerReminder}\n${snippetLines}\n${indent}${END_MARKER}`;
}

async function writeAssets({ images, files, html }) {
  await fs.remove(OUTPUT_DIR);
  await fs.ensureDir(OUTPUT_DIR);

  await Promise.all(
    images.map(async (image) => {
      const target = path.join(OUTPUT_DIR, image.name);
      await fs.writeFile(target, image.contents);
    })
  );

  await Promise.all(
    files.map(async (file) => {
      const target = path.join(OUTPUT_DIR, file.name);
      await fs.writeFile(target, file.contents);
    })
  );

  const snippet = html.join('\n');
  await fs.writeFile(SNIPPET_PATH, `${snippet}\n`, 'utf8');
  return snippet;
}

async function updateHtmlDocuments(htmlSnippet) {
  const htmlFiles = await globby(['**/*.html'], {
    cwd: ROOT_DIR,
    ignore: ['node_modules/**', 'public/**', 'assets/icons/generated/**'],
  });

  await Promise.all(
    htmlFiles.map(async (relativePath) => {
      const fullPath = path.join(ROOT_DIR, relativePath);
      const contents = await fs.readFile(fullPath, 'utf8');
      const pattern = /([\t ]*)<!-- Apple PWA \+ Safari enhancements -->[\s\S]*?<!-- End Apple PWA \+ Safari enhancements -->/g;

      let changed = false;
      const updated = contents.replace(pattern, (match, indent) => {
        changed = true;
        return createBlock(htmlSnippet, indent ?? '');
      });

      if (changed) {
        await fs.writeFile(fullPath, `${updated}\n`, 'utf8');
      }
    })
  );
}

async function run() {
  await ensureMasterIcon();
  const config = buildFaviconsConfig();
  const result = await favicons(MASTER_ICON, config);
  const snippet = await writeAssets(result);
  await updateHtmlDocuments(snippet);
  console.log('[icons] Generated favicons and updated HTML documents.');
}

run().catch((error) => {
  console.error('[icons] Failed to generate icons:', error);
  process.exitCode = 1;
});
