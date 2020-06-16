import {Principal} from "@ncats-frontend-library/models/core/core-models";

export class Audit {
  created_by: Principal;
  updated_by: Principal;
  approved_by: Principal;
  id: string;
}
