# Carl Alkemade — personal site

A small, fast, static website (plain HTML/CSS/JS — no build step, no database).
You can open `index.html` directly in a browser to preview it, and host it
anywhere that serves static files.

---

## 1. Editing content — the only file you touch

Almost everything lives in **`js/content.js`**: your name, projects, blog posts,
CV and contact details. Open it in any text editor (VS Code, Notepad, TextEdit…).
Every text field is bilingual:

```js
{ da: "Dansk tekst", en: "English text" }
```

### Add a blog post
1. Open `js/content.js`, find the `posts:` section.
2. Copy one `{ ... }` post block and paste it **at the top** (newest first).
3. Change the `date`, `title` and `body`. Use a blank line for a new paragraph.

### Add a project
1. Put your images in the `assets/img/` folder.
2. In `js/content.js`, find `projects:`, copy one `{ ... }` block, and edit:
   - `slug` — a unique short id (letters/dashes)
   - `title`, `meta`, `body` — bilingual text
   - `category` — `"architecture"`, `"plaster"` or `"furniture"`
   - `cover` — the small grid image, e.g. `"assets/img/myproject-thumb.jpg"`
   - `images` — the pictures shown on the project page

**Image tip:** the site expects two sizes per picture, named
`NAME-thumb.jpg` (small, grid) and `NAME-full.jpg` (large, project page).
Any normal JPG/PNG works; keep the long side around 2000px so pages stay fast.

That's it — save the file and refresh the browser.

---

## 2. Hosting — putting it online

Because it's a static site, hosting is **free**. Recommended:

### Option A — Netlify (easiest, drag & drop)
1. Go to netlify.com and sign up (free).
2. Drag this whole folder onto the "Sites" area. It goes live in seconds on a
   `something.netlify.app` address.
3. To update later, drag the folder again — or connect a GitHub repo so it
   updates automatically when you change a file.

### Option B — Cloudflare Pages
Similar to Netlify; also free with unlimited bandwidth.

### Your own domain
1. Buy a domain (e.g. a `.dk` for ~60–90 kr/year, or a `.net`/`.com` for
   ~$10–15/year) from any registrar.
2. In Netlify/Cloudflare, add the domain under "Domain settings" and follow
   the DNS instructions they give you.
3. HTTPS (the padlock) is turned on automatically and free.

**Rough total cost: just the domain — around 60–120 kr / $10–15 per year.**

---

## Folder structure

```
index.html            the page shell (rarely edited)
favicon.svg           little browser-tab icon
css/style.css         look & feel (colours/sizes grouped at the top)
js/content.js         <-- YOUR content: projects, posts, CV, contact
js/app.js             the engine (no need to edit)
assets/img/           all images
```
