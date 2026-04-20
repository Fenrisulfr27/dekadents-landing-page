import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@mantine/core", "@tabler/icons-react"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});
