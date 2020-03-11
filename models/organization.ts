import {Address} from "./address";
import {GardBase} from "./gard/gard-base";

export class Organization extends GardBase {
  name: string;
  URL: string;
  email: string;
  DUNS: string;
  address: Address;
}
