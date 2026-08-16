# Getting your site online — step by step

This is the whole path, in order. You only need a **GitHub account** (you have one)
and, later, a **domain name**. Hosting itself is free. No terminal needed — you do
everything in the GitHub website.

The plan:
1. Put the site in a GitHub repository.
2. Turn on GitHub Pages → the site is live.
3. Buy a domain and point it at the site.

After that, adding a blog post or project is just editing one file on github.com.

---

## Step 1 — Create the repository and upload the site

1. Unzip `carl-alkemade-site.zip` somewhere on your computer. You'll have a folder
   with `index.html`, `css`, `js`, `assets`, etc. inside it.
2. Go to **https://github.com/new**.
3. Repository name: **`carl-alkemade`** (or anything you like).
   Set it to **Public**. Don't add a README (you already have one). Click
   **Create repository**.
4. On the new empty repo page, click the link **"uploading an existing file"**
   (or **Add file → Upload files**).
5. Open your unzipped folder, select **everything inside it** (all the files and
   folders — not the outer folder itself), and drag them onto the upload area.
   Make sure the hidden file **`.nojekyll`** comes along; if your file manager
   hides it, that's fine, it's also fine to add it later.
6. At the bottom, click **Commit changes**.

Your files are now on GitHub.

## Step 2 — Turn on GitHub Pages (this publishes the site)

1. In the repo, go to **Settings** (top menu) → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **`main`**, folder: **`/ (root)`**. Click **Save**.
4. Wait ~1 minute, then refresh. GitHub shows a green box with your live address:
   **`https://<your-username>.github.io/carl-alkemade/`**

That link is your live site. Send it to anyone.

## Step 3 — Your own domain (optional but nice)

1. Buy a domain from any registrar. A `.dk` is about **60–90 kr/year**; a `.com`
   or `.net` about **$10–15/year**. A name like **`carlalkemade.dk`** works well.
2. Back in **Settings → Pages → Custom domain**, type your domain (e.g.
   `carlalkemade.dk`) and **Save**. This adds a small `CNAME` file to your repo.
3. At your registrar, open the domain's **DNS settings** and add these records
   (this is the standard GitHub Pages setup):

   | Type  | Name / Host | Value                     |
   |-------|-------------|---------------------------|
   | A     | @           | 185.199.108.153           |
   | A     | @           | 185.199.109.153           |
   | A     | @           | 185.199.110.153           |
   | A     | @           | 185.199.111.153           |
   | CNAME | www         | `<your-username>.github.io` |

4. Wait for it to take effect (minutes to a few hours), then tick
   **Enforce HTTPS** in the Pages settings. You get the padlock for free.

> When you're ready to do this, tell me your domain and username and I'll double-check
> the exact records with you — DNS is the one fiddly part.

---

## Editing the site after it's live (no terminal)

Everything you'll ever change lives in **`js/content.js`**.

**To add a blog post:**
1. On github.com, open your repo → `js` → **`content.js`**.
2. Click the **pencil icon** (Edit).
3. Find the `posts:` section. Copy the existing `{ ... }` post block and paste a
   copy **above** it (newest first). Change the `date`, `title` and `body`.
4. Click **Commit changes**.
5. Your site rebuilds automatically in about a minute. Done.

**To add a project:** same idea — upload the images into `assets/img/`, then copy a
`{ ... }` block in the `projects:` section and fill in the details. (Full instructions
are in `README.md`.)

That's the whole system: edit one file in the browser, commit, and it's live.

---

## How the blog works (the plan you asked about)

Each blog post is a small self-contained block of text inside the single file
`js/content.js` — no separate files to manage, no database, nothing to install.
There's already one example post ("Welcome / Velkommen") in there as a template.
To publish, you copy that block and change the words. Because it's one plain file,
you can edit it right on GitHub and the site updates itself.
