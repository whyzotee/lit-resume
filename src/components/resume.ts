import { html } from "lit";
import type { IProfileResp } from "../types/index.ts";
import { introTemplate } from "./intro.ts";
import { workTemplate } from "./work.ts";

export function headerTemplate(profile: IProfileResp) {
  const sourceLink = profile.resumeUrl?.sourceLink || "";
  const dataLink = sourceLink ? `${sourceLink}/blob/main/public/data/profile.json` : "";

  return html`<header class="web-only text-center px-4 py-3 sm:p-6 bg-green-400 text-white w-full">
    <h1 class="text-2xl sm:text-4xl">Resumette</h1>
    <div class="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-1">
      <button data-print disabled class="underline text-base sm:text-lg py-1">[Print]</button>
      <a href=${sourceLink} target="_blank" rel="noopener" class="py-1">[Source]</a>
      <a href=${dataLink} target="_blank" rel="noopener" class="py-1">[Data]</a>
    </div>

    <p class="text-xs sm:text-base mt-1 sm:mt-2">
      Printer - friendly standard résumé, any HTML tags with <code>web-only</code> CSS class will be
      hidden on print.
    </p>
    <p class="text-xs sm:text-base">
      You can click at any sections or lines hide some information before printing.
    </p>
    <p class="text-xs sm:text-base mt-2">
      Original template by
      <a href="https://github.com/narze/resume" target="_blank" rel="noopener noreferrer">narze</a>
    </p>
  </header>`;
}

export function mainTemplate(profile: IProfileResp) {
  const {
    intro,
    technologies = [],
    educations = [],
    workExperiences = [],
    projects = [],
    interests = [],
    certificates = [],
  } = profile;

  return html`
    <main class="text-center px-3 py-4 m-0 sm:p-4 md:m-8 xl:mx-auto max-w-7xl">
      ${introTemplate(intro)}

      <section>
        <resume-hideable>
          <h2 class="text-xl sm:text-2xl uppercase text-left">Technologies and Languages</h2>
          <hr />
          <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 wrap-break-word">
            ${technologies.map(
              (tech) => html`
                <resume-hideable>
                  <li>
                    <div class="flex flex-col sm:flex-row print:flex-row">
                      <span class="sm:w-28 flex-none font-semibold sm:font-normal print:font-normal"
                        >${tech.section}</span
                      >
                      <span class="flex-1">${tech.details}</span>
                    </div>
                  </li>
                </resume-hideable>
              `,
            )}
          </ul>
        </resume-hideable>
      </section>

      <section>
        <resume-hideable>
          <h2 class="text-xl sm:text-2xl uppercase text-left">Education</h2>
          <hr />
          <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 wrap-break-word">
            ${educations.map(
              (edu) => html`
                <resume-hideable>
                  <li><strong>${edu.head}</strong>, ${edu.details}</li>
                </resume-hideable>
              `,
            )}
          </ul>
        </resume-hideable>
      </section>

      <section>
        <resume-hideable>
          <h2 class="text-xl sm:text-2xl uppercase text-left">Work Experience</h2>
          <hr />
          ${workExperiences.map(workTemplate)}
        </resume-hideable>
      </section>

      <section>
        <resume-hideable>
          <h2 class="text-xl sm:text-2xl uppercase text-left">Projects</h2>
          <hr />
          <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 wrap-break-word">
            ${projects.map(
              (project) => html`
                <resume-hideable ?hide=${project.hide}>
                  <li>
                    <strong>${project.name}</strong>
                    - ${project.details}
                    <a href="https://${project.url}" target="_blank" rel="noreferrer"
                      ><strong>${project.url}</strong></a
                    >
                  </li>
                </resume-hideable>
              `,
            )}
          </ul>
        </resume-hideable>
      </section>

      <section>
        <resume-hideable>
          <h2 class="text-xl sm:text-2xl uppercase text-left">Interests</h2>
          <hr />
          <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 wrap-break-word">
            ${interests.map(
              (interest) => html`
                <resume-hideable>
                  <li>${interest}</li>
                </resume-hideable>
              `,
            )}
          </ul>
        </resume-hideable>
      </section>

      <section>
        <resume-hideable>
          <h2 class="text-xl sm:text-2xl uppercase text-left">Certificates</h2>
          <hr />
          <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 wrap-break-word">
            ${certificates.map(
              (cert) => html`
                <resume-hideable>
                  <li><a href="${cert.link}" target="_blank" rel="noreferrer">${cert.name}</a></li>
                </resume-hideable>
              `,
            )}
          </ul>
        </resume-hideable>
      </section>

      ${footerTemplate(profile)}
    </main>
  `;
}

export function footerTemplate(profile: IProfileResp) {
  const fullVersionLink = profile.resumeUrl?.fullVersionLink || "";
  const sourceLink = profile.resumeUrl?.sourceLink || "";

  return html`<footer class="print-only">
    (See <a href=${fullVersionLink} target="_blank" rel="noopener">full version</a> or
    <a href=${sourceLink} target="_blank" rel="noopener">source</a>)
  </footer>`;
}

export function resumeTemplate(profile: IProfileResp) {
  return html` ${headerTemplate(profile)} ${mainTemplate(profile)} `;
}
