// Victoria Villa Guest House – redesign demo. No booking service is connected.
document.documentElement.classList.add("js");

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    toggle.focus();
  }
});

// Header shadow once the page scrolls
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Gentle reveal as sections come into view
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// Gallery lightbox
const buttons = [...document.querySelectorAll("#gallery-grid button")];
const box = document.getElementById("lightbox");
const boxImg = document.getElementById("lb-img");
const boxCap = document.getElementById("lb-caption");
let current = 0;
let opener = null;

function show(i) {
  current = (i + buttons.length) % buttons.length;
  const img = buttons[current].querySelector("img");
  boxImg.src = buttons[current].dataset.full;
  boxImg.alt = img.alt;
  boxCap.textContent = `${img.alt} (${current + 1} of ${buttons.length})`;
}

buttons.forEach((btn, i) => {
  btn.setAttribute("aria-label", `View larger: ${btn.querySelector("img").alt}`);
  btn.addEventListener("click", () => {
    opener = btn;
    show(i);
    if (typeof box.showModal === "function") {
      box.showModal();
    } else {
      window.open(btn.dataset.full, "_blank", "noopener");
    }
  });
});
box.querySelector(".lb-close").addEventListener("click", () => box.close());
box.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
box.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
box.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});
box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
// Return focus to the photo that opened the viewer (after the dialog's own focus handling).
box.addEventListener("close", () => opener && setTimeout(() => opener.focus(), 0));

// Booking request (demo): checks the form, then offers a prefilled email – nothing is sent from the page.
const form = document.getElementById("booking-form");
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const guestName = document.getElementById("guest-name");
const errorBox = document.getElementById("form-error");
const result = document.getElementById("form-result");
const mailto = document.getElementById("mailto-link");

// Guest counts match the ranges on the current website (adults 1–14, children 0–6).
for (let n = 1; n <= 14; n++) adults.add(new Option(String(n), String(n), n === 2, n === 2));
for (let n = 0; n <= 6; n++) children.add(new Option(String(n), String(n)));

const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const today = iso(new Date());
checkin.min = today;
checkout.min = today;
checkin.addEventListener("change", () => {
  if (checkin.value) {
    const next = new Date(checkin.value + "T00:00");
    next.setDate(next.getDate() + 1);
    checkout.min = iso(next);
    if (checkout.value && checkout.value <= checkin.value) checkout.value = "";
  }
});

const pretty = (v) => new Date(v + "T00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const problems = [];
  [checkin, checkout, guestName].forEach((el) => el.removeAttribute("aria-invalid"));
  if (!checkin.value) { problems.push("a check-in date"); checkin.setAttribute("aria-invalid", "true"); }
  if (!checkout.value || (checkin.value && checkout.value <= checkin.value)) {
    problems.push("a check-out date after check-in"); checkout.setAttribute("aria-invalid", "true");
  }
  if (!guestName.value.trim()) { problems.push("your name"); guestName.setAttribute("aria-invalid", "true"); }

  if (problems.length) {
    errorBox.textContent = `Please add ${problems.join(", ")}.`;
    errorBox.hidden = false;
    result.hidden = true;
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  errorBox.hidden = true;
  const subject = `Stay enquiry: ${pretty(checkin.value)} – ${pretty(checkout.value)}`;
  const body = [
    "Hello Victoria Villa,",
    "",
    "I would like to check availability for:",
    `Check-in: ${pretty(checkin.value)}`,
    `Check-out: ${pretty(checkout.value)}`,
    `Adults: ${adults.value}`,
    `Children: ${children.value}`,
    "",
    "Thank you,",
    guestName.value.trim(),
  ].join("\n");
  mailto.href = `mailto:salvador@victoriavillaguesthousegoa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  result.hidden = false;
  result.focus();
});

document.getElementById("year").textContent = new Date().getFullYear();
