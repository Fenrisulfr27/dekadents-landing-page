import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "local-netlify-functions",
      configureServer(server) {
        server.middlewares.use(
          "/.netlify/functions/exhibitions",
          async (_request, response) => {
            try {
              const { handler } = await import("./netlify/functions/exhibitions.mjs");
              const result = await handler();

              response.statusCode = result.statusCode ?? 200;
              for (const [key, value] of Object.entries(result.headers ?? {})) {
                response.setHeader(key, value);
              }
              response.end(result.body);
            } catch (error) {
              response.statusCode = 500;
              response.setHeader("Content-Type", "application/json");
              response.end(
                JSON.stringify({
                  error:
                    error instanceof Error
                      ? error.message
                      : "Failed to load exhibitions",
                }),
              );
            }
          },
        );
      },
    },
  ],
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
