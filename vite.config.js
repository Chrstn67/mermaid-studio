import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/mermaid-studio/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          mermaid: ["mermaid"],
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  // Ajoute cette configuration pour résoudre les problèmes de chunks
  optimizeDeps: {
    include: ["mermaid"],
  },
});
