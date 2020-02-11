import {GardBase} from "../libs/ui/gard/data-display/src/lib/models/gard-base";
import {Publication} from "./publication";
import {Gene} from "./gene";
import {Annotation} from "./annotation";

export class Phenotype extends GardBase {
  name: string;
  description: string;
  genes: Gene[];
 // xrefs: [Xref]
  references: Publication[];
  annotations: Annotation[];
}
