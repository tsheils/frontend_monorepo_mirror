import {interpolateViridis} from 'd3-scale-chromatic';
import {scaleDiverging} from 'd3-scale';
import {CytoscapeSerializer, SGNode} from "@ncats-frontend-library/shared/smrtgraph/smrtgraph-core";

/**
 * color scale
 * todo this might not be used, if it is, it probably shouldn't be here
 */
const COLOR = scaleDiverging(interpolateViridis).domain([-60, 0, 100]);

export class SctlNode extends SGNode {
  properties: {
    degree: number
    gene: string,
    hESC_NSC_Fold_Change: number,
    hESC_NSC_Ratio: number,
    Phosph_in_ESC_1_NSC_0_?: number,
    ESC?: number,
    NSC?: number
  }
}

export class SctlNodeSerializer extends CytoscapeSerializer {

  /**
   * no args constructor
   */
  constructor () {
    super();
  }


  /**
   * create ligand object from json
   * @param json
   * @param id
   */
  fromJson(json: any, id?: string): SGNode {
    const convertedJson = super.fromJson(json);
    const obj = new SctlNode();
    Object.entries((convertedJson)).forEach((prop) => obj[prop[0]] = prop[1]);
    if(id) {
      obj.id = id;
    }
    if(obj.properties.Phosph_in_ESC_1_NSC_0_ === 0 || obj.properties.NSC === 1) {
      obj.shape = 'square';
    }
    if(obj.properties.Phosph_in_ESC_1_NSC_0_ === 1 || obj.properties.ESC === 1) {
      obj.shape = 'diamond';
    }

    obj.color = !obj.properties.hESC_NSC_Fold_Change || obj.properties.hESC_NSC_Fold_Change === -100 ?
      '#CCCCCC' : COLOR(-obj.properties.hESC_NSC_Fold_Change);

    return obj;
  }

  /**
   * flatten object to json
   * @param obj
   */
  toJson(obj: SGNode): any {
    return [];
  }

  mergeNodes(node: SctlNode, data: any): SctlNode {
    /*    const tempNode: SGNode = this.fromJson(data);
        Object.entries((node)).forEach((prop) => tempNode[prop[0]] = prop[1]);
        node = tempNode;
        */
    Object.entries((data.properties)).forEach((prop) => node.properties[prop[0]] = prop[1]);
    return node;
  }
}


