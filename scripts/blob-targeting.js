//this code finds the areas covered by text, and moves the blobs beneath them
(() => {
  const scene = document.querySelector('.blob-scene');
  if (!scene) return;

  const blobs = [...scene.querySelectorAll('.blob')];
  const hasSavingsOpening = Boolean(document.querySelector('.savings-content'));
  const hasGratificationOpening = Boolean(document.querySelector('.info-title'));

  if (hasSavingsOpening || hasGratificationOpening) scene.classList.add('is-opening');

  function getTextRegions() {
    const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const regions = [];
    let textNode;

    while ((textNode = textWalker.nextNode())) {
      if (!textNode.textContent.trim()
        || textNode.parentElement.closest('script, .blob-scene, .page-entry, .page-transition')) {
        continue;
      }

      const range = document.createRange();
      range.selectNodeContents(textNode);
      regions.push(...range.getClientRects());
      range.detach();
    }

    return regions;
  }

  function positionBlobs() {
    if (scene.classList.contains('is-opening')) return;

    const regions = getTextRegions().filter(rect => rect.width > 0 && rect.height > 0);

    if (!regions.length) return;

    const bounds = regions.reduce((result, rect) => ({
      left: Math.min(result.left, rect.left),
      top: Math.min(result.top, rect.top),
      right: Math.max(result.right, rect.right),
      bottom: Math.max(result.bottom, rect.bottom),
    }), {
      left: Infinity,
      top: Infinity,
      right: -Infinity,
      bottom: -Infinity,
    });

    blobs.forEach((blob, index) => {
      const fraction = (index + 1) / (blobs.length + 1);
      const targetX = bounds.left + (bounds.right - bounds.left) * fraction;
      const targetY = bounds.top + (bounds.bottom - bounds.top) * fraction;
      blob.style.left = `${targetX}px`;
      blob.style.top = `${targetY}px`;
      blob.style.right = 'auto';
      blob.style.bottom = 'auto';
    });
  }

  function updateBlobPositions() {
    if (document.querySelector('.result-scene')) {
      scene.classList.add('is-opening');
      blobs.forEach(blob => {
        blob.style.left = '';
        blob.style.top = '';
        blob.style.right = '';
        blob.style.bottom = '';
      });
      return;
    }

    positionBlobs();
  }

  window.addEventListener('resize', updateBlobPositions, { passive: true });
  new MutationObserver(updateBlobPositions).observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  });
  if (hasSavingsOpening) {
    window.setTimeout(() => {
      scene.classList.remove('is-opening');
      positionBlobs();
    }, 7200);
  } else if (hasGratificationOpening) {
    window.setTimeout(() => {
      scene.classList.remove('is-opening');
      positionBlobs();
    }, 3400);
  } else {
    positionBlobs();
  }
})();