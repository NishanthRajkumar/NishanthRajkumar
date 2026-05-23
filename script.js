const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const filterButtons = document.querySelectorAll(".chip");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.getElementById("emptyState");
const revealItems = document.querySelectorAll(".reveal");
const toTopButton = document.getElementById("toTop");
const shuffleHighlights = document.getElementById("shuffleHighlights");
const proofSection = document.querySelector(".proof-strip");
const metricsStory = document.getElementById("metricsStory");
const themeToggle = document.getElementById("themeToggle");
const footerYear = document.getElementById("footerYear");
const experienceTargets = document.querySelectorAll("[data-experience-since]");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}

function computeExperience(startIso) {
  const [yearStr, monthStr] = (startIso || "").split("-");
  const startYear = Number(yearStr);
  const startMonth = Number(monthStr) - 1;
  if (!Number.isFinite(startYear) || !Number.isFinite(startMonth)) {
    return null;
  }
  const now = new Date();
  let years = now.getFullYear() - startYear;
  let months = now.getMonth() - startMonth;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months };
}

function formatExperience(exp, format) {
  if (!exp) return "";
  if (format === "verbose") {
    const y = `${exp.years} year${exp.years === 1 ? "" : "s"}`;
    const m = exp.months > 0 ? ` and ${exp.months} month${exp.months === 1 ? "" : "s"}` : "";
    return `${y}${m}`;
  }
  return `${exp.years}y ${exp.months}m`;
}

experienceTargets.forEach((el) => {
  const exp = computeExperience(el.dataset.experienceSince);
  if (!exp) return;
  el.textContent = formatExperience(exp, el.dataset.experienceFormat);
});

if (themeToggle) {
  function syncThemeIcon() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const icon = themeToggle.querySelector(".theme-icon");
    if (icon) {
      icon.textContent = current === "dark" ? "\u2600" : "\u263D";
    }
    themeToggle.setAttribute("aria-label", current === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  syncThemeIcon();
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("nr-theme", next);
    } catch (e) {
      /* ignore */
    }
    syncThemeIcon();
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });
}

