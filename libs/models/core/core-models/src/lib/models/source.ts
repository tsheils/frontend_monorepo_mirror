import {Publication} from "./publication";

enum ENUM_SOURCE_TYPE {
  "Patient",
  "Professional",
  "Other"
}

export class Source {
  name: string;
  type: ENUM_SOURCE_TYPE;
  url: string;
  accessed: Date;
  object: Publication;
}
