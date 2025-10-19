import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';

export default class LenisScroll {
  private lenis: Lenis = null!;

  constructor() {
    this.init();
    this.durationTest();
  }

  // 初期化
  private init() {
    this.lenis = new Lenis({
      autoRaf: true,
      lerp: 0,
      duration: 1.5,
    });

    // gsapと統合
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(time => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  private durationTest() {
    const target = document.querySelector('[data-lenis-duration-test]');
    const text = target?.querySelector('.text') as HTMLElement;
    if (!target || !text) return;

    ScrollTrigger.create({
      trigger: target,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        // start通過
        this.lenis.options.duration = 3;
      },
      onEnterBack: () => {
        // endからtriggerに侵入
        this.lenis.options.duration = 3;
      },
      onLeave: () => {
        // end通過
        this.lenis.options.duration = 1;
      },
      onLeaveBack: () => {
        this.lenis.options.duration = 1;
      },
    });
  }
}
