/* ==========================================================================
   CT Movers — main.js
   Small, dependency-free. Handles: mobile nav, header shadow, photo
   placeholders, scroll-reveal, the quote form, and the footer year.
   ========================================================================== */

/* ---------- SETTINGS ----------
   FORM_ENDPOINT: paste a Formspree (or similar) endpoint here to get form
   submissions in your inbox, e.g. "https://formspree.io/f/abcdwxyz".
   Leave it empty and the form falls back to opening the visitor's email app
   with everything pre-filled, addressed to FALLBACK_EMAIL.
*/
const FORM_ENDPOINT = "";
const FALLBACK_EMAIL = "hello@example.com"; // EDIT ME: same email as in the contact section

document.documentElement.classList.remove("no-js");

/* ---------- Mobile nav ---------- */
(function nav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    if (!e.target.closest(".nav")) setOpen(false);
  });
})();

/* ---------- Header shadow once you scroll ---------- */
(function headerShadow() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
})();

/* ---------- Photo slots: show a tidy placeholder when the image is missing ---------- */
(function photoSlots() {
  document.querySelectorAll(".photo-slot").forEach((slot) => {
    const img = slot.querySelector("img");
    if (!img) { slot.classList.add("is-empty"); return; }
    const markEmpty = () => slot.classList.add("is-empty");
    const markFilled = () => slot.classList.remove("is-empty");

    if (img.complete) {
      img.naturalWidth === 0 ? markEmpty() : markFilled();
    } else {
      // Assume empty until it proves otherwise, so there's no flash of broken image.
      markEmpty();
      img.addEventListener("load", markFilled, { once: true });
      img.addEventListener("error", markEmpty, { once: true });
    }
  });
})();

/* ---------- Scroll reveal ---------- */
(function reveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
  items.forEach((el) => io.observe(el));
})();

/* ---------- Quote form ---------- */
(function quoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;
  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector(".btn-label");

  const say = (msg, kind) => {
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  };

  const validate = () => {
    let ok = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const empty = !field.value || !field.value.trim();
      field.classList.toggle("is-invalid", empty);
      if (empty && ok) { field.focus(); ok = false; }
    });
    return ok;
  };

  form.querySelectorAll("[required]").forEach((f) =>
    f.addEventListener("input", () => f.classList.remove("is-invalid"))
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot: bots fill hidden fields, people don't.
    if (form.elements.website && form.elements.website.value) {
      say("Thanks! We'll be in touch.", "ok");
      form.reset();
      return;
    }

    if (!validate()) { say("Fill in your name, phone, and the job type and we're good.", "err"); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    delete data.website;

    // No endpoint set → open the visitor's email app with a pre-filled message.
    if (!FORM_ENDPOINT) {
      const subject = `Quote request: ${data.job_type} — ${data.name}`;
      const body = [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Job: ${data.job_type}`,
        `When: ${data.when || "(not given)"}`,
        "",
        "Details:",
        data.details || "(none)",
      ].join("\n");
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      say("Opening your email app. Hit send and we'll text you back.", "ok");
      return;
    }

    button.disabled = true;
    label.textContent = "Sending…";
    say("", "");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _subject: `Quote request: ${data.job_type} — ${data.name}` }),
      });
      if (!res.ok) throw new Error("Bad response");
      form.reset();
      say("Got it. We'll text you back soon.", "ok");
    } catch (err) {
      say("Something went wrong. Just text us instead and we'll sort it out.", "err");
    } finally {
      button.disabled = false;
      label.textContent = "Send it";
    }
  });
})();

/* ---------- Footer year ---------- */
(function year() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
})();
