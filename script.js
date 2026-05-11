const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const filterButtons = document.querySelectorAll(".chip");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.getElementById("emptyState");
const revealItems = document.querySelectorAll(".reveal");
const metricValues = document.querySelectorAll(".metric-value");
const toTopButton = document.getElementById("toTop");
const shuffleHighlights = document.getElementById("shuffleHighlights");
const metricsSection = document.getElementById("metrics");
const metricsStory = document.getElementById("metricsStory");

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

const metricObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.35 }
);

metricValues.forEach((metric) => metricObserver.observe(metric));

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
  const metricCards = Array.from(document.querySelectorAll(".metric-card"));
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
    metricCards.forEach((metricCard, idx) => {
      metricCard.classList.toggle("active-metric", idx === index);
      metricCard.classList.remove("flash");

      if (idx === index) {
        // Force reflow so repeated highlights retrigger the animation.
        void metricCard.offsetWidth;
        metricCard.classList.add("flash");
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
    activeMetricIndex = (activeMetricIndex + 1) % metricCards.length;
    highlightMetric(activeMetricIndex);
    shuffleHighlights.textContent = `Impact Tour (${activeMetricIndex + 1}/4)`;

    if (activeMetricIndex === metricCards.length - 1) {
      // Stop automatically after one full walkthrough.
      setTimeout(() => {
        stopTour(false);
      }, tourStepDelayMs);
    }
  }

  shuffleHighlights.addEventListener("click", () => {
    if (tourTimerId) {
      return;
    }

    if (metricsSection) {
      metricsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    activeMetricIndex = -1;
    shuffleHighlights.disabled = true;
    runTourStep();

    tourTimerId = setInterval(() => {
      if (activeMetricIndex >= metricCards.length - 1) {
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

function trackClickEvent(eventKey) {
  if (!eventKey) {
    return;
  }

  const namespace = "nishanthrajkumar-portfolio";
  const endpoint = `https://api.countapi.xyz/hit/${namespace}/${encodeURIComponent(eventKey)}`;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint);
    return;
  }

  fetch(endpoint, { method: "GET", mode: "no-cors", keepalive: true }).catch(() => {
    // Ignore analytics failures to keep UX uninterrupted.
  });
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
