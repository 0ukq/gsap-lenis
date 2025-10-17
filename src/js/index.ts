import IntersectTrigger from "./logic/intersect-trigger";
import FirstText from "./modules/first-text";
import StackText from "./modules/stack-text";

export default class Index {
  constructor() {
    new StackText();
    new IntersectTrigger();
    new FirstText();
  }
}
