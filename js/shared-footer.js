(function (global) {
  function renderFooter(options) {
    const opts = Object.assign(
      {
        mountId: "sharedFooter",
        contactEmail: "email@domain.com",
        citeLabel: "[Dataset Paper]",
      },
      options || {}
    );

    const mount = document.getElementById(opts.mountId);
    if (!mount) return;

    const year = new Date().getFullYear();
    mount.innerHTML = `
      <footer class="py-10 bg-[#001976]/85 text-blue-100">
        <div class="container mx-auto px-6 text-center">
          <p class="text-sm">
            Please cite <span class="text-white font-semibold">${opts.citeLabel}</span> if you use MosaicMRI.
            Contact: <a href="mailto:${opts.contactEmail}" class="underline hover:text-white">${opts.contactEmail}</a>
          </p>
          <p class="mt-2 text-xs text-blue-200">
            &copy; ${year} MosaicMRI &bull; Dataset and code are provided under the stated license.
          </p>
        </div>
      </footer>
    `;
  }

  global.MosaicSharedFooter = { renderFooter };
})(window);
