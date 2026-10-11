(() => {
  const STORAGE_KEY = 'zen-log.colour';
  const themes = {
    black: null,
    white: { bg: '#2a2a2a', blob: '#ffffff', text: '#161616', overlay: '#ffffff', panel: '#ebebeb', fill: '#ebebeb' },
    pink: { bg: '#f7dce7', blob: '#b8326f', text: '#fff5f9', overlay: '#7a1b45', panel: '#8f2554', fill: '#8f2554' },
    blue: { bg: '#d6e6f7', blob: '#1d4f9c', text: '#f2f7ff', overlay: '#0f2c5e', panel: '#17407f', fill: '#17407f' },
    green: { bg: '#d9ecd9', blob: '#2f6b3a', text: '#f3fbf3', overlay: '#173d20', panel: '#1f4f2b', fill: '#1f4f2b' },
    purple: { bg: '#e6dcf5', blob: '#5b3a9e', text: '#f7f3ff', overlay: '#2f1d5c', panel: '#46307f', fill: '#46307f' },
  };

  function applyTheme(name) {
    const theme = themes[name] || null;
    const style = document.documentElement.style;
    ['bg', 'blob', 'text', 'overlay', 'panel', 'fill'].forEach(key => {
      if (theme) style.setProperty(`--${key}`, theme[key]);
      else style.removeProperty(`--${key}`);
    });
  }

  window.setZenTheme = name => {
    try { localStorage.setItem(STORAGE_KEY, name); } catch {}
    applyTheme(name);
  };

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch {}
  applyTheme(saved);
})();
