/* =============================================================================
   APP.JS  —  the site engine.  You normally do NOT need to edit this file.
   (Interface labels for the two languages are at the top, in case you want to
   rename a menu item.)
   ========================================================================== */

/* ---- Interface labels (menus, filters, buttons) ------------------------- */
const UI = {
  nav:     { work: { da: "Projekter", en: "Work" },
             info: { da: "Info",      en: "Info" },
             blog: { da: "Blog",      en: "Blog" } },
  filters: { all:          { da: "Alle",         en: "All" },
             architecture: { da: "Arkitektur",   en: "Architecture" },
             plaster:      { da: "Gips",         en: "Plaster" },
             furniture:    { da: "Møbler",       en: "Furniture" } },
  labels:  { about:   { da: "Om",       en: "About" },
             cv:      { da: "CV",       en: "CV" },
             contact: { da: "Kontakt",  en: "Contact" },
             back:    { da: "← Tilbage", en: "← Back" } }
};

const FILTER_ORDER = ["all", "architecture", "plaster", "furniture"];

/* ---- State --------------------------------------------------------------- */
let LANG = (function () {
  try { return localStorage.getItem("lang") || "da"; } catch (e) { return "da"; }
})();
let FILTER = "all";

function setLang(l) {
  LANG = l;
  try { localStorage.setItem("lang", l); } catch (e) {}
  document.documentElement.lang = l;
  render();
}
const t = (obj) => (obj && (obj[LANG] ?? obj.en ?? obj.da)) || "";

/* ---- Helpers ------------------------------------------------------------- */
const el = (id) => document.getElementById(id);
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function paras(text) {
  return String(text).split(/\n\n+/).map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("");
}
function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  const loc = LANG === "da" ? "da-DK" : "en-GB";
  return d.toLocaleDateString(loc, { year: "numeric", month: "long", day: "numeric" });
}

/* ---- Header -------------------------------------------------------------- */
function renderHeader(view) {
  el("site-name").textContent = CONTENT.siteName;

  // Projects nav item = a fold-down list of project titles linking to each project
  const projLinks = CONTENT.projects.map((p) =>
    `<a href="#/p/${encodeURIComponent(p.slug)}">${esc(t(p.title))}</a>`).join("");
  const cls = (on) => on ? " active" : "";
  el("nav-links").innerHTML = `
    <span class="navitem" id="proj-nav">
      <a href="#/work" class="navlink${cls(view === "work" || view === "project")}" data-proj-toggle>${esc(t(UI.nav.work))}</a>
      <div class="dropdown">${projLinks}</div>
    </span>
    <a href="#/info" class="navlink${cls(view === "info")}">${esc(t(UI.nav.info))}</a>
    <a href="#/blog" class="navlink${cls(view === "blog" || view === "post")}">${esc(t(UI.nav.blog))}</a>`;

  const pn = document.getElementById("proj-nav");
  pn.querySelector("[data-proj-toggle]").addEventListener("click", (e) => {
    e.preventDefault();
    pn.classList.toggle("open");
  });

  el("lang-toggle").innerHTML =
    ["da", "en"].map((l) =>
      `<button data-lang="${l}" class="${l === LANG ? "on" : ""}">${l.toUpperCase()}</button>`
    ).join("<span class='sep'>/</span>");
  el("lang-toggle").querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang)));
}

