import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default class FirstText {
  constructor() {
    console.log("FirstText class initialized");
    this.animate();
  }

  private animate() {
    const text = document.querySelector("[data-first-text]");
    if (!text) return;

    const split = SplitText.create(text, {
      type: "chars",
      tag: "span",
    });

    const tl = gsap.timeline();
    gsap.set(split.chars, { yPercent: 100 });

    tl.to(split.chars, {
      yPercent: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
    tl.to(
      split.chars,
      {
        yPercent: -100,
        duration: 1.2,
        ease: "cubic-bezier(0, 0.55, 0.45, 1)", // easeOutCirc
      },
      "+=.8"
    );
  }
}
