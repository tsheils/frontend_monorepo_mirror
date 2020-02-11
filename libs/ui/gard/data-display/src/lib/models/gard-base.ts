import {Audit} from "../../../../../../../models/audit";
import {GardReference} from "./gard-reference";

export class GardBase {
  audit: Audit;
  id: string;
  version: string;
  created_at: Date;
  updated_at: Date;
}

export class GardDataProperty {
  public value: string;
  propertyType: string = "string";
  references: GardReference[];

  constructor (obj: any) {
    this.value = obj.value;
    this.propertyType = obj.propertyType;
    this.references = obj.references ? obj.references : [];
  }

  static display() {
    return this.prototype.value;
  }
}
