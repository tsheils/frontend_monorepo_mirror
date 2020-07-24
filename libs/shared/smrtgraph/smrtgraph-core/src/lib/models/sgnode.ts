import {SimulationNodeDatum} from 'd3-force';

/**
 * serializer interface for nodes
 */
export interface Serializer {

  /**
   * create node from json
   * @param obj
   * @param id
   */
  fromJson(obj: any, id?: string): SGNode;

  /**
   * return node as flat json
   * @param node
   */
  toJson(node: SGNode): any;

  /**
   * merge node data
   * @param  node
   * @param data
   */
  mergeNodes(node: SGNode, data: any): SGNode;
}

/**
 * serializer for ligand object operations
 */
export class NodeSerializer implements Serializer {

  /**
   * no args constructor
   */
  constructor () {}

  /**
   * create ligand object from json
   * @param json
   * @param id
   */
  fromJson(json: any, id?: string): SGNode {
    const obj = new SGNode();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    if(id) {
      obj.id = id;
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

  mergeNodes(node: SGNode, data: any): SGNode {
    Object.entries((data)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }
}

/**
 * node object for d3 graph
 */
export class SGNode implements SimulationNodeDatum {
  //  optional - defining optional implementation properties - required for relevant typing assistance
  /**
   * node index
   */
  index?: number;
  /**
   * x axis value
   */
  x = 0;
  /**
   * y axis value
   */
  y = 0;
  /**
   * x axis velocity
   */
  vx = 0;
  /**
   * y axis velocity
   */
  vy = 0;
  /**
   * x axis function
   */
  fx: number | null;
  /**
   * y axis function
   */
  fy: number | null;
  /**
   * number of edges to each node
   */
  edgeCount;

  /**
   * id string
   */
  id: string;
  /**
   * array of node labels
   */
  labels?: string[];

  /**
   * node type
   */
  type: string;

  /**
   * pharos link for more details
   */
  uri: string;

  shape: 'circle' | 'square' | 'diamond' = 'circle';

  properties: {} = {};
  color;
  tempcolor;

  classList: string[] = [];

  /**
   * node name
   */
  name: string;

  /**
   * return node radius size based on edge count
   */
  get r(): number {
    return 50 * (Math.sqrt(this.edgeCount / 50)) + 15;
  }

  get displayName(): string {
    if (this.name && this.name.length > 30) {
      return this.name.slice(0, 30) + '...';
    } else {
      return this.name ? this.name : '';
    }
  }
}
