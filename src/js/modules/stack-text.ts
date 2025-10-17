import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default class StackText {
  // アニメーションさせるテキストのラップ要素取得
  private stackItems: HTMLElement[] = Array.from(
    document.querySelectorAll("[data-stack-item]")
  );

  constructor() {
    this.clone();
    this.animate();
  }

  // アニメーションさせるテキストをクローン
  private clone() {
    if (!this.stackItems) return;

    this.stackItems.forEach((item) => {
      const clone = item.querySelector("[data-stack-text]")?.cloneNode(true);
      if (clone && clone instanceof HTMLElement) {
        item.insertAdjacentElement("beforeend", clone);
      }
    });
  }

  // アニメーション
  private animate() {
    if (!this.stackItems) return;

    this.stackItems.forEach((item) => {
      // 複製した要素もまとめて取得
      const texts = Array.from(item.querySelectorAll("[data-stack-text]"));

      texts.forEach((text, index) => {
        SplitText.create(text, {
          type: "chars",
          tag: "span",
          onSplit(self) {
            return gsap.fromTo(
              self.chars,
              {
                yPercent: index === 0 ? 0 : 110, // 最初の要素は上、複製した要素は下に配置
              },
              {
                yPercent: index === 0 ? -110 : 0,
                stagger: 0.05,
                duration: 1,
              }
            );
          },
        });
      });
    });
  }
}
