import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/",   // important for Vercel

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./srs"), // because folder name = srs
    },
  },

  build: {
    outDir: "dist",
  },
});
