(function (global) {
  const STORAGE_KEY = "mosaic_theme";
  const root = document.documentElement;
  const media = global.matchMedia ? global.matchMedia("(prefers-color-scheme: dark)") : null;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }

  function shouldUseDark(theme) {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return media ? media.matches : false;
  }

  function updateButtons() {
    const dark = root.classList.contains("dark");
    const icon = dark ? "☀︎" : "☾";
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.textContent = icon;
      btn.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
      btn.setAttribute("title", `Switch to ${dark ? "light" : "dark"} mode`);
    });
  }

  function applyTheme(theme) {
    const useDark = shouldUseDark(theme);
    root.classList.toggle("dark", useDark);
    root.setAttribute("data-theme", theme || "system");
    updateButtons();
  }

  function initTheme() {
    const stored = getStoredTheme();
    applyTheme(stored || "system");
  }

  function toggleTheme() {
    const isDark = root.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    setStoredTheme(next);
    applyTheme(next);
  }

  function bindThemeToggle() {
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", toggleTheme);
    });
    updateButtons();
  }

  if (media && typeof media.addEventListener === "function") {
    media.addEventListener("change", () => {
      if (!getStoredTheme()) applyTheme("system");
    });
  }

  global.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      applyTheme(event.newValue || "system");
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initTheme();
      bindThemeToggle();
    });
  } else {
    initTheme();
    bindThemeToggle();
  }

  global.MosaicTheme = {
    applyTheme,
    toggleTheme,
    setTheme(theme) {
      setStoredTheme(theme);
      applyTheme(theme);
    },
  };
})(window);
