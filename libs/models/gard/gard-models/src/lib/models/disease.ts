import {GardBase, GardDataProperty, GardDataPropertySerializer} from "./gard-base";
import {DomSanitizer} from "@angular/platform-browser";
import {Inject, Optional, SecurityContext} from "@angular/core";
import {GardReference} from "./gard-reference";
import {Serializer} from "@ncats-frontend-library/models/interfaces/core-interfaces";
import {Prevalence, PrevalenceSerializer} from "./prevalence";
import {GeneAssociationSerializer} from "./gene";

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
  inheritance?: GardDataProperty[];
  synonyms?: GardDataProperty[];
  references?:  any [];//Publication[];
  sources?: GardReference[];
  hierarchies: any;

  epidemology?: Prevalence[];



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
  private prevalenceSerializer = new PrevalenceSerializer();
  private geneAssociationSerializer = new GeneAssociationSerializer();

  constructor() {
  }

  fromJson(json: any): Disease {
    const obj = new Disease();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    if (json.properties) {
      json.properties.forEach(prop => {
        switch (prop.field) {
          case 'references': {
            if (prop.displayvalue) {
              obj[prop.field] = prop.displayvalue.map(val => {
                const ref = new GardReference(val);
                const data = {
                  value: ref.label,
                  references: [ref],
                  type: 'reference'
                };
                return this.gardPropertySerializer.fromJson(data);
              });
            }
            break;
          }
          case 'epidemiology': {
            if (prop.displayvalue) {
              obj[prop.field] = prop.displayvalue.map(val => this.prevalenceSerializer.fromJson(val));
            }
            break;
          }

          case 'genes': {
            if (prop.propertylistvalue) {
              obj[prop.field] = prop.propertylistvalue.map(val => this.geneAssociationSerializer.fromJson(val));
            }
            break;
          }

          case 'hierarchies': {
            if (prop.displayvalue) {
              obj[prop.field] = prop.displayvalue.map(val => this._mapEntry(val, 0));
              obj.hierarchies.forEach(hier => {
               if (hier.value.split('MONDO').length > 1) {
                 hier.source = 'MONDO'
               } else {
                 hier.source = 'Orphanet'
               }
              })
            }
            break;
          }
          default: {
            if (prop.displayvalue) {
              obj[prop.field] = prop.displayvalue.map(val => this.gardPropertySerializer.fromJson(val));
            }
            /*obj[prop.field] = prop.values.map(val => {
              if (val.tree) {
                val.tree = this._mapEntry(val.tree)
              } else {
                val = this.gardPropertySerializer.fromJson(val);
              }
              return val;
            });*/
            break;
          }
        }
      });
    }
// todo parse this object to a date
    if (json.dateCreated) {
      // obj.dateCreated = json.dateCreated.toString()
    }

    return obj;
  }


  private _mapEntry(entry, level) {
    return {
      value: entry.value,
      label: level === 0 ? entry.label : 'is a ' + entry.label,
      url: entry.url,
      children: entry.isachild ? entry.isachild.map(subentry => this._mapEntry(subentry, level+1)) : undefined
    };
  }
}
