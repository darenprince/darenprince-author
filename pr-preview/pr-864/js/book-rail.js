const rail = document.querySelector('.book-rail');

export function onZoom() {}
export function onViewFront() {
  setActiveTool('front');
}
export function onViewBack() {
  setActiveTool('back');
}
export function onToggleSpin360() {
  const btn = rail.querySelector('[data-tool="spin360"]');
  setActiveTool(btn?.classList.contains('is-active') ? null : 'spin360');
}
export function onBuyClick() {}

export function setActiveTool(name) {
  if (!rail) return;
  ['front', 'back', 'spin360'].forEach(key => {
    const btn = rail.querySelector(`[data-tool="${key}"]`);
    btn?.classList.toggle('is-active', key === name);
  });
}

if (rail) {
  const state = sessionStorage.getItem('bookRailCompact');
  if (state === '1') {
    rail.classList.add('book-rail--compact');
  }

  const buttons = {
    zoom: rail.querySelector('[data-tool="zoom"]'),
    front: rail.querySelector('[data-tool="front"]'),
    back: rail.querySelector('[data-tool="back"]'),
    spin360: rail.querySelector('[data-tool="spin360"]'),
    buy: rail.querySelector('[data-tool="buy"]')
  };

  buttons.zoom?.addEventListener('click', onZoom);
  buttons.front?.addEventListener('click', onViewFront);
  buttons.back?.addEventListener('click', onViewBack);
  buttons.spin360?.addEventListener('click', onToggleSpin360);
  buttons.buy?.addEventListener('click', onBuyClick);

  const toggle = rail.querySelector('[data-action="toggle"]');
  toggle?.addEventListener('click', () => {
    rail.classList.toggle('book-rail--compact');
    sessionStorage.setItem(
      'bookRailCompact',
      rail.classList.contains('book-rail--compact') ? '1' : '0'
    );
  });
}

