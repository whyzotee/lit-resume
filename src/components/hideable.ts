import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("resume-hideable")
export class ResumeHideable extends LitElement {
  @property({ type: Boolean, reflect: true })
  hide = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "button");
    this.addEventListener("click", this.toggleHide);
    this.addEventListener("keydown", this.handleKeydown);
  }

  updated() {
    this.setAttribute("aria-pressed", String(this.hide));
  }

  private toggleHide = (event: Event) => {
    event.stopPropagation();
    this.hide = !this.hide;
  };

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.target !== this) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggleHide(event);
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "resume-hideable": ResumeHideable;
  }
}
