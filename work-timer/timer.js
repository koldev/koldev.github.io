export class Timer extends HTMLDivElement {
  constructor() {
    super();
    this.setAttribute("is", "c-timer");

    this.textContent = "hello, timer";
  }
}

customElements.define("c-timer", Timer, { extends: "div" });
