export class Disease {
  synonyms: string[];
  HPO: string[];
  Inheritance: string;
  xrefs: string[];
  is_rare: boolean;
  uri: string;
  gard_id: string;
  Cause: string;
  name: string;
  categories: string[];
  Diagnosis: string;
  created: any; // neo4j number object {high, low}
  id: any; // neo4j number object {high, low}
}
