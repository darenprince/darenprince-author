export let onZoom = () => {};
export let onViewFront = () => {};
export let onViewBack = () => {};
export let onToggleSpin360 = () => {};
export let onBuyClick = () => {};

const root = document.querySelector('.book-rail');
const buttons = {
  zoom: root?.querySelector('[data-tool="zoom"]'),
  front: root?.querySelector('[data-tool="front"]'),
  back: root?.querySelector('[data-tool="back"]'),
  spin360: root?.querySelector('[data-tool="spin360"]'),
  buy: root?.querySelector('[data-tool="buy"]'),
  compact: root?.querySelector('[data-tool="compact"]'),
};

const TOGGLEABLE_TOOLS = ['front', 'back', 'spin360'];

export function setActiveTool(name) {
  TOGGLEABLE_TOOLS.forEach(tool => {
    buttons[tool]?.classList.toggle('book-rail__btn--active', tool === name);
  });
}

buttons.zoom?.addEventListener('click', () => onZoom());
buttons.front?.addEventListener('click', () => {
  setActiveTool('front');
  onViewFront();
});
buttons.back?.addEventListener('click', () => {
  setActiveTool('back');
  onViewBack();
});
buttons.spin360?.addEventListener('click', () => {
  setActiveTool('spin360');
  onToggleSpin360();
});
buttons.buy?.addEventListener('click', () => onBuyClick());

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
