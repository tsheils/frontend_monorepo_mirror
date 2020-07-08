import {GardBase, GardDataProperty, GardDataPropertySerializer} from "./gard-base";
import {DomSanitizer} from "@angular/platform-browser";
import {Inject, Optional, SecurityContext} from "@angular/core";
import {GardReference} from "./gard-reference";
import {Serializer} from "@ncats-frontend-library/models/interfaces/core-interfaces";

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

export class Disease extends GardBase {

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

  // done
  properties?: Map<string, any>;
  sourcesMap?: Map<string, any>;
  externalLinks?: GardDataProperty[];
  omimCodes?: string[];

  // in progress
  inheritance?: GardDataProperty[];
  synonyms?: GardDataProperty[];
  references?:  any [];//Publication[];
  sources?: GardReference[];
  hierarchies: any;


  hpo?: GardDataProperty[];
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
}

export class DiseaseSerializer implements Serializer {
  private gardPropertySerializer = new GardDataPropertySerializer();

  constructor(
    // @Inject(DomSanitizer) public sanitizer: DomSanitizer
  ) {
  }

  fromJson(json: any): Disease {
    const obj = new Disease();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    if (json.properties) {
      json.properties.forEach(prop => {
        obj[prop.field] = prop.values.map(val => {
          if (val.tree) {
            val.tree = this._mapEntry(val.tree)
          } else {
            val = this.gardPropertySerializer.fromJson(val);
          }
          return val;
        })
      });
    }
// todo parse this object to a date
    if (json.dateCreated) {
      // obj.dateCreated = json.dateCreated.toString()
    }


    /*  // array of strings
      if (json.categories) {
        obj.categories = json.categories.map(val => gardPropertySerializer.fromJson({value: val}));
      }

      // array of strings
      if (json.xrefs) {
        obj.xrefs = json.xrefs.map(val => gardPropertySerializer.fromJson({value: val}));
      }

      // array of strings
      if (json.HPO) {
        obj.hpo = json.HPO.map(val => gardPropertySerializer.fromJson({value: val}));
        delete obj['HPO'];
      }

      if (json.created) {
        obj.created = new Date(json.created.low).toString();
      }*/

    /*  if (json.Cause) {
        obj.cause = json.Cause.map(val => val = this.gardPropertySerializer.fromJson(val));
        delete obj['Cause'];
      }

      if (json.Diagnosis) {
        obj.diagnosis = json.Diagnosis.map(val => gardPropertySerializer.fromJson({value: val, propertyType: 'html'}));
        delete obj['Diagnosis'];
      }



      if (json.Statistics) {
        obj.statistics = [json.Statistics].map(val => gardPropertySerializer.fromJson({value: val, propertyType: 'html'}));
        delete obj['Statistics'];
      }*/
    return obj;
  }

  /*  /!**
     * recursive mapping function
     * @param obj
     * @return {{}}
     * @private
     *!/
    private _mapField(obj: any) {
      const retObj: any = Object.assign({}, obj);
      Object.keys(obj).map(objField => {
        if (Array.isArray(obj[objField])) {
          retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
        } else {
          retObj[objField] = gardPropertySerializer.fromJson({value: objField, references: []});
        }
      });
      if (obj.__typename) {
        delete retObj.__typename;
      }
      return retObj;
    }*/
  private _mapEntry(entry) {
    return {
      value: entry.value,
      label: entry.label,
      url: entry.url,
      children: entry.isaparent ? entry.isaparent.map(subentry => this._mapEntry(subentry)) : undefined
    };
  }

  /*  private _flattenTree(tree, level, parent?) {
      if(parent && tree) {
        this.pairs.push({parent: tree.node, child: parent, level: level - 1});
      }
      if(tree.parents) {
        tree.parents.forEach(parent => this.flattenTree(parent, level + 1,  tree.node));
      }*/
  // }

}
