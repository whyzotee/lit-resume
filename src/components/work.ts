import { html } from "lit";
import type { IWorkExperience } from "../types/index.ts";

export function workTemplate(experience?: IWorkExperience) {
  if (!experience) return html``;

  const { position = "", company = "", url = "", years = [], details = [] } = experience;

  return html`
    <div class="work-experience">
      <resume-hideable>
        <div
          class="work-header flex flex-col sm:flex-row print:flex-row sm:gap-4 print:gap-4 font-bold mb-2 print:mb-1"
        >
          <div class="flex-1 text-left print:whitespace-nowrap">${position}</div>
          <div class="flex justify-between gap-2 sm:contents print:contents">
            ${
              company
                ? html`<div class="flex-initial text-left">
                    <a href="${url || "#"}" target="_blank" rel="noreferrer">${company}</a>
                  </div>`
                : ""
            }
            ${
              years && years.length
                ? html`<div class="flex-none sm:flex-1 text-right print:whitespace-nowrap">
                    ${years.join("-")}
                  </div>`
                : ""
            }
          </div>
        </div>
        ${
          details && details.length
            ? html`
                <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6">
                  ${details.map(
                    (detail) => html`
                      <resume-hideable>
                        <li>${detail}</li>
                      </resume-hideable>
                    `,
                  )}
                </ul>
              `
            : ""
        }
      </resume-hideable>
    </div>
  `;
}
