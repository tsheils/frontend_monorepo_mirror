import {GardBase} from "./gard-base";
import {Publication} from "./publication";

enum ENUM_SOURCE_TYPE {
  "Patient",
  "Professional",
  "Other"
}

export class Source extends GardBase {
  name: string;
  type: ENUM_SOURCE_TYPE;
  url: string;
  accessed: Date;
  object: Publication;
}
