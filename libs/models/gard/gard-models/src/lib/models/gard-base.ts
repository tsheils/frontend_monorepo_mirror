import {GardReference} from "./gard-reference";
import {Serializer} from "@ncats-frontend-library/models/interfaces/core-interfaces";
import {Audit} from "@ncats-frontend-library/models/gard/gard-models";

export class GardBase {
  audit?: Audit;
  id?: string;
  version?: string;
  dateCreated?: Date | string | number;
  updated_at?: Date;
}

export class GardDataProperty {
  value: string;
  references?: GardReference[];
  sources?: GardReference[];
  displayValue?: string;
  preferred?: boolean;

  constructor() {
  }
}

  export class GardDataPropertySerializer implements Serializer {

  constructor(
    // @Inject(DomSanitizer) public sanitizer: DomSanitizer
  ) {
  }

  fromJson(json: any): GardDataProperty {
    const obj = new GardDataProperty();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    if(json.props) {
      Object.entries((json.props)).forEach((prop) => obj[prop[0]] = prop[1]);
      delete obj['props'];
    }

    if (json.references) {
      obj.references = [];
      json.references.forEach(ref => {
        obj.references.push(new GardReference(ref));
      })
      if(obj.references.length === 0) {
        delete obj.references;
      }
    }

    if (json.reference) {
      obj.references = [new GardReference({source: json.reference})];
      delete obj['reference'];
    }

    if (json.sources) {
     obj.sources = obj.sources.map(source => new GardReference((source)));
     if (obj.sources.length === 0) {
       delete obj['sources'];
     }
    }

   /* if (json.source) {
      console.log(json);
      obj.sources = [new GardReference({source: json.source})];
      delete obj['source'];
    }*/
    return obj;
  }

}

