/* =============================================================================
   CONTENT.JS  —  THIS IS THE ONLY FILE YOU NEED TO EDIT
   -----------------------------------------------------------------------------
   Everything on the site (your name, projects, blog posts, CV, contact) lives
   here. You do NOT need to touch the HTML or the other JS files.

   Every piece of text comes in two languages:
        { da: "Dansk tekst", en: "English text" }
   Fill in both. The DA / EN button on the site switches between them.

   HOW TO ADD A PROJECT  -> scroll to  PROJECTS  and copy one { ... } block.
   HOW TO ADD A BLOG POST -> scroll to  BLOG POSTS and copy one { ... } block.
   Image files live in:  assets/img/
   ========================================================================== */

const CONTENT = {

  /* ---- Your name / site title (shown top-left) ------------------------- */
  siteName: "Carl Alkemade",

  /* =======================================================================
     PROJECTS
     Each project = one { } block. To add a new one, copy a whole block
     (from { to },) and paste it below, then change the values.

     Fields:
       slug     : short id, letters/numbers/dashes only, must be unique
       title    : project title (da/en)
       category : ONE of "architecture", "plaster", "furniture"
       meta     : small grey line under the title (year, type, place...)
       cover    : the thumbnail image shown in the grid  (in assets/img/)
       images   : list of images shown on the project page (first = big)
                  each image: { src, caption:{da,en} }
       body     : the description paragraph(s) (da/en)
     ===================================================================== */
  projects: [

    {
      slug: "kiosk-hotel",
      title: { da: "Kiosk + étværelses hotel", en: "Kiosk + one-room hotel" },
      category: "architecture",
      meta: { da: "Studieprojekt", en: "Studio project" },
      cover: "assets/img/kiosk-1-thumb.jpg",
      images: [
        { src: "kiosk-1", caption: { da: "Aksonometri", en: "Axonometric" } },
        { src: "kiosk-2", caption: { da: "Snitperspektiv", en: "Section perspective" } },
        { src: "kiosk-3", caption: { da: "Interiørperspektiv", en: "Interior perspective" } }
      ],
      body: {
        da: "En lille kiosk og et étværelses hotel, undersøgt gennem håndtegninger — aksonometri, snit og interiørperspektiv. (Rediger gerne denne tekst.)",
        en: "A small kiosk and a one-room hotel, explored through hand drawings — axonometric, section and interior perspective. (Feel free to edit this text.)"
      }
    },

    {
      slug: "murvaerk",
      title: { da: "Murværk", en: "Masonry" },
      category: "architecture",
      meta: { da: "Studieprojekt", en: "Studio project" },
      cover: "assets/img/murvaerk-1-thumb.jpg",
      images: [
        { src: "murvaerk-1", caption: { da: "Model, 1:1 afstøbning", en: "Model, 1:1 cast" } },
        { src: "murvaerk-2", caption: { da: "Aksonometri af forbandt", en: "Axonometric of the bond" } }
      ],
      body: {
        da: "En undersøgelse af murværk: et trappet forbandt tegnet i aksonometri og støbt som 1:1-model. (Rediger gerne denne tekst.)",
        en: "A study of masonry: a stepped brick bond drawn in axonometric and cast as a 1:1 model. (Feel free to edit this text.)"
      }
    },

    {
      slug: "skovbornehave",
      title: { da: "Skovbørnehave", en: "Forest kindergarten" },
      category: "architecture",
      meta: { da: "Studieprojekt", en: "Studio project" },
      cover: "assets/img/skov-1-thumb.jpg",
      images: [
        { src: "skov-1", caption: { da: "Isometri", en: "Isometric" } },
        { src: "skov-2", caption: { da: "Trækonstruktion", en: "Timber structure" } },
        { src: "skov-3", caption: { da: "Plan", en: "Plan" } }
      ],
      body: {
        da: "En skovbørnehave organiseret som fire pavilloner under saddeltage i træ — vist i isometri, konstruktionsaksonometri og plan. (Rediger gerne denne tekst.)",
        en: "A forest kindergarten organised as four pavilions under pitched timber roofs — shown in isometric, structural axonometric and plan. (Feel free to edit this text.)"
      }
    },

    {
      slug: "furniture",
      title: { da: "Udendørs spisebord", en: "Outdoors dining table" },
      category: "furniture",
      meta: { da: "", en: "" },
      cover: "assets/img/furniture-2-thumb.jpg",
      images: [
        { src: "furniture-2", caption: { da: "Dækket op", en: "Set for dinner" } },
        { src: "furniture-1", caption: { da: "Bord på terrassen", en: "Table on the deck" } }
      ],
      body: {
        da: "Udendørs spisebord inspireret af Enzo Mari. Bygget af fyrretræ, søm og bolte.",
        en: "Outdoors dining table inspired by Enzo Mari. Built with pine, nails and bolts."
      }
    },

    {
      slug: "chair",
      title: { da: "Stol", en: "Chair" },
      category: "furniture",
      meta: { da: "", en: "" },
      cover: "assets/img/furniture-3-thumb.jpg",
      images: [
        { src: "furniture-3", caption: { da: "Stol på terrassen", en: "Chair on the deck" } }
      ],
      body: {
        da: "Stol inspireret af Enzo Mari. Bygget af fyrretræ, søm og bolte.",
        en: "Chair inspired by Enzo Mari. Built with pine, nails and bolts."
      }
    }

  ],

  /* =======================================================================
     BLOG POSTS
     Newest post goes at the TOP. To add a post, copy one { } block and
     change the date, title and body. Use \n\n between paragraphs.
     ===================================================================== */
  posts: [

    {
      date: "2026-08-16",
      title: { da: "Velkommen", en: "Welcome" },
      body: {
        da: "Velkommen til min side. Her vil jeg løbende dele små opdateringer — nye projekter, ting jeg arbejder på, links og andet jeg finder interessant.\n\nDette er det første indlæg. For at tilføje et nyt, åbner du filen content.js, kopierer denne blok og retter dato, titel og tekst.",
        en: "Welcome to my site. I'll use this space to post small updates — new projects, things I'm working on, links and other bits I find interesting.\n\nThis is the first post. To add a new one, open content.js, copy this block, and change the date, title and text."
      }
    }

  ],

  /* =======================================================================
     INFO  (the About / CV / Contact page)
     ===================================================================== */
  info: {
    about: {
      da: "Kort om mig — skriv et par linjer om din baggrund og hvad du arbejder med. (Rediger denne tekst i content.js.) 1234",
      en: "A short intro — write a couple of lines about your background and what you work with. (Edit this text in content.js.)"
    },

    /* CV / experience. Each entry = { period, title:{da,en}, place:{da,en} } */
    cv: [
      { period: "20XX–20XX", title: { da: "Uddannelse", en: "Education" }, place: { da: "Skole / by", en: "School / city" } },
      { period: "20XX–20XX", title: { da: "Stilling", en: "Position" }, place: { da: "Tegnestue / by", en: "Studio / city" } }
    ],

    /* Contact links. Remove any you don't want; add more the same way. */
    contact: [
      { label: "Email", value: "carl@alkemade.dk", href: "mailto:carl@alkemade.dk" }
      // { label: "Instagram", value: "@brugernavn", href: "https://instagram.com/brugernavn" },
      // { label: "LinkedIn", value: "Carl Alkemade", href: "https://linkedin.com/in/..." }
    ]
  }

};
