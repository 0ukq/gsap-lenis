import IntersectTrigger from "./logic/intersect-trigger";
import StackText from "./modules/stack-text";

export default class Index {
  constructor() {
    console.log("Index class initialized");
    new StackText();
    new IntersectTrigger();
  }
}
