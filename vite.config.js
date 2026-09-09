import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({ algorithm: "gzip", ext: ".gz" }),
    compression({ algorithm: "brotliCompress", ext: ".br" }),
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/test/setup.js"],
    include: ["src/**/*.{test,spec}.{js,jsx}"],
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("embla-carousel")) return "embla";
            if (id.includes("react-markdown")) return "markdown";
            if (id.includes("@radix-ui")) return "radix";
            if (id.includes("react-router")) return "router";
            if (
              id.includes("react-dom") ||
              id.includes("react/") ||
              id.includes("leaflet") ||
              id.includes("@fortawesome")
            )
              return "react-vendor";
          }
        },
      },
    },
  },
});
