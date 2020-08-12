import {GardReference} from "./gard-reference";
import {Serializer} from "../../../../../interfaces/core-interfaces/src/lib/interfaces/serializer";
import {Audit} from "@ncats-frontend-library/models/gard/gard-models";

export class GardBase {
  audit?: Audit;
  id?: string;
  version?: string;
  dateCreated?: Date | string | number;
  updated_at?: Date;

  constructor(){}
}

export class GardDataProperty {
  value: string;
  references?: GardReference[];
  sources?: GardReference[];
  displayValue?: string;
  preferred?: boolean;
  type?: string;

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

    if(json.referencesource) {
      obj.references = json.referencesource.map(src => new GardReference(src));
    }
    /*if(json.props) {
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
    }*/

    return obj;
  }

}

