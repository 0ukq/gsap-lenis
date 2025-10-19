import IntersectTrigger from './logic/intersect-trigger';
import BackgroundParticles from './modules/background-particles';
import LenisSCroll from './modules/lenis-scroll';
import StackText from './modules/stack-text';
import RevertTrigger from './modules/revert-trigger';
import LoadingAnimation from './modules/loading-animation';

export default class Index {
  constructor() {
    new StackText();
    new IntersectTrigger();
    new LoadingAnimation();
    new BackgroundParticles();
    new LenisSCroll();
    new RevertTrigger();
  }
}
