document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.js-profile-toggle');
  const dropdown = document.querySelector('.js-profile-dropdown');
  if (!toggle || !dropdown) return;

  const avatarImg = dropdown.querySelector('.profile-avatar');
  const nameEl = dropdown.querySelector('.profile-name');
  const logoutEl = dropdown.querySelector('.js-auth-toggle');

  // ---------------------------
  // UI event listeners
  // ---------------------------
  toggle.addEventListener('click', () => {
    dropdown.hidden = !dropdown.hidden;
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
      dropdown.hidden = true;
    }
  });

  // default auth action -> login
  let loginHandler;
  if (logoutEl) {
    loginHandler = () => {
      window.location.href = '/login.html';
    };
    logoutEl.textContent = 'Log In';
    logoutEl.addEventListener('click', loginHandler);
  }

  // ---------------------------
  // Supabase profile info
  // ---------------------------
  (async () => {
    try {
      const { default: supabase } = await import('../supabase/client.js');
      if (!supabase) {
        throw new Error('Supabase client not configured');
      }
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const user = data.session.user;
        nameEl.textContent =
          user.user_metadata?.full_name || user.email;
        const { data: avatarData } = await supabase.storage
          .from('avatars')
          .getPublicUrl(`${user.id}.jpg`);
        if (avatarData?.publicUrl) {
          avatarImg.src = avatarData.publicUrl;
        }
        if (logoutEl) {
          logoutEl.removeEventListener('click', loginHandler);
          logoutEl.textContent = 'Logout';
          logoutEl.addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.href = '/';
          });
        }
      }
    } catch (error) {
      console.warn('Supabase unavailable: profile data disabled', error);
      if (nameEl) nameEl.textContent = 'Guest';
      if (logoutEl) logoutEl.title = 'Authentication service unavailable';
    }
  })();
});
