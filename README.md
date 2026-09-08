# Resume (Lit)

The site renders Lit templates to HTML at build time with @lit-labs/ssr. Static hosting serves the complete resume on the first request; reading it does not require JavaScript.

Edit the header, sections and footer in src/components/resume.ts, the introduction in src/components/intro.ts, and work entries in src/components/work.ts. Each template has a single source. Profile data lives in public/data/profile.json.

src/prerender.ts renders those templates during the Vite HTML transform. src/components/app.ts only enables Print and loads interactive components. It does not replace or render resume content in the browser. Printing from the browser menu still works with JavaScript disabled; click-to-hide and the page Print button require JavaScript.

Run from this directory:

- deno install --frozen: install dependencies using deno.lock.
- deno task dev: start the development server.
- deno task build: type-check and generate dist/.
- deno task test: test static rendering (Node.js 22.18+).
- deno task fmt:check: check formatting.

Deploy dist/ to static hosting. Rebuild after editing templates or profile data. No SSR server is needed in production.

## Cloudflare Pages

The Lit project is now at the repository root. Connect the Git repository as a Pages project and use:

| Setting                                      | Value                                                                 |
| -------------------------------------------- | --------------------------------------------------------------------- |
| Framework preset                             | None                                                                  |
| Root directory                               | Leave empty                                                           |
| Build command                                | npm install -g deno@2.9.6 && deno install --frozen && deno task build |
| Build output directory                       | dist                                                                  |
| Environment variable SKIP_DEPENDENCY_INSTALL | 1                                                                     |

Set SKIP_DEPENDENCY_INSTALL for production and preview builds. The command installs the tested Deno version, then Deno installs project dependencies from deno.lock and runs the build. npm is used only to bootstrap Deno in the Pages build container; it does not manage this project's dependencies. Remove any BUN_VERSION setting from Pages. The .node-version file selects Node.js for npm and the existing Node-based test command.

Commit deno.lock. No Pages Functions, Worker runtime or Svelte adapter is needed. Cloudflare serves the generated dist/ files; Deno runs only during the build. This configuration has not yet been deployed to Cloudflare.

See [Deno installation](https://docs.deno.com/runtime/getting_started/installation/), [Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) and [build image settings](https://developers.cloudflare.com/pages/configuration/build-image/).
