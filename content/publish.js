docReady(() => {
  /*

    Add sign up button to docs

  */

  document.querySelector(".site-body-left-column-site-name").insertAdjacentHTML("afterend", `<div style="margin-bottom: 1rem; margin-top: -1rem;">
    <a class="get-started-link" href="https://hyperclay.com/request-early-access"><span class="get-started-link__text">Sign Up</span></a>
  </div>`);

  /*

    Add folder to document as data attribute for conditional styling

  */

  function updateDataFolderAttribute() {
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/').filter(segment => segment !== '');
    if (pathSegments.length > 1) {
      const folderPath = pathSegments.slice(0, -1).join('/').toLowerCase();
      document.documentElement.setAttribute('data-folder', folderPath);
    } else {
      document.documentElement.removeAttribute('data-folder');
    }
  }

  updateDataFolderAttribute();

  window.addEventListener('popstate', updateDataFolderAttribute);

  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    updateDataFolderAttribute();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    updateDataFolderAttribute();
  };
});

/*

  Utils

*/

function docReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}