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
