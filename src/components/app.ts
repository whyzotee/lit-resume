// Enhance the HTML generated at build time; keep its content and DOM intact.
import "./hideable.ts";

const printButton = document.querySelector<HTMLButtonElement>("[data-print]");
if (printButton) {
  printButton.disabled = false;
  printButton.addEventListener("click", () => window.print());
}
