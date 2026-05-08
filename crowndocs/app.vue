<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

const STORAGE_KEY = 'crowndocs-theme'
const theme = useState<'dark' | 'light'>('theme', () => 'dark')

const logoSrc = computed(() =>
  theme.value === 'dark'
    ? 'https://www.darenprince.com/labs/assets/crown-labs-logo.png'
    : 'https://www.darenprince.com/assets/images/30F807E6-DA8A-413C-8564-116375DDE082%202.png'
)

const themeLabel = computed(() => (theme.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'))

const applyTheme = (mode: 'dark' | 'light') => {
  if (!import.meta.client) return
  document.documentElement.setAttribute('data-theme', mode)
  document.body.dataset.theme = mode
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const persisted = localStorage.getItem(STORAGE_KEY)
  if (persisted === 'light' || persisted === 'dark') {
    theme.value = persisted
  }
  applyTheme(theme.value)
})

watch(theme, (mode) => {
  applyTheme(mode)
  if (import.meta.client) localStorage.setItem(STORAGE_KEY, mode)
})
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <NuxtLink to="/" class="brand-link" aria-label="Crown Labs Documentation home">
        <img :src="logoSrc" alt="Crown Labs" class="brand-logo" />
      </NuxtLink>
      <button class="theme-toggle" type="button" :aria-label="themeLabel" @click="toggleTheme">
        {{ theme === 'dark' ? 'Light' : 'Dark' }}
      </button>
    </header>

    <NuxtPage />

    <footer class="site-footer">Crown Labs Documentation Platform</footer>
  </div>
</template>

<style>
:root {
  --bg: #0c1117;
  --surface: #141c24;
  --text: #e7edf3;
  --muted: #9cafc3;
  --accent: #d4b26a;
  --border: rgba(212, 178, 106, 0.2);
}

:root[data-theme='light'] {
  --bg: #f5f7fa;
  --surface: #ffffff;
  --text: #1f2937;
  --muted: #4b5563;
  --accent: #7a5a1c;
  --border: rgba(31, 41, 55, 0.15);
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
}

a { color: var(--accent); }

.site-shell { min-height: 100vh; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(10px);
}

.brand-logo { height: 36px; width: auto; display: block; }

.theme-toggle {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  padding: 0.4rem 0.75rem;
  cursor: pointer;
}

.site-footer {
  border-top: 1px solid var(--border);
  color: var(--muted);
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}
</style>
