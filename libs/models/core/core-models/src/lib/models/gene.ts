import {Annotation} from "./annotation";
import {Publication} from "./publication";

export class Gene {
  geneid: number;
  sym: string;
  name: string;
  description: string;
  species: string;
  chromosome: string;
  annotations: Annotation;
  // xrefs: [Xref]
  references: Publication[];
}