/* ---- Work (projects grid + filters) ------------------------------------- */
// Fixed "random" order: a seeded shuffle, so the arrangement is scrambled
// but identical on every visit/refresh. Change SHUFFLE_SEED to reshuffle.
const SHUFFLE_SEED = 20260816;
function shuffle(arr) {
  const a = arr.slice();
  let s = SHUFFLE_SEED >>> 0;
  const rnd = () => {
    s = (s + 0x6D2B79F5) | 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function hoverTip() {
  let tip = document.getElementById("hovertip");
  if (!tip) { tip = document.createElement("div"); tip.id = "hovertip"; document.body.appendChild(tip); }
  return tip;
}
function renderWork() {
  const filters = FILTER_ORDER.map((f) =>
    `<button data-filter="${f}" class="${f === FILTER ? "on" : ""}">${esc(t(UI.filters[f]))}</button>`
  ).join("");

  // projects in random order; show EVERY image of each (filtered) project
  const projs = shuffle(CONTENT.projects.filter((p) => FILTER === "all" || p.category === FILTER));
  const tiles = projs
    .flatMap((p) => p.images.map((im) => `
      <a class="tile" href="#/p/${encodeURIComponent(p.slug)}" data-title="${esc(t(p.title))}">
        <span class="tile-imgwrap"><img loading="lazy" src="assets/img/${esc(im.src)}-thumb.jpg" alt="${esc(t(p.title))}"></span>
      </a>`)).join("");

  el("view").innerHTML = `
    <div class="filterbar">${filters}</div>
    <div class="grid">${tiles || `<p class="empty">—</p>`}</div>`;

  el("view").querySelectorAll(".filterbar button").forEach((b) =>
    b.addEventListener("click", () => { FILTER = b.dataset.filter; renderWork(); }));

  // the project title follows the cursor while hovering an image
  const tip = hoverTip();
  tip.classList.remove("show");
  el("view").querySelectorAll(".tile").forEach((tile) => {
    tile.addEventListener("mouseenter", () => { tip.textContent = tile.dataset.title; tip.classList.add("show"); });
    tile.addEventListener("mousemove", (e) => { tip.style.left = e.clientX + "px"; tip.style.top = e.clientY + "px"; });
    tile.addEventListener("mouseleave", () => { tip.classList.remove("show"); });
  });
}

/* ---- Project detail ------------------------------------------------------ */
function renderProject(slug) {
  const p = CONTENT.projects.find((x) => x.slug === slug);
  if (!p) { location.hash = "#/work"; return; }
  const imgs = p.images.map((im) => `
    <figure class="shot">
      <img loading="lazy" src="assets/img/${esc(im.src)}-full.jpg"
           alt="${esc(t(im.caption))}" data-full="assets/img/${esc(im.src)}-full.jpg">
      ${t(im.caption) ? `<figcaption>${esc(t(im.caption))}</figcaption>` : ""}
    </figure>`).join("");

  el("view").innerHTML = `
    <article class="project">
      <a class="back" href="#/work">${esc(t(UI.labels.back))}</a>
      <header class="project-head">
        <h1>${esc(t(p.title))}</h1>
        <p class="project-meta">${esc([t(p.meta), t(UI.filters[p.category])].filter(Boolean).join(" · "))}</p>
      </header>
      <div class="project-body">${paras(t(p.body))}</div>
      <div class="shots">${imgs}</div>
    </article>`;

  el("view").querySelectorAll(".shot img").forEach((img) =>
    img.addEventListener("click", () => openLightbox(img.dataset.full)));
}

/* ---- Blog (list of links) ------------------------------------------------ */
function renderBlog() {
  const items = CONTENT.posts.map((post) => `
    <a class="post-link" href="#/b/${encodeURIComponent(post.slug)}">
      <span class="post-link-title">${esc(t(post.title))}</span>
      <span class="post-link-date">${esc(fmtDate(post.date))}</span>
    </a>`).join("");
  el("view").innerHTML = `<div class="blog-list">${items || `<p class="empty">—</p>`}</div>`;
}

/* ---- Single blog post ---------------------------------------------------- */
function renderPost(slug) {
  const post = CONTENT.posts.find((x) => x.slug === slug);
  if (!post) { location.hash = "#/blog"; return; }
  el("view").innerHTML = `
    <article class="post single">
      <a class="back" href="#/blog">${esc(t(UI.labels.back))}</a>
      <div class="post-date">${esc(fmtDate(post.date))}</div>
      <h1 class="post-title">${esc(t(post.title))}</h1>
      <div class="post-body">${paras(t(post.body))}</div>
    </article>`;
}

/* ---- Info (about / cv / contact) ---------------------------------------- */
function renderInfo() {
  const info = CONTENT.info;
  const cv = info.cv.map((e) => `
    <li><span class="cv-period">${esc(e.period)}</span>
        <span class="cv-role">${esc(t(e.title))}</span>
        <span class="cv-place">${esc(t(e.place))}</span></li>`).join("");
  const contact = info.contact.map((c) =>
    `<li><span class="c-label">${esc(c.label)}</span>${
      c.href ? `<a href="${esc(c.href)}">${esc(c.value)}</a>` : `<span>${esc(c.value)}</span>`
    }</li>`).join("");

  el("view").innerHTML = `
    <div class="info">
      <section class="info-about">
        <h2>${esc(t(UI.labels.about))}</h2>
        ${paras(t(info.about))}
      </section>
      <section class="info-cv">
        <h2>${esc(t(UI.labels.cv))}</h2>
        <ul class="cv-list">${cv}</ul>
      </section>
      <section class="info-contact">
        <h2>${esc(t(UI.labels.contact))}</h2>
        <ul class="contact-list">${contact}</ul>
      </section>
    </div>`;
}

/* ---- Lightbox ------------------------------------------------------------ */
function openLightbox(src) {
  const lb = el("lightbox");
  lb.querySelector("img").src = src;
  lb.classList.add("open");
}
function closeLightbox() { el("lightbox").classList.remove("open"); }

/* ---- Router -------------------------------------------------------------- */
function currentView() {
  const h = location.hash.replace(/^#\/?/, "");
  if (h.startsWith("p/")) return { view: "project", slug: decodeURIComponent(h.slice(2)) };
  if (h.startsWith("b/")) return { view: "post", slug: decodeURIComponent(h.slice(2)) };
  if (h === "info") return { view: "info" };
  if (h === "blog") return { view: "blog" };
  return { view: "work" };
}
function render() {
  const r = currentView();
  const tp = document.getElementById("hovertip");
  if (tp) tp.classList.remove("show");
  renderHeader(r.view);
  if (r.view === "project") renderProject(r.slug);
  else if (r.view === "post") renderPost(r.slug);
  else if (r.view === "info") renderInfo();
  else if (r.view === "blog") renderBlog();
  else renderWork();
  if (r.view !== "work") window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = LANG;
  el("lightbox").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
  // close the Projects fold-down when clicking outside it
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navitem")) {
      document.querySelectorAll(".navitem.open").forEach((n) => n.classList.remove("open"));
    }
  });
  render();
});
