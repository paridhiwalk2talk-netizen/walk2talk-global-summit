/* =========================================================
   Walk2Talk Global Healthcare Summit 2026 — Static Scripts
   ========================================================= */

/* -------------------------------------------------------------------
   GOOGLE SHEET CONFIG — paste your Apps Script Web App URL below.
   Setup (5 min, no backend, no npm):
   1. Create a Google Sheet. First row headers:
      Timestamp | Name | Designation | Company | Email | Phone | Country | Selected Pass | Message
   2. Extensions -> Apps Script, paste:

      function doPost(e) {
        var s = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
        var d = JSON.parse(e.postData.contents);
        s.appendRow([d.timestamp, d.fullName, d.designation, d.organization,
                     d.email, d.contactNumber, d.country, d.pass, d.message]);
        return ContentService.createTextOutput(JSON.stringify({ok:true}))
          .setMimeType(ContentService.MimeType.JSON);
      }

   3. Deploy -> New deployment -> Web app -> Execute as: Me,
      Who has access: Anyone. Copy the /exec URL and paste it below.
------------------------------------------------------------------- */
const GOOGLE_SHEET_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";


/* ==================== Data ==================== */

const TOPICS = [
  "The future of healthcare delivery and health systems",
  "AI and digital transformation across the care continuum",
  "Workforce resilience and the healthcare talent challenge",
  "Patient-centered and value-based care models",
  "Telemedicine, remote care and connected health",
  "Responsible innovation and emerging medical technology",
  "Leadership strategies for navigating change",
  "Building accessible, equitable and sustainable systems",
];

const AGENDA = [
  { time: "5:00 – 5:10 PM", title: "Welcome Address by Walk2Talk Media" },
  { time: "5:10 – 5:20 PM", title: "Opening Keynote — The Future of Healthcare 2030: Policy, Innovation & System Transformation",
    brief: "How policy, innovation and strategic leadership can work together to create more accessible, resilient and sustainable healthcare systems — and prepare organizations and nations for the opportunities of 2030." },
  { time: "5:20 – 5:40 PM", title: "In Conversation — From Vision to Impact: Leading Change in Healthcare",
    brief: "How healthcare leaders are turning strategic vision into measurable impact through innovation, collaboration and patient-centered care.",
    speaker: "Dr. Walid Achi, Chief Medical Officer, Emirates Hospitals Group" },
  { time: "5:45 – 6:20 PM", title: "Panel Discussion — AI, Digital Health & the Future of Patient Care",
    brief: "How organizations can leverage innovation responsibly to enhance patient experiences, improve clinical outcomes and build more connected, data-driven healthcare systems." },
  { time: "6:25 – 6:35 PM", title: "Special Guest — Building Sustainable & Resilient Healthcare Systems",
    brief: "The policies, investments and collaborative efforts required to create healthcare systems that can meet the evolving needs of populations in the years ahead." },
  { time: "6:40 – 7:00 PM", title: "Fireside Chat — What Healthcare Leaders Must Prioritize by 2030",
    brief: "The key priorities healthcare organizations should focus on to drive innovation, strengthen resilience, improve patient outcomes and build sustainable healthcare systems for 2030 and beyond." },
  { time: "7:00 – 7:15 PM", title: "Closing Keynote — Building Tomorrow's Healthcare, Today",
    brief: "How collaboration, innovation and leadership can help create sustainable, technology-enabled and human-centered healthcare systems for generations to come." },
  { time: "7:30 PM", title: "Closing Address" },
];

