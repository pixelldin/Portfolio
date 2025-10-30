import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const repoName = "Portfolio"; // your GitHub repo name

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : `/${repoName}/`,
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    react(),
    tailwindcss(),
    {
      name: "serve-v1",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/v1" || req.url === "/v1/") {
            req.url = "/v1/index.html";
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
