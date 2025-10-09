// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/mermaid-studio/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          mermaid: ["mermaid"],
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
