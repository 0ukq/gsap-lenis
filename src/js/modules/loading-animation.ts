import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, CustomEase);

export default class LoadingAnimation {
  private split: SplitText | null = null;
  private content: HTMLElement | null =
    document.querySelector("[data-loading]");

  constructor() {
    this.customEase();
    this.splitInit();
    this.animate();
  }

  // イージング定義
  private customEase() {
    CustomEase.create("charsEase", "0.22, 1, 0.36, 1"); // 文字のeasing
    CustomEase.create("contentEase", ".69,-0.01,0,.98"); // コンテンツのeasing
    CustomEase.create("textEase", "0, 0.55, 0.45, 1"); // テキストのeasing
  }

  // SplitText初期化
  private splitInit() {
    const text = document.querySelector("[data-loading-text]");
    if (!text) return;

    this.split = SplitText.create(text, {
      type: "chars",
      tag: "span",
    });
  }

  // アニメーション実行
  private animate() {
    if (!this.content || !this.split) return;

    const tl = gsap.timeline();
    gsap.set(this.split.chars, { yPercent: 100 });

    tl.to(this.split.chars, {
      yPercent: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "charsEase",
    });
    tl.to(
      this.split.chars,
      {
        yPercent: -100,
        duration: 1.2,
        ease: "textEase",
      },
      "+=.4"
    );
    tl.to(
      this.content,
      {
        yPercent: -100,
        duration: 1.4,
        ease: "contentEase",
      },
      "-=.7"
    );
  }
}
