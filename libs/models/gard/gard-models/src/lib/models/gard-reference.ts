export class GardReference {
  source: string;
  fullName?: string;
  url?: string;
  value?: string;
  label?: string;

  constructor (obj: any) {
    Object.entries((obj)).forEach((prop) => {
      if(prop[0].charAt(0) !== '_') {
        this[prop[0]] = prop[1];
      }
    })

    if(obj.reference) {
      this.source = obj.reference;
      this.url = this._urlLookup((this.source));
      delete obj.reference;
    }

    if(!this.url) {
        this.url = this._urlLookup((obj.source))// + this.value;
    } else {
   //   this.url = this.url + this.value;
    }
    this.label = this.source;
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

      case 'PUBMED': {
        return 'https://pubmed.ncbi.nlm.nih.gov/'
      }

      case 'PHAROS': {
        return 'https://pharos.nih.gov/targets/'
      }

      default: {
        return null;
      }
    }
  }
}
