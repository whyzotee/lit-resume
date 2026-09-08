import { escapeHtml } from "./src/escape-html.ts";
import { defineConfig, type Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderStaticResume } from "./src/prerender.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function prerenderResumePlugin(): Plugin {
  return {
    name: "prerender-resume",
    transformIndexHtml(html) {
      const profilePath = path.resolve(__dirname, "public/data/profile.json");
      if (!fs.existsSync(profilePath)) return html;

      const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
      const title = profile.intro?.title
        ? `${profile.intro.name} — ${profile.intro.title}`
        : profile.intro?.name || "Résumé";
      const description = profile.intro?.summary || `Résumé of ${profile.intro?.name || ""}`;
      const fullVersionLink = profile.resumeUrl?.fullVersionLink || "";

      const metaTags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="profile" />
    <meta property="og:url" content="${escapeHtml(fullVersionLink)}" />
      `.trim();

      const staticContent = renderStaticResume(profile);

      return html
        .replace(/<title>.*?<\/title>/, () => metaTags)
        .replace("<app-resume></app-resume>", () => `<app-resume>${staticContent}</app-resume>`);
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), prerenderResumePlugin()],
});
