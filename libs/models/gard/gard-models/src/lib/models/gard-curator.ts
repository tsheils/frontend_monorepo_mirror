import {GardBase} from "./gard-base";

export class GardCurator extends GardBase {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
//  role: UsersPermissionsRole
}
