import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import Lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';

gsap.registerPlugin(CustomEase, SplitText);

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

  // スプリットテキスト
  private splitText: SplitText[] = [];

  constructor() {
    this.customEase();
    this.splitInit();
    this.textInit();
    this.lottieInit();
    this.animation();
  }

  private customEase() {
    CustomEase.create('buildingEase', '0.16, 1, 0.3, 1'); // デフォルトのイージング
  }

  // テキストの分割
  private splitInit() {
    if (!this.buildingTexts || !this.completedText) return;

    this.buildingTexts.forEach(text => {
      this.splitText.push(
        SplitText.create(text, {
          type: 'chars',
          tag: 'span',
        })
      );
    });
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

    const tl = gsap.timeline({ defaults: { duration: 1.4, ease: 'buildingEase' } }); // タイムライン

    tl.to(this.buildingTexts, {
      yPercent: 0,
      duration: 1.8,
    });
    tl.to(
      this.emojiDot,
      {
        yPercent: 0,
        duration: 1.8,
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
      '-=.8'
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
    // コンテナ要素 移動
    tl.to(
      this.container,
      {
        xPercent: -10,
      },
      '+=1.4'
    );
    // コンテナ要素 透過
    tl.to(
      this.container,
      {
        clipPath: 'inset(0% 100% 0% 0%)',
      },
      '<'
    );
    tl.to(this.wrapper, {
      duration: 1,
      scale: 0.8,
      ease: CustomEase.create('wrapperEase', '0.22, 1, 0.36, 1'),
    });
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
