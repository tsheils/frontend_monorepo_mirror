import {NodeSerializer, SGNode} from './sgnode';

interface Neo4jNode {
  identity: {low: number, high: number};
  labels: string[];
  properties: any;
}

export class Neo4jNodeSerializer implements NodeSerializer {

  /**
   * no args constructor
   */
  constructor () {}

  /**
   * create node from neo4j cast object json
   * @param json
   */
  fromJson(json: Neo4jNode): SGNode {
    const obj = new SGNode();
    if(Object.keys(json).length) {
      Object.entries((json.properties)).forEach((prop: any[]): void => {
        obj.properties[prop[0]] = prop[1]
      });      // neo4j best practice recommends creating an id (or uuid) property, if this exists, use that
      if (json.properties && json.properties.uuid) {
        obj.id = json.properties.uuid;
        // else use the node identity property
      } else if (json.properties && json.properties.id) {
        obj.id = json.properties.id;
      } else {
        obj.id = json.identity.low > 0 ? json.identity.low.toString() : json.identity.high.toString();
      }
      obj.labels = json.labels;
    }
      return obj;
  }


  /**
   * flatten object to json
   * @param obj
   */
  toJson(obj: SGNode): any {
    return [];
  }

  /**
   * merges neo4j properties and node properties
   * merges label lists, removing duplicates
   * @param node
   * @param data
   * @return
   */
  mergeNodes(node: SGNode, data: Neo4jNode): SGNode {
    Object.entries((data.properties)).forEach((prop) => node.properties[prop[0]] = prop[1]);
    node.labels = Array.from(new Set(node.labels.concat(data.labels)));
    return node;
  }
}
