/* ── Site nav builder ──
   Builds the nav bar from window.PORTFOLIO (pages.js) and injects it
   into #nav-placeholder. Add a page to pages.js and it appears here
   automatically — this file never needs editing.

   Why generated rather than fetched: the old version fetched nav.html,
   which meant (a) every new page had to be added in two places, and
   (b) nothing rendered when previewing over file://. Building from the
   manifest fixes both.

   Theme itself (the .dark class on <body>) is applied by a small inline
   script in each page's <head> — that has to stay inline so dark mode
   applies before first paint, instead of flashing light-then-dark while
   this file is still loading. This script only wires up the *button*
   once it exists in the DOM. */

(function () {
  var placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  if (!window.PORTFOLIO) {
    console.error('nav-inject.js: pages.js must load before nav-inject.js');
    return;
  }

  var groups = window.PORTFOLIO.liveGroups();
  var page = currentPage();

  placeholder.innerHTML = buildNav(groups);
  markActive(page);
  initDropdowns();
  initThemeToggle();

  function currentPage() {
    var path = window.location.pathname.split('/').pop();
    return path || 'index.html';
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function buildNav(groups) {
    var html = '<nav class="site-nav" aria-label="Site navigation"><div class="nav-inner">';

    html += '<a href="index.html" class="nav-link" data-page="index.html">Welcome</a>';

    groups.forEach(function (g) {
      // A single-page group renders as a plain link, not a dropdown.
      if (g.pages.length === 1) {
        var only = g.pages[0];
        html +=
          '<a href="' + esc(only.file) + '" class="nav-link" data-page="' + esc(only.file) + '">' +
            esc(only.nav || only.title) +
          '</a>';
        return;
      }

      html +=
        '<div class="nav-dropdown">' +
          '<button type="button" class="nav-link nav-dropdown-trigger" ' +
            'id="nav-trigger-' + esc(g.id) + '" aria-haspopup="true" aria-expanded="false">' +
            esc(g.nav || g.label) +
            '<i class="ti ti-chevron-down nav-dropdown-caret" aria-hidden="true"></i>' +
          '</button>' +
          '<div class="nav-dropdown-menu" role="menu" aria-labelledby="nav-trigger-' + esc(g.id) + '">' +
            g.pages.map(function (p) {
              return '<a href="' + esc(p.file) + '" class="nav-dropdown-item" ' +
                     'data-page="' + esc(p.file) + '" role="menuitem">' +
                     esc(p.nav || p.title) + '</a>';
            }).join('') +
          '</div>' +
        '</div>';
    });

    html +=
        '<div class="nav-spacer"></div>' +
        '<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">' +
          '<i class="ti ti-sun" id="theme-icon" aria-hidden="true"></i>' +
          '<span id="theme-label">Light</span>' +
        '</button>' +
      '</div></nav>';

    return html;
  }

  function markActive(page) {
    placeholder.querySelectorAll('[data-page]').forEach(function (el) {
      if (el.getAttribute('data-page') !== page) return;
      el.classList.add('active');
      var dropdown = el.closest('.nav-dropdown');
      if (dropdown) {
        var trigger = dropdown.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.classList.add('active');
      }
    });
  }

  function initDropdowns() {
    var triggers = placeholder.querySelectorAll('.nav-dropdown-trigger');

    function closeAll() {
      triggers.forEach(function (t) {
        t.nextElementSibling.classList.remove('open');
        t.setAttribute('aria-expanded', 'false');
      });
    }

    triggers.forEach(function (trigger) {
      var menu = trigger.nextElementSibling;
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var wasOpen = menu.classList.contains('open');
        closeAll();
        if (!wasOpen) {
          menu.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', closeAll);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
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
