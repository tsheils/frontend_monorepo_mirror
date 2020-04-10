import {Audit} from "../audit";
import {GardReference} from "./gard-reference";

export class GardBase {
  audit: Audit;
  id: string;
  version: string;
  created_at: Date;
  updated_at: Date;
}

export class GardDataProperty {
  value: string;
  references: string[];
  preferred: boolean;

  constructor (obj: any) {
    this.value = obj.value;
    this.references = obj.references ? obj.references : [];
    this.preferred = obj.preferred;
  }
}
