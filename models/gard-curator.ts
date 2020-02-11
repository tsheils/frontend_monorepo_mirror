import {GardBase} from "../libs/ui/gard/data-display/src/lib/models/gard-base";

export class GardCurator extends GardBase {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
//  role: UsersPermissionsRole
}
