// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Theme toggle (persisted) =====
(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", theme);
})();

document.getElementById("themeToggle").addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ===== Sticky navbar shadow on scroll =====
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 10);
  backToTop.classList.toggle("visible", y > 400);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

// Close menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Back to top =====
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Scroll reveal + animated skill bars =====
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("visible");

      // Animate skill bar if this element is a skill
      if (el.classList.contains("skill")) {
        const level = el.getAttribute("data-level");
        const fill = el.querySelector(".skill-fill");
        if (fill && level) fill.style.width = level + "%";
      }
      observer.unobserve(el);
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

// ===== Contact form (client-side validation + feedback) =====
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailValid || !message) {
    status.style.color = "#d93025";
    status.textContent = "Please fill in all fields with a valid email.";
    return;
  }

  status.style.color = "";
  status.textContent = "Thanks, " + name + "! Your message has been sent.";
  form.reset();
});
