import {Serializer} from "./serializer";
import {GardDataProperty} from "../libs/ui/gard/data-display/src/lib/models/gard-base";
import {DomSanitizer} from "@angular/platform-browser";
import {Inject, Optional, SecurityContext} from "@angular/core";

export class Disease {
  synonyms: GardDataProperty[];
  hpo: GardDataProperty[];
  inheritance: GardDataProperty[];
  xrefs: GardDataProperty[];
  is_rare: boolean;
  uri: string;
  gard_id: string;
  cause: GardDataProperty[];
  name: string;
  categories: GardDataProperty[];
  diagnosis: GardDataProperty[];
  statistics: GardDataProperty[];
  created: any; // neo4j number object {high, low}
  id: any; // neo4j number object {high, low}
}

export class DiseaseSerializer implements Serializer {

  constructor(
    // @Inject(DomSanitizer) public sanitizer: DomSanitizer
  ) {
  }

  fromJson(json: any): Disease {
    console.log(json);
    const obj = new Disease();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    // array of strings
    if (json.synonyms) {
      obj.synonyms = json.synonyms.map(val => new GardDataProperty({value: val}));
    }

    // array of strings
    if (json.categories) {
      obj.categories = json.categories.map(val => new GardDataProperty({value: val}));
    }

    // array of strings
    if (json.xrefs) {
      obj.xrefs = json.xrefs.map(val => new GardDataProperty({value: val}));
    }

    // array of strings
    if (json.HPO) {
      obj.hpo = json.HPO.map(val => new GardDataProperty({value: val}));
      delete obj['HPO'];
    }

    if (json.created) {
      console.log(json.created);
      console.log(new Date(json.created.low));
      obj.created = new Date(json.created.low).toString();
    }

    if (json.Cause) {
      obj.cause = json.Cause.map(val => new GardDataProperty({value: val, propertyType: 'html'}));
      delete obj['Cause'];
    }
    if (json.Diagnosis) {
      obj.diagnosis = json.Diagnosis.map(val => new GardDataProperty({value: val, propertyType: 'html'}));
      delete obj['Diagnosis'];
    }
    if (json.Inheritance) {
      obj.inheritance = [json.Inheritance].map(val => new GardDataProperty({value: val, propertyType: 'html'}));
      delete obj['Inheritance'];

    }
    if (json.Statistics) {
      obj.statistics = [json.Statistics].map(val => new GardDataProperty({value: val, propertyType: 'html'}));
      delete obj['Statistics'];
    }

    //  const objFields = this._mapField(json);
    //   console.log(objFields);
    console.log(obj);
    return obj;
  }

  toJson(object: any): any {
  }

  _asProperties(object: any): any {
  }

  /**
   * recursive mapping function
   * @param obj
   * @return {{}}
   * @private
   */
  private _mapField(obj: any) {
    const retObj: any = Object.assign({}, obj);
    Object.keys(obj).map(objField => {
      if (Array.isArray(obj[objField])) {
        retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
      } else {
        retObj[objField] = new GardDataProperty({value: objField, references: []});
      }
    });
    if (obj.__typename) {
      delete retObj.__typename;
    }
    return retObj;
  }
}
