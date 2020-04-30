import {Audit} from "../audit";
import {GardReference} from "./gard-reference";

export class GardBase {
  audit?: Audit;
  id?: string;
  version?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class GardDataProperty {
  value: string;
  reference?: string;
  displayValue?: string;
  preferred?: boolean;

  constructor (obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);

  }
}
