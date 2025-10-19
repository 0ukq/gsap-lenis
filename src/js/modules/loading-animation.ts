import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, CustomEase);

export default class LoadingAnimation {
  private content: HTMLElement | null = document.querySelector('[data-loading]');
  private texts: HTMLElement[] | null = Array.from(
    document.querySelectorAll('[data-loading-text]')
  );

  constructor() {
    this.customEase();
    this.animate();
  }

  // イージング定義
  private customEase() {
    CustomEase.create('titleEase', '0.11, 0, 0.5, 0'); // タイトルのeasing
    CustomEase.create('charsEase', '0.22, 1, 0.36, 1'); // 文字のeasing
    CustomEase.create('contentEase', '.69,-0.01,0,.98'); // コンテンツのeasing
    CustomEase.create('textEase', '0, 0.55, 0.45, 1'); // テキストのeasing
  }

  // アニメーション実行
  private animate() {
    if (!this.content || !this.texts) return;

    this.texts.forEach(text => {
      gsap.set(text, {
        clipPath: 'inset(0% 100% 0% 0%)',
      });
    });

    const textsBaseDuration = 1.6;

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(this.texts[0], {
      duration: textsBaseDuration,
      clipPath: 'inset(0% 0% 0% 0%)',
    });
    tl.to(
      this.texts[1],
      {
        duration: textsBaseDuration,
        clipPath: 'inset(0% 0% 0% 0%)',
      },
      `-=${textsBaseDuration - 0.2}`
    );
    tl.to(
      this.texts,
      {
        yPercent: -100,
        duration: 1.2,
        ease: 'textEase',
      },
      '+=.6'
    );
    tl.to(
      this.content,
      {
        yPercent: -100,
        duration: 1.4,
        ease: 'contentEase',
      },
      '-=.7'
    );
  }
}
