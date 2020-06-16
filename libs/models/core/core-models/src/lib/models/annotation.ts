import {Source} from "./source";
import {Publication} from "./publication";
import {GroupProperty} from "./group-property";

export class Annotation {
  property: GroupProperty;
  source: Source;
  references: Publication[];
}
