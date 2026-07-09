/* ── Site nav loader ──
   Fetches nav.html and injects it into #nav-placeholder on every page.
   Handles: active-link highlighting (including the dropdown parent),
   dropdown open/close, and theme-toggle button wiring.

   Theme itself (the .dark class on <body>) is applied by a small inline
   script in each page's <head> — that has to stay inline so dark mode
   applies before first paint, instead of flashing light-then-dark while
   this file is still fetching. This script only wires up the *button*
   once it exists in the DOM. */

(function () {
  var placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  fetch('nav.html')
    .then(function (r) {
      if (!r.ok) throw new Error('nav.html returned ' + r.status);
      return r.text();
    })
    .then(function (html) {
      placeholder.innerHTML = html;
      initActiveLinks();
      initDropdown();
      initThemeToggle();
    })
    .catch(function (err) {
      console.error('Nav failed to load:', err);
    });

  function currentPage() {
    var path = window.location.pathname.split('/').pop();
    return path || 'index.html';
  }

  function initActiveLinks() {
    var page = currentPage();
    var links = placeholder.querySelectorAll('[data-page]');
    links.forEach(function (el) {
      if (el.getAttribute('data-page') === page) {
        el.classList.add('active');
        var dropdown = el.closest('.nav-dropdown');
        if (dropdown) {
          var trigger = dropdown.querySelector('.nav-dropdown-trigger');
          if (trigger) trigger.classList.add('active');
        }
      }
    });
  }

  function initDropdown() {
    var trigger = document.getElementById('built-dropdown-trigger');
    if (!trigger) return;
    var menu = trigger.nextElementSibling;

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function () {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        menu.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initThemeToggle() {
    var toggleBtn = document.getElementById('theme-toggle');
    var themeIcon = document.getElementById('theme-icon');
    var themeLabel = document.getElementById('theme-label');
    if (!toggleBtn) return;

    function reflect(dark) {
      themeIcon.className = dark ? 'ti ti-moon' : 'ti ti-sun';
      themeLabel.textContent = dark ? 'Dark' : 'Light';
    }

    // Theme was already applied to <body> by the inline head script.
    reflect(document.body.classList.contains('dark'));

    toggleBtn.addEventListener('click', function () {
      var dark = !document.body.classList.contains('dark');
      document.body.classList.toggle('dark', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      reflect(dark);
    });
  }
})();
