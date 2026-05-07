<template>
  <main class="wrap">
    <header>
      <h1>Crown Labs Documentation</h1>
      <p>Quiet luxury infrastructure documentation platform.</p>
    </header>
    <section>
      <ul>
        <li><NuxtLink to="/docs/foundation">Corporate Foundation</NuxtLink></li>
        <li><NuxtLink to="/docs/writing-standards">Writing Standards</NuxtLink></li>
        <li><NuxtLink to="/docs/investor-framework">Investor Framework</NuxtLink></li>
        <li><NuxtLink to="/docs/product-dossiers">Product Dossiers</NuxtLink></li>
        <li><NuxtLink to="/docs/corporate-infrastructure">Corporate Infrastructure</NuxtLink></li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
:global(body){font-family:Inter, system-ui, sans-serif;background:#0c1117;color:#e7edf3;margin:0}
.wrap{max-width:960px;margin:0 auto;padding:3rem 1.25rem}
a{color:#d4b26a;text-decoration:none}
a:hover{text-decoration:underline}
</style>
