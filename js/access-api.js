(function (global) {
  const DEFAULT_CONFIG = {
    apiBaseUrl: (global.MosaicSiteConfig && global.MosaicSiteConfig.apiBaseUrl) || "YOUR_ACCESS_API_BASE_URL",
  };

  const runtimeConfig = Object.assign({}, DEFAULT_CONFIG, global.ACCESS_API_CONFIG || {});

  async function callAccessApi(path, payload) {
    const base = String(runtimeConfig.apiBaseUrl || "").replace(/\/$/, "");
    if (!base || base === "YOUR_ACCESS_API_BASE_URL") {
      throw new Error("Configuration required: set ACCESS_API_CONFIG.apiBaseUrl.");
    }

    const response = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload || {}),
    });

    let data = {};
    try {
      data = await response.json();
    } catch (_) {
      data = {};
    }

    if (!response.ok || data.ok === false) {
      throw new Error(data.error || `Request failed (${response.status}).`);
    }
    return data;
  }

  global.MosaicAccessApi = {
    config: runtimeConfig,
    callAccessApi,
  };
})(window);
