import {Serializer} from "../serializer";
import {GardDataProperty} from "./gard-base";
import {DomSanitizer} from "@angular/platform-browser";
import {Inject, Optional, SecurityContext} from "@angular/core";

enum AGE_OF_ONSET {
  none = 'no_age_of_onset_information',
  antenatal = 'antenatal',
  neonatal = 'neonatal',
  infancy = 'infancy',
  childhood = 'childhood',
  adolescent = 'adolescent',
  adult = 'adult',
  elderly = 'elderly'
}

enum CAUSE_STATUS {
  known = 'known',
  partial = 'partially known',
  unknown = 'unknown'
}

export class Population {
  // todo create location service
  geographicLocation: string;
  ethnicity: string; // todo set up as enums
  // todo: what goes in here?
  other: any;
}

export class Citation {
  citation: string;
  type: string;
  population: Population[];
  values: string[];
}

export class Epidemology {
  // todo: what is this? can it be an enum
  sourceText: string;
  items: Citation[]
}

// todo: the subtypes are contingent on the type
export class Cause {
  type: string;
  subtype: string;
}

export class Etiology {
  etiology: string;
  relationship: string; // todo -- should probably be enum
  inheritancePattern: string; // todo should be enum
}

export class Disease {

   static displayFields() {
    return [
    'synonyms',
    'hpo',
    'inheritance',
    'categories',
    'diagnosis',
    'progression',
    'statistics',
    'ageOfOnset',
    'epidemology',
    'cause',
    'causeStatus',
    'causeType',
    'geneticEtiology',
    'meshTerms',
    'treatments',
    'clinicalGuideline'
  ];
    }

    properties?: Map<string, any>;
  synonyms?: GardDataProperty[] | string[];
  hpo?: GardDataProperty[];
  inheritance?: GardDataProperty[];
  xrefs?: GardDataProperty[];
  is_rare?: boolean;
  uri?: string;
  gard_id?: string;
  name?: string;
  categories?: GardDataProperty[];
  /**
   * Diagnosis source text
   */
  diagnosis?: GardDataProperty[];

  /**
   * Progression source Text
   */
  progression?: GardDataProperty[];

  statistics?: GardDataProperty[];
  created?: any; // neo4j number object {high, low}
  id?: any; // neo4j number object {high, low}

  ageOfOnset?: AGE_OF_ONSET[];
  epidemology?: Epidemology;

// todo: should this just be 1 object?
  cause?: GardDataProperty[];
  causeStatus?: CAUSE_STATUS;
  causeType?: Cause;

  geneticEtiology?: Etiology[];

// todo create mesh service
  meshTerms?: string[];

// todo - this should be a list of treatment objects
  treatments?: GardDataProperty[];

  clinicalGuideline?: 'Diagnostic' | 'Treatment';
  codes?: string[];
  omimCodes?: string[];
}

export class DiseaseSerializer implements Serializer {

  constructor(
    // @Inject(DomSanitizer) public sanitizer: DomSanitizer
  ) {
  }

  fromJson(json: any): Disease {
    const obj = new Disease();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    if(json.properties) {
      obj.properties = new Map<string, any>();
      json.properties.forEach(prop => obj.properties.set(prop.field, prop.values));
    }

    // array of strings
    if (json.synonyms) {
    //  obj.synonyms = json.synonyms.map(val => new GardDataProperty({value: val}));
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


    if (obj.properties && obj.properties.has('inheritance')) {
      obj.inheritance = obj.properties.get('inheritance').map(val => new GardDataProperty(val));
    //  delete obj['Inheritance'];
    }

    if (json.Statistics) {
      obj.statistics = [json.Statistics].map(val => new GardDataProperty({value: val, propertyType: 'html'}));
      delete obj['Statistics'];
    }

    if(obj.codes) {
      obj.omimCodes = [];
      obj.codes.forEach(code => {
        const omim = code.split('OMIM:');
        if(omim.length > 1) {
          console.log(omim);
          obj.omimCodes.push(omim[1]);
        }
      });
      if(obj.omimCodes.length === 0) {
        delete obj.omimCodes;
      }
    }

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
