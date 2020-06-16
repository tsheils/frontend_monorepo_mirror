export class GardReference {
  source: string;
  fullName?: string;
  url?: string;
  value?: string;

  constructor (obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
    if(obj.reference) {
      this.source = obj.reference;
      this.url = this._urlLookup((this.source));
      delete obj.reference;
    }

    if(!this.url) {
      this.url = this._urlLookup((obj.source));
    }
  }

  private _urlLookup(source: string): string {
    switch(source) {
      case 'OMIM': {
        return 'https://omim.org/entry/';
      }
      case 'GARD': {
        // todo: gard needs both name and id /
        // https://rarediseases.info.nih.gov/diseases/6233/CYSTIC-FIBROSIS
        return null;
      }
      case 'ORPHANET':
      case 'ORPHA': {
        return 'https://www.orpha.net/consor/cgi-bin/OC_Exp.php?Expert=';
      }
      case 'MONDO': {
        return 'http://purl.obolibrary.org/obo/';
      }
      default: {
        return null;
      }
    }
  }
}
