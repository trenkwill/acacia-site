import { defineCollection, z } from "astro:content";

/* ------- Shared sub-schemas ------- */
const cta = z
  .object({
    label: z.string(),
    url: z.string(),
  })
  .optional();

const sectionHead = z
  .object({
    eyebrow: z.string().optional(),
    eyebrow_variant: z.enum(["default", "forest", "light"]).optional(),
    title: z.string().optional(),
    lead: z.string().optional(),
  })
  .optional();

const ctaBand = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    lead: z.string().optional(),
    cta1: cta,
    cta2: cta,
  })
  .optional();

const card = z.object({
  idx: z.string().optional(),
  title: z.string(),
  image: z.string(),
  image_alt: z.string().optional(),
  desc: z.string().optional(),
  url: z.string(),
});

/* ------- Editorial blocks (acacia / architectes) ------- */
const block = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("split"),
    scheme: z.enum(["paper", "sand"]).default("paper"),
    eyebrow: z.string().optional(),
    eyebrow_variant: z.enum(["default", "forest"]).optional(),
    title: z.string().optional(),
    lead: z.string().optional(),
    body: z.string().optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    image_tag_num: z.string().optional(),
    image_tag_rest: z.string().optional(),
    image_tall: z.boolean().default(false),
    image_position: z.enum(["left", "right"]).default("right"),
    narrow_text: z.boolean().default(false),
    cta1: cta,
    cta2: cta,
  }),
  z.object({
    type: z.literal("prose-narrow"),
    scheme: z.enum(["paper", "sand"]).default("paper"),
    body: z.string(),
  }),
  z.object({
    type: z.literal("two-prose"),
    scheme: z.enum(["paper", "sand"]).default("paper"),
    body_left: z.string(),
    body_right: z.string(),
  }),
  z.object({
    type: z.literal("pull"),
    scheme: z.enum(["paper", "sand"]).default("paper"),
    num: z.string(),
    body: z.string(),
  }),
  z.object({
    type: z.literal("bars"),
    scheme: z.enum(["paper", "sand"]).default("sand"),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    lead: z.string().optional(),
    bars: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
        percent: z.number(),
        hero: z.boolean().default(false),
      })
    ),
  }),
  z.object({
    type: z.literal("values"),
    scheme: z.enum(["paper", "sand"]).default("paper"),
    eyebrow: z.string().optional(),
    eyebrow_variant: z.enum(["default", "forest"]).optional(),
    title: z.string().optional(),
    lead: z.string().optional(),
    items: z.array(
      z.object({
        idx: z.string(),
        title: z.string(),
        body: z.string(),
      })
    ),
  }),
]);

/* ------- Collections ------- */
const products = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    image: z.string(),
    image_alt: z.string().optional(),
    family: z.enum(["poteaux", "lames", "amenagement", "interieur"]),
    cat_label: z.string(),
    order: z.number().default(0),
    description: z.string().optional(),
    contain: z.boolean().default(false),
    rows: z
      .array(
        z.object({
          dt: z.string(),
          dd: z.string(),
          price: z.boolean().default(false),
        })
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    image: z.string(),
    image_alt: z.string().optional(),
    idx: z.string(),
    desc: z.string(),
    filter_cat: z.enum(["archi", "terrasse", "cloture", "jardin"]),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    seo_description: z.string().optional(),
    screen_label: z.string().optional(),

    /* Page-hero (interior pages) */
    page_hero: z
      .object({
        title: z.string(),
        lead: z.string().optional(),
        breadcrumb_label: z.string().optional(),
        image: z.string(),
        image_alt: z.string().optional(),
        short: z.boolean().default(false),
      })
      .optional(),

    /* Full-bleed hero (home only) */
    hero: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string(),
        baseline: z.string().optional(),
        image: z.string(),
        image_alt: z.string().optional(),
        logo: z.string().optional(),
        cta1: cta,
        cta2: cta,
        scroll_label: z.string().default("Défiler"),
      })
      .optional(),

    /* Stat strip (home) */
    stats: z
      .array(
        z.object({
          num: z.string(),
          suffix: z.string().optional(),
          label: z.string(),
        })
      )
      .optional(),

    /* Section : intro split (used on home + association + architectes) */
    intro_split: z
      .object({
        scheme: z.enum(["paper", "sand"]).default("paper"),
        eyebrow: z.string().optional(),
        eyebrow_variant: z.enum(["default", "forest"]).optional(),
        title: z.string(),
        lead: z.string().optional(),
        body: z.string().optional(),
        image: z.string().optional(),
        image_alt: z.string().optional(),
        image_tag_num: z.string().optional(),
        image_tag_rest: z.string().optional(),
        image_tall: z.boolean().default(false),
        image_position: z.enum(["left", "right"]).default("left"),
        narrow_text: z.boolean().default(false),
        cta1: cta,
        cta2: cta,
      })
      .optional(),

    /* Mission section (association) */
    mission_section: z
      .object({
        scheme: z.enum(["paper", "sand"]).default("sand"),
        eyebrow: z.string().optional(),
        title: z.string(),
        body: z.string().optional(),
        items: z.array(z.string()).default([]),
      })
      .optional(),

    /* Values section (association, architectes) */
    values_section: z
      .object({
        scheme: z.enum(["paper", "sand"]).default("paper"),
        eyebrow: z.string().optional(),
        eyebrow_variant: z.enum(["default", "forest"]).optional(),
        title: z.string(),
        lead: z.string().optional(),
        items: z.array(
          z.object({
            idx: z.string(),
            title: z.string(),
            body: z.string(),
          })
        ),
      })
      .optional(),

    /* Featured products (home) */
    products_section: z
      .object({
        scheme: z.enum(["paper", "sand"]).default("sand"),
        eyebrow: z.string().optional(),
        title: z.string(),
        lead: z.string().optional(),
        cards: z.array(card),
        more_label: z.string().optional(),
        more_url: z.string().optional(),
      })
      .optional(),

    /* Featured projects (home) */
    projects_section: z
      .object({
        scheme: z.enum(["paper", "sand"]).default("paper"),
        eyebrow: z.string().optional(),
        eyebrow_variant: z.enum(["default", "forest"]).optional(),
        title: z.string(),
        lead: z.string().optional(),
        cards: z.array(
          z.object({
            idx: z.string().optional(),
            title: z.string(),
            image: z.string(),
            image_alt: z.string().optional(),
            desc: z.string(),
            url: z.string(),
            filter_cat: z.enum(["archi", "terrasse", "cloture", "jardin"]).optional(),
          })
        ),
        more_label: z.string().optional(),
        more_url: z.string().optional(),
      })
      .optional(),

    /* Documents section (association) — statuts & adhesion */
    documents_section: z
      .object({
        scheme: z.enum(["paper", "sand"]).default("paper"),
        eyebrow: z.string().optional(),
        eyebrow_variant: z.enum(["default", "forest"]).optional(),
        title: z.string(),
        statuts: z
          .object({
            label: z.string(),
            url: z.string(),
            note: z.string().optional(),
          })
          .optional(),
        adhesion: z
          .object({
            title: z.string(),
            colleges: z.array(
              z.object({
                label: z.string(),
                logo: z.string().optional(),
                url: z.string(),
                note: z.string().optional(),
              })
            ),
          })
          .optional(),
      })
      .optional(),

    /* Editorial blocks (acacia, architectes) */
    blocks: z.array(block).optional(),

    /* Closing CTA band */
    cta_band: ctaBand,
  }),
});

export const collections = { products, projects, pages };
