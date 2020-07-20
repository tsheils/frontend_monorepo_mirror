import {Injectable} from '@angular/core';
import {SGNode, NodeSerializer, Serializer} from '../models/sgnode';
import {NodeMappingInterface} from '../interfaces/node-mapping-interface';
import {of} from 'rxjs';


/**
 * service to create and update nodes
 */
@Injectable({
  providedIn: 'root'
  }
)
export class NodeService implements NodeMappingInterface<SGNode> {
  constructor() {
    console.log("new node service")
  }
  /**
   * map of all nodes all changes are saved here
   */
  masterNodeMap: Map<string, SGNode> = new Map<string, SGNode>();

  serializer: NodeSerializer = new NodeSerializer();


  setSerializer(serializer: Serializer): void {
      this.serializer = serializer;
  }
   /**
    * returns all created nodes as an array
    */
  getNodesArr(): SGNode[] {
    return Array.from(this.masterNodeMap.values());
  }

  /**
   * fetch node in map
   * @param id
   * @param data
   */
  getById(id: string, data?: any): SGNode {
    if(this.masterNodeMap.has(id)) {
      // todo should i merge data just in case?
      return this.masterNodeMap.get(id);
    } else {
      if(!data) {
        data = {};
      }
      return this.makeNode(data, id);
    }
  }

  /**
   * set node in map
   * @param node
   */
  setNode(node: SGNode): void {
     this.masterNodeMap.set(node.id, node);
  }

  /**
   * searches map to see if a node exists. if it does, it returns the node,
   * if it doesn't exist, it makes a new node with the data
   * @param id
   * @param data
   */
  makeNode<T extends SGNode>( data: any, id?: string): SGNode {
    let n: SGNode = this.masterNodeMap.get(id) ;
    if (!n) {
      n = this.serializer.fromJson(data);
      n.edgeCount = 1;
      if(id) {
        // this covers if the user generates a different id than the one included in the data
        n.id = id;
      }
    } else {
      const tempNode: T = this.serializer.fromJson(data) as T;
      n = this.serializer.mergeNodes(n, tempNode);
      if(id) {
        // this covers if the user generates a different id than the one included in the data
        n.id = id;
      }
    }
    this.setNode(n);
    return n;
  }

  empty() {
    this.masterNodeMap.clear();
  }

  /**
   * search over existing node names
   * @param q
   * @param property
   */
  searchNodes(q: string, property?: string) {
    return of(this.getNodesArr().filter(node => node[property ? property : 'name'].toLowerCase().includes(q.toLowerCase())));
  }


}
