const INDEXABLE_PAGES = [
  {
    label: 'Home',
    reason: 'Primary marketing hub and top-level brand destination.',
    paths: ['/', '/index.html']
  },
  {
    label: 'Books',
    reason: 'Core product landing page that should appear in search.',
    paths: ['/book', '/book.html']
  },
  {
    label: 'Press',
    reason: 'Media coverage and assets that support authority signals.',
    paths: ['/press', '/press.html']
  },
  {
    label: 'Contact',
    reason: 'Lead generation touchpoint for speaking and coaching requests.',
    paths: ['/contact', '/contact.html']
  },
  {
    label: 'Image Index',
    reason: 'Reference hub for approved creative assets.',
    paths: ['/image-index', '/image-index.html']
  },
  {
    label: 'Sitemap',
    reason: 'Structured crawl map for search engines.',
    paths: ['/sitemap', '/sitemap.html']
  },
  {
    label: 'Search Results',
    reason: 'Search utility that supports user navigation.',
    paths: ['/pages/search', '/pages/search.html']
  }
];

const NON_INDEXABLE_PAGES = [
  {
    label: 'Login',
    reason: 'Authentication surface that should stay private and avoid thin-content penalties.',
    paths: ['/login', '/login.html']
  },
  {
    label: 'Reset Password',
    reason: 'One-time credential workflow with no marketing value.',
    paths: ['/reset-password', '/reset-password.html']
  },
  {
    label: 'Verify Email',
    reason: 'Verification callback page only used during onboarding.',
    paths: ['/verify-email', '/verify-email.html']
  },
  {
    label: 'Dashboard',
    reason: 'Authenticated experience for members only.',
    paths: ['/dashboard', '/dashboard.html', '/admin-dashboard', '/admin-dashboard.html', '/member', '/member/index.html']
  },
  {
    label: 'Internal Design References',
    reason: 'Design system and prototype sandboxes not meant for public discovery.',
    paths: [
      '/components',
      '/components.html',
      '/style-classes',
      '/style-classes.html',
      '/themes',
      '/themes.html',
      '/All-heroes-demos',
      '/All-heroes-demos.html',
      '/brandon',
      '/brandon.html',
      '/shhh',
      '/shhh.html',
      '/home',
      '/home.html'
    ]
  }
];

const INDEX_DIRECTIVE = 'index, follow';
const NOINDEX_DIRECTIVE = 'noindex, nofollow';

function flattenConfig(config, directive) {
  return config.reduce((map, entry) => {
    entry.paths.forEach((path) => {
      map.set(path, { ...entry, directive });
    });
    return map;
  }, new Map());
}

const indexableMap = flattenConfig(INDEXABLE_PAGES, INDEX_DIRECTIVE);
const nonIndexableMap = flattenConfig(NON_INDEXABLE_PAGES, NOINDEX_DIRECTIVE);
const combinedRules = new Map([...indexableMap, ...nonIndexableMap]);

function normalizePath(pathname) {
  if (!pathname) return '/';
  let path = pathname;
  try {
    if (typeof window !== 'undefined') {
      path = new URL(pathname, window.location.origin).pathname;
    }
  } catch (error) {
    console.warn('[SEO] Unable to normalize pathname via URL constructor:', error);
  }

  path = path.replace(/\\/g, '/');
  if (!path.startsWith('/')) path = `/${path}`;

  const matchCandidates = new Set([path]);

  if (path.endsWith('/')) {
    matchCandidates.add(path.slice(0, -1) || '/');
  }

  if (path.endsWith('/index.html')) {
    const stripped = path.slice(0, -'/index.html'.length) || '/';
    matchCandidates.add(stripped);
  }

  const segments = path.split('/').filter(Boolean);
  if (segments.length > 1) {
    matchCandidates.add(`/${segments.slice(-2).join('/')}`);
  }
  if (segments.length) {
    matchCandidates.add(`/${segments[segments.length - 1]}`);
  }

  for (const candidate of matchCandidates) {
    if (combinedRules.has(candidate)) {
      return candidate;
    }
  }

  return path;
}

function getIndexingRule(pathname = (typeof window !== 'undefined' ? window.location.pathname : '/')) {
  const normalized = normalizePath(pathname);
  const rule = combinedRules.get(normalized);
  if (rule) {
    return { ...rule, path: normalized };
  }
  return {
    label: 'Default',
    reason: 'No explicit directive configured — defaulting to marketing-friendly indexing.',
    directive: INDEX_DIRECTIVE,
    path: normalized
  };
}

function ensureRobotsMeta(doc = typeof document !== 'undefined' ? document : undefined) {
  if (!doc || !doc.head) return undefined;
  let meta = doc.querySelector('meta[name="robots"]');
  if (!meta) {
    meta = doc.createElement('meta');
    meta.setAttribute('name', 'robots');
    doc.head.appendChild(meta);
  }
  return meta;
}

function applyIndexingMeta(doc = typeof document !== 'undefined' ? document : undefined) {
  if (!doc) return;
  const rule = getIndexingRule(doc.location ? doc.location.pathname : (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const meta = ensureRobotsMeta(doc);
  if (meta) {
    meta.setAttribute('content', rule.directive);
  }
  return rule;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyIndexingMeta());
  } else {
    applyIndexingMeta();
  }
}

export {
  INDEXABLE_PAGES,
  NON_INDEXABLE_PAGES,
  applyIndexingMeta,
  getIndexingRule,
  normalizePath
};
