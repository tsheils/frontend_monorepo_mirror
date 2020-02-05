import {GardBase} from "./gard-base";
import {Author} from "./author";

enum ENUM_PUBLICATION_TYPE {
  "JournalArticle" = "Journal Article",
  "CaseReports" = "Case Report",
  "Review" = "Review",
  "Book" = "Book"
}

export class Publication extends GardBase {
  authors: Author[];
  title: string;
  published: Date;
  volume: string;
  pages: string;
  abstract: string;
  journal: string;
  type: ENUM_PUBLICATION_TYPE;
  issue: string;
  PMID: number;
  DOI: string;
  PMC: string;
}
