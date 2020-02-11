import {GardBase} from "../libs/ui/gard/data-display/src/lib/models/gard-base";
import {Organization} from "./organization";
import {Principal} from "./principal";

export class Author extends GardBase {
  position: string;
  URL: string;
  email: string;
  name: string;
  lastname: string;
  firstname: string;
  affiliation: Organization;
}
