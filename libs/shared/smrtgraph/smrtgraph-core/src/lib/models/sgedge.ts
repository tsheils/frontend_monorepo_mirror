import {SimulationLinkDatum} from 'd3-force';
import {SGNode} from "./sgnode";

/**
 * d3 link object
 */
export class SGEdge implements SimulationLinkDatum<SGNode> {
  //  optional - defining optional implementation properties - required for relevant typing assistance
  /**
   * link index number
   */
  index?: number;

  //  must - defining enforced implementation properties
  /**
   * source node can be a node object, id string or id number
   */
  source: SGNode; // | string | number;
  /**
   * target node can be a node object, id string or id number
   */
  target: SGNode; // | string | number;
  /**
   * properties object
   */
  properties?: any;
  /**
   * id string
   */
  id: string;
  /**
   * link type
   */
  type: string;
  /**
   * link qualifier
   */
  qualifier: string;

  /**
   * type of edge - controls arrow direction
   */
  edgeType: string;

  classList: string[] = [];
  /**
   * create new link
   * @param source
   * @param target
   * @param data
   */
  constructor(source, target, data) {
    this.source = source;
    this.target = target;
    if (data) {
      this.type = data.type || '';
      this.properties = data.properties;
      this.id = data.identity ? data.identity.low : 0;
      this.qualifier = data.properties ? data.properties.qualifier : '';
    }
  }

  /**
   * get id of source node
   */
  getSourceId(): string {
    const source = this.source;
    if (typeof source === 'string') {
      return source;
    } else {
      return this.source.id;
    }
  }

  /**
   * get id of target node
   */
  getTargetId() {
    const target = this.target;
    if (typeof target === 'string') {
      return target;
    } else {
      return this.target.id;
    }
  }
}
