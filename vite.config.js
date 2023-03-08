import { defineConfig } from "vite";

export default defineConfig({
  base: "/vanilla-spa/",
  root: process.cwd() + "/src",
  server: {
    host: "127.0.0.1",
    port: "3000",
  },
  build: {
    outDir: process.cwd() + "/dist/fe-only",
  },
});
