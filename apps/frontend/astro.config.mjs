import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({ nesting: true })],
  vite: {
    server: {
      fs: {
        strict: false, // TODO: investigate & resolve
      },
    },
  },
});
