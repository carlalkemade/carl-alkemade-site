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
        { src: "kiosk-3", caption: { da: "Interiørperspektiv", en: "Interior perspective" } },
        { src: "kiosk-4", caption: { da: "Opmålingsskitse", en: "Measurement sketch" } }
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
        { src: "murvaerk-1", caption: { da: "Isometrisk håndtegnet forbandt, A1, 1:10", en: "Isometric hand drawn brick bond, A1, 1:10" } },
        { src: "murvaerk-2", caption: { da: "Muret forbandt, 1:1", en: "Brick bond built, 1:1" } }
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
        { src: "skov-3", caption: { da: "Plan", en: "Plan" } },
        { src: "skov-4", caption: { da: "Situationsmodel — laserskåret og spraymalet", en: "Site model — laser-cut and spray-painted" } }
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
     The Blog page shows a list of links; clicking a title opens that post.
     Newest post goes at the TOP. To add a post, copy one { } block and
     change slug (a unique short id), date, title and body.
     Use \n\n between paragraphs.
     ===================================================================== */
  posts: [

    {
      slug: "introduction",
      date: "2026-08-16",
      title: { da: "Introduction", en: "Introduction" },
      body: {
        da: "123456789",
        en: "123456789"
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
