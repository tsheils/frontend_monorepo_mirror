import {Audit} from "./audit";

export class GardBase {
  audit: Audit;
  id: string;
  version: string;
  created_at: Date;
  updated_at: Date;
}