function updateFilter(selectedFilter) {
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const tags = card.dataset.tags || "";
    const matches = selectedFilter === "all" || tags.includes(selectedFilter);
    card.classList.toggle("hide", !matches);

    if (matches) {
      visibleCount += 1;
    }
  });

  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((chip) => {
      chip.classList.remove("is-active");
      chip.setAttribute("aria-selected", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    updateFilter(button.dataset.filter || "all");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 300)}ms`;
  revealObserver.observe(item);
});

function animateCounter(element) {
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || "";
  const durationMs = 1100;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / durationMs, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// Scrollspy: highlight nav link of the section currently in view.
const spyTargets = Array.from(document.querySelectorAll("main > section[id]"));
const spyLinks = new Map();
document.querySelectorAll(".nav-links a[href^=\"#\"]").forEach((link) => {
  const id = link.getAttribute("href").slice(1);
  if (id) spyLinks.set(id, link);
});
if (spyTargets.length && spyLinks.size) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = spyLinks.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          spyLinks.forEach((l) => {
            l.classList.remove("is-current");
            l.removeAttribute("aria-current");
          });
          link.classList.add("is-current");
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  spyTargets.forEach((section) => spyObserver.observe(section));
}

if (toTopButton) {
  window.addEventListener("scroll", () => {
    const shouldShow = window.scrollY > 360;
    toTopButton.classList.toggle("show", shouldShow);
  });

  toTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (shuffleHighlights) {
  const tourCards = Array.from(document.querySelectorAll("[data-tour-step]"))
    .sort((a, b) => Number(a.dataset.tourStep) - Number(b.dataset.tourStep));
  const stories = [
    "Productivity Gain: AI-assisted workflows reduced delivery friction and improved turnaround speed by 80%.",
    "POCs Beyond Target: Delivery capacity outperformed plan with 11 proof-of-concepts completed above target.",
    "Process Improvements: 22 operational improvements strengthened reliability and throughput across delivery lifecycle.",
    "Enterprise Data Scale: Platform engineering patterns supported dependable movement of data at 15TB+ scale.",
  ];
  let activeMetricIndex = -1;
  let tourTimerId = null;
  const tourStepDelayMs = 2000;
  const defaultButtonLabel = "Impact Tour";

  function highlightMetric(index) {
    tourCards.forEach((tourCard, idx) => {
      tourCard.classList.toggle("active-metric", idx === index);
      tourCard.classList.remove("flash");

      if (idx === index) {
        // Force reflow so repeated highlights retrigger the animation.
        void tourCard.offsetWidth;
        tourCard.classList.add("flash");
      }
    });

    if (metricsStory) {
      metricsStory.textContent = stories[index];
    }
  }

  function stopTour(resetMessage = false) {
    if (tourTimerId) {
      clearInterval(tourTimerId);
      tourTimerId = null;
    }

    shuffleHighlights.disabled = false;
    shuffleHighlights.textContent = defaultButtonLabel;

    if (resetMessage && metricsStory) {
      metricsStory.textContent = "Click Impact Tour to run a 4-step walkthrough of these outcomes.";
    }
  }

  function runTourStep() {
    activeMetricIndex = (activeMetricIndex + 1) % tourCards.length;
    highlightMetric(activeMetricIndex);
    shuffleHighlights.textContent = `Impact Tour (${activeMetricIndex + 1}/${tourCards.length})`;

    if (activeMetricIndex === tourCards.length - 1) {
      // Stop automatically after one full walkthrough.
      setTimeout(() => {
        stopTour(false);
      }, tourStepDelayMs);
    }
  }

  shuffleHighlights.addEventListener("click", () => {
    if (tourTimerId || !tourCards.length) {
      return;
    }

    if (proofSection) {
      proofSection.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }

    activeMetricIndex = -1;
    shuffleHighlights.disabled = true;
    runTourStep();

    if (reducedMotion) {
      // Skip auto-advance for users who prefer reduced motion; reveal all then stop.
      for (let i = 1; i < tourCards.length; i += 1) {
        runTourStep();
      }
      stopTour(false);
      return;
    }

    tourTimerId = setInterval(() => {
      if (activeMetricIndex >= tourCards.length - 1) {
        stopTour(false);
        return;
      }

      runTourStep();
    }, tourStepDelayMs);
  });
}

const trackedLinks = document.querySelectorAll("[data-track]");
const pdfPrimaryLinks = document.querySelectorAll("a[data-fallback]");
const directDownloadLinks = document.querySelectorAll("a[download]:not([data-fallback])");
const linkAvailabilityCache = new Map();

function isDocxUrl(url) {
  return /\.docx(?:$|[?#])/i.test(url || "");
}

function getFileNameFromUrl(url) {
  const safeUrl = (url || "").split("#")[0];
  const lastPathPart = safeUrl.split("?")[0].split("/").pop();
  return decodeURIComponent(lastPathPart || "download");
}

function fallbackAnchorDownload(url) {
  const downloader = document.createElement("a");
  downloader.href = url;
  downloader.download = getFileNameFromUrl(url);
  document.body.appendChild(downloader);
  downloader.click();
  downloader.remove();
}

async function forceDownload(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}`);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const downloader = document.createElement("a");
  downloader.href = objectUrl;
  downloader.download = getFileNameFromUrl(url);
  document.body.appendChild(downloader);
  downloader.click();
  downloader.remove();

  // Revoke object URL after the click has been processed.
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

async function linkExists(url) {
  if (linkAvailabilityCache.has(url)) {
    return linkAvailabilityCache.get(url);
  }

  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    linkAvailabilityCache.set(url, response.ok);
    return response.ok;
  } catch {
    // Some environments block HEAD checks. Keep PDF as the default when uncertain.
    return null;
  }
}

function trackClickEvent(_eventKey) {
  // Analytics intentionally disabled. The previous integration relied on
  // api.countapi.xyz, which was discontinued. Plug in a privacy-friendly
  // analytics provider here (e.g. GoatCounter, Plausible, Umami) if desired.
}

trackedLinks.forEach((link) => {
  link.addEventListener("click", () => {
    trackClickEvent(link.dataset.track);
  });
});

pdfPrimaryLinks.forEach((link) => {
  link.addEventListener("click", async (event) => {
    const fallbackUrl = link.dataset.fallback;
    if (!fallbackUrl) {
      return;
    }

    event.preventDefault();
    const primaryUrl = link.getAttribute("href");
    const usePrimary = await linkExists(primaryUrl);
    const destination = usePrimary === false ? fallbackUrl : primaryUrl;

    try {
      await forceDownload(destination);
    } catch {
      // Fallback for restrictive environments where fetch/blob download is blocked.
      fallbackAnchorDownload(destination);
    }
  });
});

