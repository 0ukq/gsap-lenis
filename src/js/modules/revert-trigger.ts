import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class RevertTrigger {
  constructor() {
    this.trigger();
  }

  private trigger() {
    const target = document.querySelector('[data-background-change-trigger]') as HTMLElement;
    const background = document.querySelector('[data-background-color]') as HTMLElement;
    if (!target || !background) return;

    ScrollTrigger.create({
      trigger: target,
      start: 'top 20%',
      end: 'bottom 35%',
      onEnter: () => document.body.classList.add('is-revert'),
      onEnterBack: () => document.body.classList.add('is-revert'),
      onLeave: () => document.body.classList.remove('is-revert'),
      onLeaveBack: () => document.body.classList.remove('is-revert'),
    });
  }
}
