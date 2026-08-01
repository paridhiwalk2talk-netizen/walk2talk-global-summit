import { defineConfig } from "vite";

// Plain static site — Vite is only a local preview/static file server here.
// The site itself is pure HTML, CSS and vanilla JS: you can also just open
// index.html directly, or upload the files to any static host.
export default defineConfig({
  server: { host: true, port: 8080, strictPort: true },
  preview: { host: true, port: 8080, strictPort: true },
  build: { outDir: "dist" },
});
