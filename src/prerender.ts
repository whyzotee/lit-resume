import { render } from "@lit-labs/ssr";
import { collectResultSync } from "@lit-labs/ssr/lib/render-result.js";
import { resumeTemplate } from "./components/resume.ts";
import type { IProfileResp } from "./types/index.ts";

export function renderStaticResume(profile: IProfileResp): string {
  return collectResultSync(render(resumeTemplate(profile)));
}
