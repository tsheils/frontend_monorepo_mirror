import {GardBase} from "../models/gard-base";
import {GardReference} from "../models/gard-reference";
import {Serializer} from "../../../../../interfaces/core-interfaces/src/lib/interfaces/serializer";

export class GeneAssociation extends GardBase {
  geneAssociationType: string;
  genes: Gene[];

  constructor(){
    super();
  }
}

export class GeneAssociationViewConfig {
  private _config: Map<string, {}> = new Map<string, {}>(
    [
      ['geneAssociationType', {field: 'geneAssociationType', label: 'Gene Association Type'}],
      ['genes', {field: 'genes', label: 'Genes', type: 'table', config: new GeneViewConfig().config}],
    ]
  );
  config: any[] = Array.from(this._config.values());
}


export class Gene extends GardBase {
  name: string;
  symbol: string;
  id: string;
  references: GardReference[];

  constructor(){
    super();
  }
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
  constructor() {
  }

  fromJson(json: any): Gene {
    const obj = new Gene();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);


    obj.references = [
      new GardReference({source: 'ORPHA', value: obj.id.split(':')[1]}),
      new GardReference({source: 'PHAROS', value: obj.symbol})
    ]

    return obj;
  }
}

  export class GeneAssociationSerializer implements Serializer {
  constructor() {}

  fromJson(json: any): GeneAssociation {
    const obj = new GeneAssociation();
    const serializer: GeneSerializer = new GeneSerializer();
    obj.geneAssociationType = json.geneAssociationType;
    obj.genes = json.displayvalue.map(gene => serializer.fromJson(gene));
    return obj;
  }

}
