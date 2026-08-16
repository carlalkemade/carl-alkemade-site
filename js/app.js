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
  const nav = [
    ["work", "#/work"], ["info", "#/info"], ["blog", "#/blog"]
  ].map(([key, href]) => {
    const active = (view === key) ? " class='active'" : "";
    return `<a href="${href}"${active}>${esc(t(UI.nav[key]))}</a>`;
  }).join("");
  el("nav-links").innerHTML = nav;

  el("lang-toggle").innerHTML =
    ["da", "en"].map((l) =>
      `<button data-lang="${l}" class="${l === LANG ? "on" : ""}">${l.toUpperCase()}</button>`
    ).join("<span class='sep'>/</span>");
  el("lang-toggle").querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang)));
}

/* ---- Work (projects grid + filters) ------------------------------------- */
function renderWork() {
  const filters = FILTER_ORDER.map((f) =>
    `<button data-filter="${f}" class="${f === FILTER ? "on" : ""}">${esc(t(UI.filters[f]))}</button>`
  ).join("");

  const items = CONTENT.projects
    .filter((p) => FILTER === "all" || p.category === FILTER)
    .map((p) => `
      <a class="card" href="#/p/${encodeURIComponent(p.slug)}">
        <div class="card-img"><img loading="lazy" src="${esc(p.cover)}" alt="${esc(t(p.title))}"></div>
        <div class="card-cap">
          <span class="card-title">${esc(t(p.title))}</span>
          <span class="card-meta">${esc(t(p.meta))}</span>
        </div>
      </a>`).join("");

  el("view").innerHTML = `
    <div class="filterbar">${filters}</div>
    <div class="grid">${items || `<p class="empty">—</p>`}</div>`;

  el("view").querySelectorAll(".filterbar button").forEach((b) =>
    b.addEventListener("click", () => { FILTER = b.dataset.filter; renderWork(); }));
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
        <p class="project-meta">${esc(t(p.meta))} · ${esc(t(UI.filters[p.category]))}</p>
      </header>
      <div class="project-body">${paras(t(p.body))}</div>
      <div class="shots">${imgs}</div>
    </article>`;

  el("view").querySelectorAll(".shot img").forEach((img) =>
    img.addEventListener("click", () => openLightbox(img.dataset.full)));
}

/* ---- Blog ---------------------------------------------------------------- */
function renderBlog() {
  const posts = CONTENT.posts.map((post) => `
    <article class="post">
      <div class="post-date">${esc(fmtDate(post.date))}</div>
      <h2 class="post-title">${esc(t(post.title))}</h2>
      <div class="post-body">${paras(t(post.body))}</div>
    </article>`).join("");
  el("view").innerHTML = `<div class="blog">${posts || `<p class="empty">—</p>`}</div>`;
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
  if (h === "info") return { view: "info" };
  if (h === "blog") return { view: "blog" };
  return { view: "work" };
}
function render() {
  const r = currentView();
  renderHeader(r.view);
  if (r.view === "project") renderProject(r.slug);
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
  render();
});
