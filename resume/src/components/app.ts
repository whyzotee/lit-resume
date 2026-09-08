import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-resume")
export class App extends LitElement {
    createRenderRoot() {
        return this;
    }

    @property()
    sourceLink?: String;

    @property()
    dataLink?: String;

    render() {
        return html`
      <header class="web-only text-center px-4 py-3 sm:p-6 bg-green-400 text-white w-full">
        <h1 class="text-2xl sm:text-4xl">Resumette</h1>
        <div class="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-1">
          <button @click="${() => window.print()}" class="underline text-base sm:text-lg py-1">
            [Print]
          </button>
          <a href=${this.sourceLink} target="_blank" rel="noopener" class="py-1">[Source]</a>
          <a href=${this.dataLink} target="_blank" rel="noopener" class="py-1">[Data]</a>
        </div>

        <p class="text-xs sm:text-base mt-1 sm:mt-2">
          Printer - friendly standard résumé, any HTML tags with <code>web-only</code> CSS class
          will be hidden on print.
        </p>
        <p class="text-xs sm:text-base">
          You can click at any sections or lines hide some information before printing.
        </p>
      </header>

      <main class="text-center px-3 py-4 m-0 sm:p-4 md:m-8 xl:mx-auto max-w-7xl">
        <Intro {...intro} />

        <section>
          <Hideable>
            <h2 class="text-xl sm:text-2xl uppercase text-left">Technologies and Languages</h2>
            <hr />
            <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 wrap-break-word">
              {#each technologies as tech (tech)}
              <Hideable>
                <li>
                  <div class="flex flex-col sm:flex-row print:flex-row">
                    <span class="sm:w-28 flex-none font-semibold sm:font-normal print:font-normal"
                      >{tech.section}</span
                    >
                    <span class="flex-1">{tech.details}</span>
                  </div>
                </li>
              </Hideable>
              {/each}
            </ul>
          </Hideable>
        </section>

        <section>
          <Hideable>
            <h2 class="text-xl sm:text-2xl uppercase text-left">Education</h2>
            <hr />

            <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 wrap-break-word">
              {#each educations as edu (edu)}
              <Hideable>
                <li><strong>{edu.head}</strong>, {edu.details}</li>
              </Hideable>
              {/each}
            </ul>
          </Hideable>
        </section>

        <section>
          <Hideable>
            <h2 class="text-xl sm:text-2xl uppercase text-left">Work Experience</h2>
            <hr />

            {#each workExperiences as exp (exp)}
            <Work {...exp} />
            {/each}
          </Hideable>
        </section>

        <section>
          <Hideable>
            <h2 class="text-xl sm:text-2xl uppercase text-left">Projects</h2>
            <hr />

            <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 wrap-break-word">
              {#each projects as project (project)}
              <Hideable hide="{project.hide}">
                <li>
                  <strong>{project.name}</strong>
                  - {project.details}
                  <a href="https://{project.url}" target="_blank" rel="noreferrer"
                    ><strong>{project.url}</strong></a
                  >
                </li>
              </Hideable>
              {/each}
            </ul>
          </Hideable>
        </section>

        <section>
          <Hideable>
            <h2 class="text-xl sm:text-2xl uppercase text-left">Interests</h2>
            <hr />

            <ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 wrap-break-word">
              {#each interests as interest (interest)}
              <Hideable>
                <li>{interest}</li>
              </Hideable>
              {/each}
            </ul>
          </Hideable>
        </section>

        <footer class="print-only">
          (See <a href="{fullVersionLink}" target="_blank" rel="noopener">full version</a> or
          <a href="{sourceLink}" target="_blank" rel="noopener">source</a>)
        </footer>
      </main>
    `;
    }
}