const WHY = [
  { title: "Executive Networking", body: "Convene with hospital CEOs, ministers, investors and technology leaders shaping global healthcare.",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="4"/><path d="M17 11a3 3 0 1 0 0-6"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>` },
  { title: "Leadership Insight", body: "Candid dialogue on how executives are navigating change, cost pressure and organizational transformation.",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16 8 10 10 8 16 14 14 16 8"/></svg>` },
  { title: "Frontier Innovation", body: "First-hand perspectives on the technologies and care models redefining the next decade.",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l1.9 4.9L19 8l-4 3.5L16.2 17 12 14.5 7.8 17 9 11.5 5 8l5.1-1.1z"/></svg>` },
  { title: "AI in Practice", body: "Move beyond hype: how AI is being deployed responsibly across diagnostics, workflow and patient experience.",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>` },
  { title: "Policy & Systems", body: "Understand the regulation, financing and public-private collaboration required for resilient systems.",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h18M6 18V10M10 18V10M14 18V10M18 18V10M2 10l10-7 10 7"/></svg>` },
  { title: "Future of Healthcare", body: "A deliberate 2030 horizon — close enough to act on, far enough to demand real strategic thinking.",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>` },
];

const WHO = [
  ["Hospital & Health System CEOs", "Chief Medical Officers", "Chief Nursing Officers", "Chief Information / Digital Officers"],
  ["Ministers & Government Policymakers", "Regulators & Public Health Leaders", "Payers & Insurance Executives", "Investors & Healthcare Funds"],
  ["Pharma & Life Sciences Executives", "MedTech & Digital Health Founders", "AI & Data Science Leaders", "Academic & Research Institutions"],
];

const FAQS = [
  { q: "When and where is the summit taking place?",
    a: "The Walk2Talk Global Healthcare Summit 2026 is a half-day virtual event on 27 August 2026. All sessions run in Indian Standard Time (IST, GMT+5:30) and are accessible from anywhere in the world." },
  { q: "Is there a fee to attend?",
    a: "Registration is by application for qualifying executives, policymakers, clinicians, investors and industry leaders. Confirmed delegates receive their access credentials by email in advance of the summit." },
  { q: "Will sessions be recorded?",
    a: "Registered delegates receive on-demand access to session recordings after the live event, subject to speaker permissions." },
  { q: "How can my organization become a partner?",
    a: "Walk2Talk Media offers a limited number of curated partnership opportunities across knowledge, technology and industry categories. Reach out via the partnership form or email partnerships@walk2talkmedia.com." },
  { q: "How are speakers selected?",
    a: "Speakers are invited based on their leadership role in shaping global healthcare — spanning health systems, government, industry, technology and research — with a focus on candid, senior-level dialogue." },
];

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
  "Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
  "Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
  "Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
  "Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast",
  "Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
  "Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
  "Oman",
  "Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar",
  "Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone",
  "Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain",
  "Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Vatican City","Venezuela","Vietnam",
  "Yemen",
  "Zambia","Zimbabwe",
];

/* ==================== Utilities ==================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ==================== Render dynamic sections ==================== */

function renderTopics() {
  $("#topics-grid").innerHTML = TOPICS.map((t, i) => `
    <div class="topic reveal" style="transition-delay:${(i % 4) * 60}ms">
      <span class="topic__bullet"></span>
      <span class="topic__text">${esc(t)}</span>
    </div>`).join("");
}

function renderAgenda() {
  $("#agenda-list").innerHTML = AGENDA.map((it, i) => {
    const hasContent = Boolean(it.brief);
    return `
      <div class="agenda__row reveal${hasContent ? " has-content" : ""}" data-index="${i}">
        <button type="button" class="agenda__btn" aria-expanded="false" aria-controls="agenda-panel-${i}"${hasContent ? "" : " tabindex=\"-1\""}>
          <div class="agenda__meta">
            <span class="agenda__time">${esc(it.time)}</span>
            <span class="agenda__title">${esc(it.title)}</span>
          </div>
          ${hasContent ? `<span class="agenda__toggle" aria-hidden="true"></span>` : ""}
        </button>
        ${hasContent ? `
          <div class="agenda__panel" id="agenda-panel-${i}">
            <div class="agenda__inner">
              <p class="agenda__brief">${esc(it.brief)}</p>
              ${it.speaker ? `<p class="agenda__speaker">Speaker: <span>${esc(it.speaker)}</span></p>` : ""}
            </div>
          </div>` : ""}
      </div>`;
  }).join("");

  $$(".agenda__row.has-content").forEach((row) => {
    const btn = $(".agenda__btn", row);
    const panel = $(".agenda__panel", row);
    btn.addEventListener("click", () => {
      const open = row.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    });
  });
}

function renderWhy() {
  $("#why-grid").innerHTML = WHY.map((w, i) => `
    <article class="why__card reveal" style="transition-delay:${(i % 3) * 60}ms">
      <div class="why__icon">${w.icon}</div>
      <h3>${esc(w.title)}</h3>
      <p>${esc(w.body)}</p>
    </article>`).join("");
}

function renderWho() {
  $("#who-grid").innerHTML = WHO.map((col, ci) => `
    <ul class="who__col reveal" style="transition-delay:${ci * 80}ms">
      ${col.map((item) => `<li>${esc(item)}</li>`).join("")}
    </ul>`).join("");
}

function renderFaq() {
  $("#faq-list").innerHTML = FAQS.map((f, i) => `
    <div class="faq__row reveal" data-index="${i}">
      <button type="button" class="faq__btn" aria-expanded="false" aria-controls="faq-panel-${i}">
        <span class="faq__q">${esc(f.q)}</span>
        <span class="faq__toggle" aria-hidden="true"></span>
      </button>
      <div class="faq__panel" id="faq-panel-${i}"><p class="faq__answer">${esc(f.a)}</p></div>
    </div>`).join("");

  $$(".faq__row").forEach((row) => {
    const btn = $(".faq__btn", row);
    const panel = $(".faq__panel", row);
    btn.addEventListener("click", () => {
      const open = row.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    });
  });
}

function renderOrbitNodes() {
  const g = $("#orbit-nodes");
  if (!g) return;
  const nodes = [
    { a: 0, r: 230, c: "#C9A040" }, { a: 55, r: 230, c: "#00A6A6" },
    { a: 130, r: 230, c: "#0B2545" }, { a: 210, r: 230, c: "#00A6A6" },
    { a: 300, r: 230, c: "#C9A040" }, { a: 30, r: 180, c: "#0B2545" },
    { a: 160, r: 180, c: "#C9A040" }, { a: 260, r: 180, c: "#00A6A6" },
  ];
  g.innerHTML = nodes.map((n, i) => {
    const rad = (n.a * Math.PI) / 180;
    const x = 260 + n.r * Math.cos(rad);
    const y = 260 + n.r * Math.sin(rad);
    return `<g>
      <line x1="260" y1="260" x2="${x}" y2="${y}" stroke="#E5EAF0" stroke-width=".75"/>
      <circle cx="${x}" cy="${y}" r="6" fill="${n.c}" class="pulse-node" style="animation-delay:${i * 0.35}s"/>
    </g>`;
  }).join("");
}

/* ==================== Nav ==================== */

function initNav() {
  const nav = $("#site-nav");
  const toggle = $("#nav-toggle");
  const mobile = $("#nav-mobile");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = mobile.hasAttribute("hidden") ? true : false;
    if (open) { mobile.removeAttribute("hidden"); } else { mobile.setAttribute("hidden", ""); }
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#nav-mobile a").forEach((a) => a.addEventListener("click", () => {
    mobile.setAttribute("hidden", ""); toggle.setAttribute("aria-expanded", "false");
  }));
}

/* ==================== Countdown ==================== */

function initCountdown() {
  const target = Date.UTC(2026, 7, 27, 11, 30, 0); // 27 Aug 2026 5:00 PM IST
  const el = { days: $('[data-unit="days"]'), hours: $('[data-unit="hours"]'), mins: $('[data-unit="mins"]'), secs: $('[data-unit="secs"]') };
  const pad = (v) => String(v).padStart(2, "0");
  const tick = () => {
    const diff = Math.max(0, target - Date.now());
    el.days.textContent  = pad(Math.floor(diff / 86400000));
    el.hours.textContent = pad(Math.floor((diff / 3600000) % 24));
    el.mins.textContent  = pad(Math.floor((diff / 60000) % 60));
    el.secs.textContent  = pad(Math.floor((diff / 1000) % 60));
  };
  tick();
  setInterval(tick, 1000);
}

/* ==================== Reveal on scroll ==================== */

function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
  els.forEach((el) => io.observe(el));
}

/* ==================== Register Modal ==================== */

let modalOpen = false;
let prevBodyOverflow = "";

function openModal() {
  const modal = $("#register-modal");
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  modalOpen = true;
  prevBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  setTimeout(() => $("#reg-fullName")?.focus(), 60);
}
function closeModal() {
  if (!modalOpen) return;
  const submitBtn = $("#submit-btn");
  if (submitBtn?.disabled) return; // don't close mid-submit
  const modal = $("#register-modal");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  modalOpen = false;
  document.body.style.overflow = prevBodyOverflow;
}

function initModal() {
  $$(".js-open-register").forEach((b) => b.addEventListener("click", openModal));
  $$("#register-modal [data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  initCountry();
  initForm();
}

/* ---- Country combobox ---- */

function initCountry() {
  const wrap = $("#country-select");
  const btn = $("#country-btn");
  const pop = $("#country-pop");
  const list = $("#country-list");
  const search = $("#country-search");
  const value = $("#country-value");
  const hidden = $("#reg-country");
  let current = "";

  const renderList = (q = "") => {
    const filter = q.trim().toLowerCase();
    const items = filter ? COUNTRIES.filter((c) => c.toLowerCase().includes(filter)) : COUNTRIES;
    list.innerHTML = items.length
      ? items.map((c) => `<li><button type="button" data-c="${esc(c)}" class="${c === current ? "is-selected" : ""}">${esc(c)}</button></li>`).join("")
      : `<li class="country__empty">No matches</li>`;
  };

  const setOpen = (open) => {
    wrap.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    if (open) {
      pop.removeAttribute("hidden");
      renderList("");
      search.value = "";
      setTimeout(() => search.focus(), 30);
    } else {
      pop.setAttribute("hidden", "");
    }
  };

  btn.addEventListener("click", () => setOpen(wrap.classList.contains("is-open") ? false : true));
  document.addEventListener("mousedown", (e) => {
    if (!wrap.contains(e.target)) setOpen(false);
  });
  search.addEventListener("input", (e) => renderList(e.target.value));
  list.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-c]");
    if (!b) return;
    current = b.dataset.c;
    value.textContent = current;
    hidden.value = current;
    wrap.classList.add("has-value");
    wrap.classList.remove("is-invalid");
    $(`.err[data-err-for="country"]`).textContent = "";
    setOpen(false);
  });
}

/* ---- Form validation + submit ---- */

function validate(f) {
  const err = {};
  if (!f.fullName || f.fullName.trim().length < 2) err.fullName = "Please enter your full name.";
  if (!f.designation.trim()) err.designation = "Designation is required.";
  if (!f.organization.trim()) err.organization = "Organization is required.";
  if (!f.email.trim()) err.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) err.email = "Enter a valid email address.";
  if (!f.contactNumber.trim()) err.contactNumber = "Contact number is required.";
  else if (!/^[+()\-\s\d]{6,30}$/.test(f.contactNumber.trim())) err.contactNumber = "Enter a valid international phone number.";
  if (!f.country.trim()) err.country = "Please select your country.";
  if (!f.pass || !f.pass.trim()) err.pass = "Please select a pass.";
  return err;
}


function initForm() {
  const form = $("#register-form");
  const submitBtn = $("#submit-btn");
  const formError = $("#form-error");

  const sheetReady = GOOGLE_SHEET_URL && !GOOGLE_SHEET_URL.startsWith("YOUR_");


  form.addEventListener("input", (e) => {
    const t = e.target;
    if (!t.name) return;
    t.classList.remove("is-invalid");
    const errEl = $(`.err[data-err-for="${t.name}"]`);
    if (errEl) errEl.textContent = "";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    formError.hidden = true;
    formError.textContent = "";

    const data = {
      fullName: $("#reg-fullName").value,
      designation: $("#reg-designation").value,
      organization: $("#reg-organization").value,
      email: $("#reg-email").value,
      contactNumber: $("#reg-contact").value,
      country: $("#reg-country").value,
      pass: $("#reg-pass").value,
      message: $("#reg-message").value,
    };
    const errs = validate(data);
    // paint errors
    ["fullName","designation","organization","email","contactNumber","country","pass"].forEach((k) => {
      const errEl = $(`.err[data-err-for="${k}"]`);
      if (errEl) errEl.textContent = errs[k] || "";
      const inputId = ({
        fullName: "reg-fullName", designation: "reg-designation", organization: "reg-organization",
        email: "reg-email", contactNumber: "reg-contact", pass: "reg-pass",
      })[k];
      if (inputId) $("#" + inputId)?.classList.toggle("is-invalid", !!errs[k]);
      if (k === "country") $("#country-select").classList.toggle("is-invalid", !!errs[k]);
    });
    if (Object.keys(errs).length) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    try {
      if (!sheetReady) {
        throw new Error("Google Sheet is not configured. Open js/script.js and set GOOGLE_SHEET_URL to your Apps Script Web App URL.");
      }
      const payload = {
        timestamp: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: false }) + " IST",
        fullName: data.fullName.trim(),
        designation: data.designation.trim(),
        organization: data.organization.trim(),
        email: data.email.trim(),
        contactNumber: data.contactNumber.trim(),
        country: data.country,
        pass: data.pass,
        message: (data.message || "").trim() || "—",
      };
      // text/plain keeps the request "simple" so the browser skips the CORS preflight
      // that Apps Script cannot answer; no-cors makes the opaque response acceptable.
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      form.reset();
      $("#country-value").textContent = "Select country";
      $("#reg-country").value = "";
      $("#country-select").classList.remove("has-value");
      showSuccess();
    } catch (err) {
      console.error(err);
      formError.hidden = false;
      formError.textContent = (err && err.message)
        ? err.message
        : "Something went wrong. Please try again or contact us at contact@walk2talkmedia.com.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Register Now";
    }
  });
}


function showSuccess() {
  const body = $("#modal-body");
  const original = body.innerHTML;
  body.innerHTML = `
    <div class="success">
      <div class="success__badge">✓</div>
      <h3>Registration submitted successfully.</h3>
      <span class="gold-rule gold-rule--center"></span>
      <p>Thank you for registering for the Walk2Talk Global Healthcare Summit 2026. Our team has received your registration and will contact you shortly with further details.</p>
      <button type="button" class="btn btn--primary" id="success-close">Close</button>
    </div>`;
  $("#success-close").addEventListener("click", () => {
    closeModal();
    // Restore a fresh form for the next visitor — no page reload needed
    setTimeout(() => { body.innerHTML = original; initCountry(); initForm(); }, 350);
  });
}


/* ==================== Boot ==================== */

document.addEventListener("DOMContentLoaded", () => {
  $("#footer-year").textContent = new Date().getFullYear();
  renderTopics();
  renderAgenda();
  renderWhy();
  renderWho();
  renderFaq();
  renderOrbitNodes();
  initNav();
  initCountdown();
  initReveal();
  initModal();
});
