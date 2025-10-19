import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import Lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';

gsap.registerPlugin(CustomEase);

export default class LoadingAnimation {
  // コンテナ要素
  private wrapper: HTMLElement | null = document.querySelector('[data-loading]');
  private container: HTMLElement | null = document.querySelector('[data-building-container]');

  // テキスト
  private buildingTexts: HTMLElement[] | null = Array.from(
    document.querySelectorAll('[data-building-text]')
  );
  private fillText: HTMLElement | null = document.querySelector('[data-building-text-fill]');
  private completedText: HTMLElement | null = document.querySelector('[data-completed-text]');

  // lottie
  private emojiDot: HTMLElement | null = document.querySelector('[data-lottie-dot]');
  private emojiSalute: HTMLElement | null = document.querySelector('[data-lottie-salute]');
  private lottieSalute: AnimationItem = null!;

  constructor() {
    this.customEase();
    this.textInit();
    this.lottieInit();
    this.animation();
  }

  private customEase() {
    CustomEase.create('buildingEase', '0.16, 1, 0.3, 1'); // デフォルトのイージング
  }

  private textInit() {
    if (!this.buildingTexts || !this.fillText || !this.completedText) return;

    // 初期化
    gsap.set(this.completedText, { yPercent: 100 });
    gsap.set(this.buildingTexts, { yPercent: 100 });
    gsap.set(this.fillText, { clipPath: 'inset(0 100% 0 0)' });
  }

  // lottieアニメーション
  private lottieInit() {
    if (!this.emojiDot || !this.emojiSalute) return;

    // dot絵文字
    Lottie.loadAnimation({
      container: this.emojiDot,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1fae5/lottie.json',
    });

    // salute絵文字
    this.lottieSalute = Lottie.loadAnimation({
      container: this.emojiSalute,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1fae1/lottie.json',
    });

    // 位置の初期化
    gsap.set(this.emojiSalute, { yPercent: 100 });
    gsap.set(this.emojiDot, { yPercent: 100 });
  }

  // アニメーション実行
  private animation() {
    if (
      !this.buildingTexts ||
      !this.fillText ||
      !this.completedText ||
      !this.emojiSalute ||
      !this.container ||
      !this.wrapper
    )
      return;

    const tl = gsap.timeline({ defaults: { duration: 1.8, ease: 'buildingEase' } }); // タイムライン

    tl.to(this.buildingTexts, {
      yPercent: 0,
    });
    tl.to(
      this.emojiDot,
      {
        yPercent: 0,
      },
      '<'
    );
    // 透過テキストアニメーション
    tl.to(
      this.fillText,
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 3,
      },
      '-=.4'
    );
    // 透過されたテキストを非表示
    tl.to(this.buildingTexts, {
      yPercent: -100,
    });
    tl.to(
      this.emojiDot,
      {
        yPercent: -100,
      },
      '<'
    );
    // 完了テキスト表示
    tl.to(
      this.completedText,
      {
        yPercent: 0,
      },
      '-=1.6'
    );
    tl.to(
      this.emojiSalute,
      {
        yPercent: 0,
        onComplete: () => {
          this.lottieSalute.play();
        },
      },
      '<'
    );
    tl.to(
      this.wrapper,
      {
        duration: 1,
        scale: 0.7,
        ease: CustomEase.create('wrapperEase', '0.22, 1, 0.36, 1'),
      },
      '+=1.4'
    );
    tl.to(
      this.wrapper,
      {
        duration: 1,
        height: 0,
        ease: CustomEase.create('wrapperEase', '0.22, 1, 0.36, 1'),
      },
      '-=.2'
    );
  }
}
