import { defineCollection, z } from "astro:content";

const products = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    image: z.string(),
    image_style: z.string().optional(),
    category: z
      .enum(["poteaux", "lames", "interieur", "amenagement"])
      .default("poteaux"),
    order: z.number().default(0),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    image: z.string(),
    description: z.string(),
    location: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    seo_description: z.string().optional(),
    hero_title: z.string().optional(),
    hero_image: z.string().optional(),
    hero_baseline: z.string().optional(),
    hero_cta_label: z.string().optional(),
    hero_cta_url: z.string().optional(),
    lead: z.string().optional(),
  }),
});

export const collections = { products, projects, pages };
