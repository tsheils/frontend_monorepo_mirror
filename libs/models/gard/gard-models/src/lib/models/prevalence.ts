import {GardBase} from "../models/gard-base";
import {GardReference} from "../models/gard-reference";
import {Serializer} from "../../../../../interfaces/core-interfaces/src/lib/interfaces/serializer";

export class Prevalence extends GardBase {
  prevalenceGeographic?: string;
  prevalenceType?: string;
  prevalenceQualification?: string;
  prevalenceValidationStatus?: string;
  prevalenceClass?: string;
  source?: GardReference[];
  references?: GardReference[];
  value?: string | number;

  constructor(){
    super();
  }
}

export class PrevalanceViewConfig {
  private _config: Map<string, {}> = new Map<string, {}>(
    [
      ['prevalenceType', {field: 'prevalenceType', label: 'Type', sortable: true}],
      ['prevalenceGeographic', {field: 'prevalenceGeographic', label: 'Location', sortable: true}],
      ['prevalenceQualification', {field: 'prevalenceQualification', label: 'Qualification', sortable: true}],
      ['value', {field: 'value', label: 'Actual Value', sortable: true}],
      ['prevalenceClass', {field: 'prevalenceClass', label: 'Class', sortable: true}],
      ['prevalenceValidationStatus', {field: 'prevalenceValidationStatus', label: 'Validation Status', sortable: true}],
      ['references', {field: 'references', label: 'References', sortable: true}]
    ]
  );

  config: any[] = Array.from(this._config.values());

}

export class PrevalenceSerializer implements Serializer {

  constructor(
  ) {
  }

  fromJson(json: any): Prevalence {
    const obj = new Prevalence();
 //   Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    if(json.prevalenceGeographic) {
      obj.prevalenceGeographic = json.prevalenceGeographic;
    }

    if(json.prevalenceType) {
      obj.prevalenceType = json.prevalenceType;
    }

    if(json.prevalenceQualification) {
      obj.prevalenceQualification = json.prevalenceQualification;
    }

    if(json.prevalenceValidationStatus) {
      obj.prevalenceValidationStatus = json.prevalenceValidationStatus;
    }

    if(json.prevalenceClass) {
      obj.prevalenceClass = json.prevalenceClass;
    }

    if(json.ValMoy) {
      obj.value = json.ValMoy.low ? json.ValMoy.low : json.ValMoy;
    }

    if(json.datasourcereference) {
      obj.source = json.datasourcereference.map(src => new GardReference(src));
    }

    if(json.referencesource) {
      obj.references = json.referencesource.map(src => new GardReference(src));
    }
    return obj;
  }

}
