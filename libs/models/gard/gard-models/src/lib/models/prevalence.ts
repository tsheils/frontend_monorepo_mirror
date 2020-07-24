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
      ['source', {field: 'source', label: 'references', sortable: true}]
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
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    if(json.PrevalenceGeographic) {
      obj.prevalenceGeographic = json.PrevalenceGeographic;
      delete obj['PrevalenceGeographic'];
    }

    if(json.PrevalenceType) {
      obj.prevalenceType = json.PrevalenceType;
      delete obj['PrevalenceType'];
    }

    if(json.PrevalenceQualification) {
      obj.prevalenceQualification = json.PrevalenceQualification;
      delete obj['PrevalenceQualification'];
    }

    if(json.PrevalenceValidationStatus) {
      obj.prevalenceValidationStatus = json.PrevalenceValidationStatus;
      delete obj['PrevalenceValidationStatus'];
    }

    if(json.PrevalenceClass) {
      obj.prevalenceClass = json.PrevalenceClass;
      delete obj['PrevalenceClass'];
    }

    if(json.ValMoy) {
      obj.value = json.ValMoy.low ? json.ValMoy.low : json.ValMoy;
      delete obj['ValMoy'];
    }

    if(json.Source) {
      obj.source = json.Source.map(src => new GardReference({source: 'PUBMED', value:  src.low ? src.low : src}));
      delete obj['Source'];
    }

    delete obj.dateCreated;
    delete obj['created'];
    return obj;
  }

}
