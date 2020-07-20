import {Observable, Subject} from 'rxjs/index';
import {SGNode} from '../models/sgnode';

/**
 * interface of various node interaction types
 */
export interface NodeInteractionInterface {

  //  Observable navItem source
  /**
   * RxJs Subject to broadcast changes to a clicked node
   * @private
   */
  _clickedNodeSource: Subject<SGNode>;
  /**
   * RxJs Subject to broadcast changes to a hovered node
   * @private
   */
  _hoveredNodeSource: Subject<any>;
  /**
   * RxJs Subject to broadcast changes to both clicked and hovered nodes
   * @private
   */
  _nodeSource: Subject<any>;

  /**
   * Observable for other components to subscribe to
   */
  clickednode$: Observable<SGNode>;
  /**
   * Observable for other components to subscribe to
   */
  nodeList$: Observable<SGNode>;
  /**
   * List of nodes that have been clicked. used internally, modified and broadcast through functions
   */
  clickedNodeList: SGNode[];
  /**
   * SGNode that has been hovered on, wrapped in array. used internally, modified and broadcast through functions
   */
  hoveredNodeList: SGNode[];

  /**
   * Add node to clicked node list
   * @param {SGNode} node
   */
  clickedNodes(node: SGNode): void;


  /**
   * Add node to hovered list and broadcast to subscribers
   * @param {SGNode[]} node
   */
  hoveredNode(node: SGNode[]): void;

  /**
   * remove node from clicked node display list
   * @param {SGNode} node
   */
  removeClickedNode(node: SGNode): void;

  /**
   * broadcast node click event
   * @param {SGNode} node
   */
  changeNode(node: SGNode): void;

  /**
   * removes hovered decorations from all nodes
   */
  clearNode(): void;
}
