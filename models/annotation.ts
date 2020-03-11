import {GardBase} from "./gard/gard-base";
import {Source} from "./source";
import {Publication} from "./publication";
import {GroupProperty} from "./group-property";

export class Annotation extends GardBase {
  property: GroupProperty;
  source: Source;
  references: Publication[];
}
