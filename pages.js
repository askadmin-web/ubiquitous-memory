/* ────────────────────────────────────────────────────────────────
   PORTFOLIO MANIFEST — the single source of truth for this site.

   To add a new page: add one entry to the `pages` array of the right
   group below. The nav bar and the portfolio index both build
   themselves from this file. Nothing else needs editing.

   To retire a page: set status: "draft" (stays in the file, drops out
   of the nav and index) or delete the entry.

   FIELDS
     file    filename, relative to the site root
     title   full title — used on the index card
     nav     short label — used in the nav dropdown (defaults to title)
     desc    one- or two-sentence card description
     icon    Tabler icon name, minus the "ti ti-" prefix
             browse at https://tabler.io/icons
     status  "live" | "draft"   (draft = built but not published)
     date    build date, for your own reference. Never shown, never
             in a URL. Format YYYY-MM-DD.
   ──────────────────────────────────────────────────────────────── */

window.PORTFOLIO = {

  owner: {
    name: "Cathy Rudolph",
    tagline: "Implementation Manager · Full-lifecycle implementation across B2B SaaS and low-code platforms. Fully remote.",
    location: "Stoughton, MA",
    email: "cathy.rudolph@academicskills.net",
    linkedin: "https://linkedin.com/in/cathy-rudolph-450225370"
  },

  groups: [

    {
      id: "evidence",
      label: "Credentials & Evidence",
      nav: "Evidence",
      blurb: "What I've done, and where.",
      layout: "grid",          // "grid" = 3-across cards, "stack" = full-width
      pages: [
        {
          file: "resume.html",
          title: "Interactive Resume",
          nav: "Resume",
          desc: "Skills with supporting evidence, full work history, certifications.",
          icon: "file-text",
          status: "live",
          date: "2026-06-01"
        },
        {
          file: "global-reach.html",
          title: "Global Reach",
          nav: "Global Reach",
          desc: "Onsite implementations across 4 regions, 14 countries, 16 cities.",
          icon: "map-pin",
          status: "live",
          date: "2026-06-01"
        }
      ]
    },

    {
      id: "practice",
      label: "Delivery Practice",
      nav: "Practice",
      blurb: "How the work actually runs — frameworks, failure modes, and the questions that surface them.",
      layout: "stack",
      pages: [
        {
          file: "implementation-framework.html",
          title: "Implementation Framework",
          nav: "Implementation Framework",
          desc: "How I run implementations — two delivery shapes, six-phase framework, 8-week timeline.",
          icon: "sitemap",
          status: "live",
          date: "2026-06-01"
        },
        {
          file: "institutional-complexity.html",
          title: "The Same Picture, Five Thousand Pieces",
          nav: "Institutional Complexity",
          desc: "Five delivery variables under two institutional conditions — concentrated functions versus separated ones. Switch between them and watch which ones move. What changes most is not delivery. It is discovery.",
          icon: "puzzle",
          status: "live",
          date: "2026-08-06"
        },
        {
          file: "delivery-at-scale.html",
          title: "What Breaks When Delivery Scales",
          nav: "Delivery at Scale",
          desc: "Five mechanisms that work at six concurrent implementations and stop working at forty — the point each one fails, what replaces it, and what the replacement costs.",
          icon: "chart-arrows-vertical",
          status: "live",
          date: "2026-08-06"
        },
        {
          file: "role-play-rooms.html",
          title: "Same Stage, Different Room",
          nav: "Role-Play Rooms",
          desc: "Two post-sales role-play setups that look identical on a calendar invitation — one puts a client across the table, one puts colleagues there. An interactive comparison of what can be asked in each room, and what it costs to confuse them.",
          icon: "layout-columns",
          status: "live",
          date: "2026-07-27"
        }
      ]
    },

    {
      id: "built",
      label: "How It Was Built",
      nav: "How It Was Built",
      blurb: "The process behind the artifacts, decision points included.",
      layout: "stack",
      pages: [
        {
          file: "built-resume.html",
          title: "Resume Process with AI",
          nav: "Resume Process with AI",
          desc: "Discovering judicious addition of AI-enabled workflow and value-added delivery framework. Manual process vs. AI-assisted — nine steps, every decision point documented.",
          icon: "tool",
          status: "live",
          date: "2026-06-01"
        },
        {
          file: "built-jd-comparison.html",
          title: "Job Description–Resume Comparison Interactive",
          nav: "JD–Resume Comparison",
          desc: "Fictional JD, fictional candidate — MegaHandy's Illuma Engineer role mapped against Joseph Swan's resume. Demonstrates the click-to-map interaction on its own terms, apart from any real application.",
          icon: "arrows-left-right",
          status: "live",
          date: "2026-06-23"
        }
      ]
    }

  ]
};

/* Convenience accessors used by nav-inject.js and index.html. */
window.PORTFOLIO.liveGroups = function () {
  return window.PORTFOLIO.groups
    .map(function (g) {
      var copy = Object.assign({}, g);
      copy.pages = g.pages.filter(function (p) { return p.status === "live"; });
      return copy;
    })
    .filter(function (g) { return g.pages.length > 0; });
};
