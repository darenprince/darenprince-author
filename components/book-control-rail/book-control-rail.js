export const hooks = {
  onZoom: () => {},
  onViewFront: () => {},
  onViewBack: () => {},
  onToggleSpin360: () => {},
  onBuyClick: () => {},
};

const root = document.querySelector('.book-rail');
const buttons = {
  zoom: root?.querySelector('[data-tool="zoom"]'),
  front: root?.querySelector('[data-tool="front"]'),
  back: root?.querySelector('[data-tool="back"]'),
  spin360: root?.querySelector('[data-tool="spin360"]'),
  buy: root?.querySelector('[data-tool="buy"]'),
  compact: root?.querySelector('[data-tool="compact"]'),
};

export function setActiveTool(name) {
  ['front', 'back', 'spin360'].forEach(tool => {
    buttons[tool]?.classList.toggle('book-rail__btn--active', tool === name);
  });
}

buttons.zoom?.addEventListener('click', () => hooks.onZoom());
buttons.front?.addEventListener('click', () => {
  setActiveTool('front');
  hooks.onViewFront();
});
buttons.back?.addEventListener('click', () => {
  setActiveTool('back');
  hooks.onViewBack();
});
buttons.spin360?.addEventListener('click', () => {
  setActiveTool('spin360');
  hooks.onToggleSpin360();
});
buttons.buy?.addEventListener('click', () => hooks.onBuyClick());

const compactClass = 'book-rail--compact';
(function loadCompact() {
  const compact = sessionStorage.getItem('bookRailCompact') === '1';
  root?.classList.toggle(compactClass, compact);
})();

buttons.compact?.addEventListener('click', () => {
  const compact = !root.classList.contains(compactClass);
  root.classList.toggle(compactClass, compact);
  sessionStorage.setItem('bookRailCompact', compact ? '1' : '0');
});
