import {Address} from "./address";
import {GardBase} from "../libs/ui/gard/data-display/src/lib/models/gard-base";

export class Organization extends GardBase {
  name: string;
  URL: string;
  email: string;
  DUNS: string;
  address: Address;
}
