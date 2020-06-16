import {Publication} from "./publication";
import {Gene} from "./gene";
import {Annotation} from "./annotation";

export class Phenotype {
  name: string;
  description: string;
  genes: Gene[];
 // xrefs: [Xref]
  references: Publication[];
  annotations: Annotation[];
}