directDownloadLinks.forEach((link) => {
  const href = link.getAttribute("href") || "";
  if (!isDocxUrl(href)) {
    return;
  }

  link.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      await forceDownload(href);
    } catch {
      fallbackAnchorDownload(href);
    }
  });
});

// === Batch 3 (E8 auto-tour, F1 architecture interactivity) ===

// E8: Auto-play Impact Tour once on first scroll into view (gated by localStorage + reduced motion).
(function () {
  if (!shuffleHighlights || !proofSection || reducedMotion) return;
  let played = false;
  try { played = localStorage.getItem("nr-tour-autoplayed") === "1"; } catch (e) { /* ignore */ }
  if (played) return;

  const autoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      autoObserver.disconnect();
      try { localStorage.setItem("nr-tour-autoplayed", "1"); } catch (e) { /* ignore */ }
      setTimeout(() => shuffleHighlights.click(), 750);
    });
  }, { threshold: 0.4 });
  autoObserver.observe(proofSection);
})();

// F1: Interactive architecture diagram — hover/focus a stage to populate detail panel.
(function () {
  const archDetail = document.getElementById("archDetail");
  if (!archDetail) return;
  const stages = document.querySelectorAll(".arch-stage");
  if (!stages.length) return;

  const stageData = {
    source: {
      title: "Source — Operational systems of record",
      body: "Transactional databases that own the truth. We read change events rather than running heavy analytical queries, so producers see negligible extra load.",
      stack: "SQL Server · PostgreSQL · MongoDB · Oracle",
    },
    capture: {
      title: "CDC Capture — Row-level change events",
      body: "Native CDC (e.g. SQL Server CDC, MongoDB change streams) or Debezium-style log readers turn inserts/updates/deletes into ordered, replayable events.",
      stack: "Debezium · SQL Server CDC · Mongo change streams",
    },
    transport: {
      title: "Transport — Partitioned, replayable bus",
      body: "Events land on a managed event bus partitioned by entity key. Replay windows let us recover from downstream failures without re-touching the source.",
      stack: "Azure Event Hubs · Google Pub/Sub · Kafka",
    },
    transform: {
      title: "Transform — Stream + micro-batch enrichment",
      body: "Dataflow / ADF handles low-latency streaming joins; Databricks handles heavier curation, dedup, and SCD logic. Idempotent merges keep at-least-once delivery safe.",
      stack: "Dataflow · ADF · Databricks · Delta · PySpark",
    },
    serve: {
      title: "Serve — Query-ready warehouse + alerts",
      body: "Curated tables land in BigQuery / Synapse / Fabric for analytics consumers, with Power BI on top. KQL alert rules close the loop on freshness, lag, and failure.",
      stack: "BigQuery · Synapse · Microsoft Fabric · Power BI · KQL",
    },
  };

  function render(key) {
    const data = stageData[key];
    if (!data) return;
    stages.forEach((s) => s.classList.toggle("is-active", s.dataset.stage === key));
    archDetail.innerHTML =
      "<h4>" + data.title + "</h4>" +
      "<p>" + data.body + "</p>" +
      "<p class=\"arch-stack\">" + data.stack + "</p>";
  }

  stages.forEach((stage) => {
    const key = stage.dataset.stage;
    stage.addEventListener("mouseenter", () => render(key));
    stage.addEventListener("focus", () => render(key));
    stage.addEventListener("click", () => render(key));
    stage.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        render(key);
      }
    });
  });
})();


// === Quick wins: sticky nav state, reading progress, animated counters ===
(function () {
  const nav = document.getElementById("siteNav");
  const progressBar = document.getElementById("readingProgressBar");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset || 0;
    if (nav) {
      nav.classList.toggle("is-scrolled", y > 4);
    }
    if (progressBar) {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(100, Math.max(0, (y / max) * 100));
      progressBar.style.width = pct + "%";
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  }, { passive: true });
  onScroll();
})();

