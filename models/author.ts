import {GardBase} from "./gard/gard-base";
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
