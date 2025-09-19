import { getSupabase, SUPABASE_SETUP_MESSAGE } from './supabase-helper.js';
import { getUserRole, isElevatedRole } from './user-role.js';
import { logSupabaseError, logSupabaseWarning } from './supabase-logger.js';

async function initProfileDropdown() {
  const toggle = document.querySelector('.js-profile-toggle');
  const dropdown = document.querySelector('.js-profile-dropdown');
  if (!toggle || !dropdown) return;

  const avatarImg = dropdown.querySelector('.profile-avatar');
  const nameEl = dropdown.querySelector('.profile-name');
  const logoutEl = dropdown.querySelector('.js-auth-toggle');
  const dashboardLink =
    dropdown.querySelector('.js-dashboard-link') ||
    dropdown.querySelector('a[href*="dashboard"]');

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
      const supabase = getSupabase((message) => {
        if (logoutEl) logoutEl.title = message || SUPABASE_SETUP_MESSAGE;
        logSupabaseWarning('profileDropdown.missingSupabase', message || SUPABASE_SETUP_MESSAGE);
      });
      if (!supabase) {
        throw new Error('Supabase client not configured');
      }
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
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
        if (dashboardLink) {
          const role = await getUserRole(supabase, user);
          if (isElevatedRole(role)) {
            dashboardLink.href = 'admin-dashboard.html';
            dashboardLink.textContent = 'Admin Dashboard';
          } else {
            dashboardLink.href = 'dashboard.html';
            dashboardLink.textContent = 'Dashboard';
          }
        }
        if (logoutEl) {
          logoutEl.removeEventListener('click', loginHandler);
          logoutEl.textContent = 'Logout';
          logoutEl.addEventListener('click', async () => {
            const { error: signOutError } = await supabase.auth.signOut();
            if (signOutError) {
              logSupabaseError('profileDropdown.signOut', signOutError);
              return;
            }
            window.location.href = '/';
          });
        }
      }
    } catch (error) {
      logSupabaseError('profileDropdown.init', error);
      if (nameEl) nameEl.textContent = 'Guest';
      if (logoutEl) logoutEl.title = 'Authentication service unavailable';
    }
  })();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProfileDropdown, { once: true });
} else {
  initProfileDropdown();
}