// Animated proof counters (uses existing data-count / data-suffix attrs)
(function () {
  const targets = document.querySelectorAll(".proof-value[data-count]");
  if (!targets.length) return;

  function animate(el) {
    if (el.dataset.counted === "1") return;
    el.dataset.counted = "1";
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    if (reducedMotion || !Number.isFinite(target)) {
      el.textContent = target + suffix;
      return;
    }
    const durationMs = 1100;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  targets.forEach((el) => io.observe(el));
})();


// === Round 2: orb parallax + filter chip counts ===
(function () {
  if (reducedMotion) return;
  if (window.matchMedia("(hover: none)").matches) return;
  const orbs = document.querySelectorAll(".orb");
  if (!orbs.length) return;

  const strength = 14; // max px shift
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  let rafId = null;

  function loop() {
    curX += (targetX - curX) * 0.08;
    curY += (targetY - curY) * 0.08;
    orbs.forEach((orb, idx) => {
      const dir = idx % 2 === 0 ? 1 : -1;
      orb.style.setProperty("--px", (curX * dir).toFixed(2) + "px");
      orb.style.setProperty("--py", (curY * dir).toFixed(2) + "px");
    });
    if (Math.abs(curX - targetX) > 0.1 || Math.abs(curY - targetY) > 0.1) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  }

  window.addEventListener("pointermove", (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    targetX = ((e.clientX / w) - 0.5) * 2 * strength;
    targetY = ((e.clientY / h) - 0.5) * 2 * strength;
    if (rafId === null) rafId = requestAnimationFrame(loop);
  }, { passive: true });
})();

(function () {
  const chips = document.querySelectorAll(".chip[data-filter]");
  if (!chips.length) return;
  const cards = document.querySelectorAll(".project-card");
  chips.forEach((chip) => {
    const filter = chip.dataset.filter || "all";
    let count = 0;
    cards.forEach((card) => {
      const tags = card.dataset.tags || "";
      if (filter === "all" || tags.includes(filter)) count += 1;
    });
    const badge = document.createElement("span");
    badge.className = "chip-count";
    badge.textContent = String(count);
    chip.appendChild(badge);
  });
})();


// === Round 4: FLIP animation on project filter ===
(function () {
  if (reducedMotion) return;
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  const chips = document.querySelectorAll(".chip[data-filter]");
  if (!chips.length) return;

  function runFlip() {
    const cards = Array.from(grid.querySelectorAll(".project-card"));
    const firstRects = new Map();
    cards.forEach((c) => {
      if (!c.classList.contains("hide")) {
        firstRects.set(c, c.getBoundingClientRect());
      }
    });

    requestAnimationFrame(() => {
      cards.forEach((c) => {
        if (c.classList.contains("hide")) return;
        const before = firstRects.get(c);
        const after = c.getBoundingClientRect();
        if (!before) {
          // Card was hidden, now appearing — fade + scale in
          c.animate(
            [
              { opacity: 0, transform: "scale(0.96)" },
              { opacity: 1, transform: "none" }
            ],
            { duration: 320, easing: "cubic-bezier(0.22,1,0.36,1)" }
          );
          return;
        }
        const dx = before.left - after.left;
        const dy = before.top - after.top;
        if (dx === 0 && dy === 0) return;
        c.classList.add("flipping");
        const anim = c.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: "translate(0, 0)" }
          ],
          { duration: 380, easing: "cubic-bezier(0.22,1,0.36,1)" }
        );
        anim.onfinish = () => c.classList.remove("flipping");
      });
    });
  }

  // Capture-phase listener fires BEFORE the existing bubble-phase chip handler
  // that toggles .hide — letting us measure positions first.
  chips.forEach((chip) => {
    chip.addEventListener("click", runFlip, true);
  });
})();


// === Round 5: theme toggle spin animation ===
(function () {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    btn.classList.remove("is-spinning");
    // force reflow to restart animation
    void btn.offsetWidth;
    btn.classList.add("is-spinning");
    setTimeout(() => btn.classList.remove("is-spinning"), 520);
  });
})();


