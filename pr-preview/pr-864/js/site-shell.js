const sharedHeaderMarkup = `
<header class="site-header padding-y-sm js-sticky-nav">
  <div class="container max-width-adaptive-lg flex items-center justify-between">
    <a href="index.html" class="logo" aria-label="Daren Prince Home">
      <img
        src="/assets/logos/2Daren_Web_Logo_White_For_Dark_Background.png"
        alt="Daren Prince"
      />
    </a>
    <div class="nav-btn-group flex items-center gap-sm">
      <button class="nav-icon-btn js-search-toggle" aria-label="Search">
        <i class="ph ph-magnifying-glass"></i>
      </button>
      <button class="nav-icon-btn nav-icon-btn--share js-share-trigger" aria-label="Share this page">
        <i class="ph ph-share-network"></i>
      </button>
      <button class="nav-icon-btn js-profile-toggle" aria-label="Account">
        <i class="ph ph-user"></i>
      </button>
      <button class="hamburger-btn js-menu-toggle" aria-label="Menu">
        <i class="ph ph-list"></i>
      </button>
    </div>
  </div>
  <div class="search-bar js-search-bar" hidden>
    <form class="search-form flex items-center">
      <input type="search" placeholder="search site" />
      <button type="submit" class="search-submit"><i class="ph ph-magnifying-glass"></i></button>
    </form>
  </div>
  <div class="profile-dropdown js-profile-dropdown" hidden>
    <div class="profile-info">
      <img src="/assets/images/daren-prince-profile-sm.jpg" alt="Avatar" class="profile-avatar" />
      <span class="profile-name">Guest</span>
    </div>
    <ul>
      <li><a href="dashboard.html">Dashboard</a></li>
      <li><a href="login.html">Account</a></li>
      <li>
        <button class="auth-btn logout-btn js-auth-toggle"><i class="ph ph-sign-out"></i> Logout</button>
      </li>
    </ul>
  </div>
</header>`

function getFooterEmailId() {
  const pageName = window.location.pathname.split('/').pop() || 'index.html'
  const safeName = pageName.replace(/\.html$/, '').replace(/[^a-z0-9-]/gi, '-')
  return `footer-email-${safeName}`
}

function sharedFooterMarkup() {
  const emailId = getFooterEmailId()

  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="/assets/logos/logo-footer-white.png" alt="Daren Prince" class="footer-logo" />
        <p class="footer-tagline">Confident, psychology-backed storytelling, systems, and tools for real transformation.</p>
        <div class="footer-socials">
          <a href="https://www.facebook.com/" aria-label="Follow on Facebook"><img src="/assets/icons/facebook-32.png" alt="" /><span class="sr-only">Facebook</span></a>
          <a href="https://x.com/" aria-label="Follow on X"><img src="/assets/icons/twitter-x-32.png" alt="" /><span class="sr-only">X (Twitter)</span></a>
          <a href="https://www.youtube.com/" aria-label="Follow on YouTube"><img src="/assets/icons/youtube-32.png" alt="" /><span class="sr-only">YouTube</span></a>
          <a href="https://www.tiktok.com/" aria-label="Follow on TikTok"><img src="/assets/icons/tiktok-32.png" alt="" /><span class="sr-only">TikTok</span></a>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="book.html">Book</a></li>
          <li><a href="meet-daren-prince.html">Meet Daren</a></li>
          <li><a href="press.html">Press</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="sitemap.html">Site Index</a></li>
        </ul>
      </div>
      <details class="footer-collapse">
        <summary>Creator &amp; Platform Links</summary>
        <div class="footer-collapse-grid">
          <div>
            <h4>Creator Tools</h4>
            <ul class="footer-links">
              <li><a href="components.html">Components</a></li>
              <li><a href="themes.html">Themes</a></li>
              <li><a href="style-classes.html">Style Classes</a></li>
              <li><a href="loaders.html">Loaders</a></li>
              <li><a href="promotion-tools.html">Promotion Tools</a></li>
            </ul>
          </div>
          <div>
            <h4>Developer Docs</h4>
            <ul class="footer-links">
              <li><a href="iconifty.html">Iconify</a></li>
              <li><a href="docs/style-guide.html">Style Guide</a></li>
              <li><a href="docs/buttons-demo.html">Buttons Demo</a></li>
              <li><a href="style-classes.html">Utility Classes</a></li>
            </ul>
          </div>
          <div>
            <h4>Account</h4>
            <ul class="footer-links">
              <li><a href="login.html">Login</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="reset-password.html">Reset Password</a></li>
              <li><a href="verify-email.html">Verify Email</a></li>
            </ul>
          </div>
          <div>
            <h4>Admin</h4>
            <ul class="footer-links">
              <li><a href="admin-dashboard.html">Admin Dashboard</a></li>
              <li><a href="admin-user-management.html">User Management</a></li>
            </ul>
          </div>
        </div>
      </details>
      <div class="footer-signup">
        <h4>Mailing List</h4>
        <p class="footer-note">Join for drops, tools, and private updates.</p>
        <form action="#" method="post">
          <label for="${emailId}" class="sr-only">Email address</label>
          <input id="${emailId}" name="email" type="email" placeholder="you@email.com" required />
          <button type="submit" class="primary-btn">Join the List</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <span>© 2026 Daren Prince. All rights reserved.</span>
        <a href="labs.html" class="footer-labs-link"><img src="/labs/assets/crown-labs-logo.png" alt="Crown Labs" class="footer-labs-logo" /></a>
      </div>
    </div>
  </footer>`
}

document.querySelectorAll('[data-shared-header]').forEach((node) => {
  node.outerHTML = sharedHeaderMarkup
})

document.querySelectorAll('[data-shared-footer]').forEach((node) => {
  node.outerHTML = sharedFooterMarkup()
})

document.dispatchEvent(new CustomEvent('site-shell:ready'))
