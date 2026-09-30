(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.body.classList.add('has-custom-cursor');

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.append(cursor);

  function isVisibleButton(button) {
    if (!button || button.getClientRects().length === 0) return false;

    for (let element = button; element; element = element.parentElement) {
      const style = getComputedStyle(element);
      if (style.display === 'none'
        || style.visibility === 'hidden'
        || style.visibility === 'collapse'
        || Number(style.opacity) <= 0.01
        || style.pointerEvents === 'none') {
        return false;
      }
    }

    return true;
  }

  window.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;

    cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
    cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
    cursor.classList.add('is-visible');
    cursor.classList.toggle('is-expanded', isVisibleButton(event.target.closest('button')));
  });

  window.addEventListener('blur', () => cursor.classList.remove('is-visible'));
})();