// === Round 6: magnetic CTA, card spotlight, GitHub stars, to-top ring ===
(function () {
  // --- Magnetic primary CTA -----------------------------------------------
  if (!reducedMotion && !window.matchMedia("(hover: none)").matches) {
    const buttons = document.querySelectorAll(".btn-primary");
    const strength = 8;     // max px pull
    const radius = 90;      // distance at which effect saturates
    buttons.forEach((btn) => {
      let rect = null;
      const update = (e) => {
        if (!rect) rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.min(1, Math.hypot(dx, dy) / radius);
        const factor = (1 - dist) * strength;
        btn.style.transform = `translate(${(dx / radius) * factor}px, ${(dy / radius) * factor}px)`;
      };
      btn.addEventListener("pointerenter", () => { rect = btn.getBoundingClientRect(); });
      btn.addEventListener("pointermove", update);
      btn.addEventListener("pointerleave", () => {
        rect = null;
        btn.style.transform = "";
      });
    });
  }

  // --- Pointer spotlight on project cards ---------------------------------
  if (!window.matchMedia("(hover: none)").matches) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty("--mx", mx + "%");
        card.style.setProperty("--my", my + "%");
      });
    });
  }

  // --- GitHub stars badges (cached 24h) -----------------------------------
  (function fetchStars() {
    if (!("fetch" in window)) return;
    const cards = document.querySelectorAll(".project-card");
    if (!cards.length) return;
    const TTL_MS = 24 * 60 * 60 * 1000;

    cards.forEach((card) => {
      const link = card.querySelector('a[href*="github.com/"]');
      if (!link) return;
      const m = link.href.match(/github\.com\/([^/]+)\/([^/?#]+)/i);
      if (!m) return;
      const owner = m[1];
      const repo = m[2].replace(/\.git$/i, "");
      const cacheKey = "nr-stars:" + owner + "/" + repo;

      function render(count) {
        if (typeof count !== "number") return;
        if (link.querySelector(".repo-stars")) return;
        const span = document.createElement("span");
        span.className = "repo-stars";
        span.setAttribute("aria-label", count + " GitHub stars");
        span.textContent = "\u2605 " + count;
        link.appendChild(span);
      }

      // Try cache first
      try {
        const raw = localStorage.getItem(cacheKey);
        if (raw) {
          const obj = JSON.parse(raw);
          if (obj && Date.now() - obj.t < TTL_MS) {
            render(obj.n);
            return;
          }
        }
      } catch (e) { /* ignore */ }

      fetch("https://api.github.com/repos/" + owner + "/" + repo, {
        headers: { "Accept": "application/vnd.github+json" }
      })
        .then((r) => r.ok ? r.json() : null)
        .then((data) => {
          if (!data || typeof data.stargazers_count !== "number") return;
          const n = data.stargazers_count;
          try { localStorage.setItem(cacheKey, JSON.stringify({ n: n, t: Date.now() })); } catch (e) {}
          render(n);
        })
        .catch(() => { /* silent — rate limit / offline */ });
    });
  })();

  // --- Back-to-top scroll progress ring -----------------------------------
  (function () {
    const btn = document.getElementById("toTop");
    if (!btn) return;
    let ticking = false;
    function update() {
      const doc = document.documentElement;
      const y = window.scrollY || 0;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(100, Math.max(0, (y / max) * 100));
      btn.style.setProperty("--progress", pct + "%");
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();
})();


// === Round 7 (final): ripple, tilt, sparkline reveal ===
(function () {
  // --- Click ripple on primary CTAs ---------------------------------------
  if (!reducedMotion) {
    document.querySelectorAll(".btn-primary").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = (e.clientX || rect.left + rect.width / 2) - rect.left;
        const y = (e.clientY || rect.top + rect.height / 2) - rect.top;
        const ripple = document.createElement("span");
        ripple.className = "btn-ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });
  }

  // --- 3D tilt on project cards -------------------------------------------
  if (!reducedMotion && !window.matchMedia("(hover: none)").matches) {
    const MAX = 6; // max tilt degrees
    document.querySelectorAll(".project-card").forEach((card) => {
      let rect = null;
      card.addEventListener("pointerenter", () => {
        rect = card.getBoundingClientRect();
        card.classList.add("is-tilting");
      });
      card.addEventListener("pointermove", (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const tx = (px - 0.5) * 2 * MAX;     // rotateY
        const ty = -(py - 0.5) * 2 * MAX;    // rotateX (inverted)
        card.style.setProperty("--tx", tx.toFixed(2) + "deg");
        card.style.setProperty("--ty", ty.toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", () => {
        rect = null;
        card.classList.remove("is-tilting");
        card.style.removeProperty("--tx");
        card.style.removeProperty("--ty");
      });
    });
  }

  // --- Sparkline draw-in tied to proof-item visibility --------------------
  const proofItems = document.querySelectorAll(".proof-item .proof-spark");
  if (proofItems.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.closest(".proof-item").classList.add("spark-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });
    proofItems.forEach((spark) => io.observe(spark));
  } else {
    proofItems.forEach((spark) => spark.closest(".proof-item").classList.add("spark-in"));
  }
})();
