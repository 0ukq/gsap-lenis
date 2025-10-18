import IntersectTrigger from "./logic/intersect-trigger";
import LoadingAnimation from "./modules/loading-animation";
import StackText from "./modules/stack-text";

export default class Index {
  constructor() {
    new StackText();
    new IntersectTrigger();
    new LoadingAnimation();
  }
}
