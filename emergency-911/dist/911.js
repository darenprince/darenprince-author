// Legacy bundle retired. The current Crown SOS portal is served by /911.html.
// Keep this compatibility asset free of the old client-side access code and fake auth gate.
document.addEventListener('DOMContentLoaded', () => {
  const legacyGate = document.querySelector('#passwordGate');
  if (legacyGate) {
    window.location.replace('/911.html');
  }
});
