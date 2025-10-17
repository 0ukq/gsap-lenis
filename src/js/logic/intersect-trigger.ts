import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class IntersectTrigger {
  private elements: HTMLElement[] = Array.from(
    document.querySelectorAll("[data-intersect-trigger]")
  );

  constructor() {
    this.logic();
    console.log(this.elements);
  }

  private logic() {
    if (!this.elements) return;
    this.elements.forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        markers: true,
        start: "top 80%",
        onEnter: () => element.classList.add("is-active"),
      });
    });
  }
}
