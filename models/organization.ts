import {Address} from "./address";
import {GardBase} from "./gard-base";

export class Organization extends GardBase {
  name: string;
  URL: string;
  email: string;
  DUNS: string;
  address: Address;
}
