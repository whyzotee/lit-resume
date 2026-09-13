import { html } from "lit";
import type { IIntro } from "../types/index.ts";

export function introTemplate(intro?: IIntro) {
  if (!intro) return html``;

  const {
    name = "",
    nickname = "",
    title = "",
    summary = "",
    phone = "",
    email = "",
    github = "",
    linkedin = "",
    location = "",
    website = "",
  } = intro;

  return html`
    <div class="flex flex-wrap flex-row gap-x-4 text-sm sm:text-base">
      <div class="flex-1 basis-[45%] sm:basis-0 text-left sm:py-4 sm:w-48 wrap-break-word">
        ${phone ? html`<p><a href="tel:${phone}">${phone}</a></p>` : ""}
        ${email ? html`<p><a href="mailto:${email}">${email}</a></p>` : ""}
        ${location ? html`<p>${location}</p>` : ""}
      </div>

      <h2
        class="flex-none basis-full sm:basis-auto order-first sm:order-0 print:order-0 text-3xl sm:text-2xl md:text-3xl lg:text-6xl text-center px-0 py-2 sm:p-4 print:pt-0 wrap-break-word"
      >
        ${name}
        ${nickname ? html`<span class="block -mt-1 text-base lg:text-lg">(${nickname})</span>` : ""}
        ${title ? html`<span class="block mt-1 text-base sm:text-lg lg:text-xl font-semibold">${title}</span>` : ""}
      </h2>

      <div
        class="flex-1 basis-[45%] sm:basis-0 text-right sm:py-4 sm:w-48 text-sm sm:text-base wrap-break-word print:text-right"
      >
        ${
          github
            ? html`<p>
                <a href="https://github.com/${github}" target="_blank" rel="noreferrer"
                  >github.com/${github}</a
                >
              </p>`
            : ""
        }
        ${
          website
            ? html`<p>
                <a href="https://${website}" target="_blank" rel="noreferrer">${website}</a>
              </p>`
            : ""
        }
        ${
          linkedin
            ? html`<p>
                <a href="https://linkedin.com/in/${linkedin}" target="_blank" rel="noreferrer"
                  >Linkedin</a
                >
              </p>`
            : ""
        }
      </div>
    </div>

    ${
      summary
        ? html`<p class="text-left text-sm sm:text-base print:text-sm mb-2">${summary}</p>`
        : ""
    }
  `;
}
