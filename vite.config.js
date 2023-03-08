import { defineConfig } from "vite";

export default defineConfig({
  base: '/vanilla-spa/',
  root: process.cwd() + "/src",
  build: {
    outDir: process.cwd() + "/dist/fe-only",
  },
});
