import { defineConfig } from "astro/config";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://it-services-contents-unir.vercel.app/",
  integrations: [
    icon(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    react(),
    sitemap(),
    mermaid({
      autoTheme: true,
    }),
  ],
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid", "math"],
    }
  },
});
