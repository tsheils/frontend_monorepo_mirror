import {NodeSerializer, SGNode} from './sgnode';

interface CytoscapeNode {
  data: {name: string, id: string};
  position: {x: number, y: number};
  selected: boolean;
}

export class CytoscapeSerializer implements NodeSerializer {
  /**
   * no args constructor
   */
  constructor () {}

  /**
   * create ligand object from json
   * @param json
   * @param id
   */
  fromJson(json: CytoscapeNode): SGNode {
    const obj: SGNode = new SGNode();
    Object.entries((json.data)).forEach((prop: any[]): void => {
      obj.properties[prop[0]] = prop[1]
    });
    if (json.position) {
      obj.x = json.position.x;
      obj.y = json.position.y;
    }
    obj.name = json.data.name;
    obj.id = json.data.id;
    obj.labels = [json.data.name];
    return obj;
  }

  /**
   * flatten object to json
   * @param obj
   */
  toJson(obj: SGNode): any {
    return [];
  }

  mergeNodes(node: SGNode, data: CytoscapeNode): SGNode {
    /*    const tempNode: SGNode = this.fromJson(data);
        Object.entries((node)).forEach((prop) => tempNode[prop[0]] = prop[1]);
        node = tempNode;
        */
    Object.entries((data.data)).forEach((prop) => node.properties[prop[0]] = prop[1]);
    return node;
  }
}
