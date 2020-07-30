import {GardBase} from "../models/gard-base";
import {GardReference} from "../models/gard-reference";
import {Serializer} from "../../../../../interfaces/core-interfaces/src/lib/interfaces/serializer";

export class Gene extends GardBase {
  name: string;
  symbol: string;
  id: string;
  references: GardReference[];

  constructor(){
    super();
  }
}



export class Prevalence extends GardBase {
  prevalenceGeographic?: string;
  prevalenceType?: string;
  prevalenceQualification?: string;
  prevalenceValidationStatus?: string;
  prevalenceClass?: string;
  source?: GardReference[];
  value?: string | number;


}

export class GeneViewConfig {
  private _config: Map<string, {}> = new Map<string, {}>(
    [
      ['symbol', {field: 'symbol', label: 'Gene Symbol', sortable: true}],
      ['name', {field: 'name', label: 'Name', sortable: true}],
      ['references', {field: 'references', label: 'References', sortable: true}]
    ]
  );

  config: any[] = Array.from(this._config.values());

}

export class GeneSerializer implements Serializer {

  constructor(
  ) {
  }

  fromJson(json: any): Gene {
    const obj = new Gene();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);


      obj.references = [
        new GardReference({source: 'ORPHA', value:  obj.id.split(':')[1]}),
        new GardReference({source: 'PHAROS', value:  obj.symbol})
        ]

    return obj;
  }

}
