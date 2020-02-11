import {GardBase} from "../libs/ui/gard/data-display/src/lib/models/gard-base";

export class Address extends GardBase {
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}
