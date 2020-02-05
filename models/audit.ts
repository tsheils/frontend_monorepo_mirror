import {Principal} from "./principal";

export class Audit {
  created_by: Principal;
  updated_by: Principal;
  approved_by: Principal;
  id: string;
}
