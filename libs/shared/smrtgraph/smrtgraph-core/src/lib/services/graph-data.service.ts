import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {SGNode} from '../models/sgnode';
import {SmrtGraphData} from '../models/smrt-graph';

/**
 * service to apply data changes to a graph
 * all node and edge generation should happen in a parent service
 */
@Injectable({
  providedIn: 'root'
})
export class GraphDataService {
  graph: SmrtGraphData;

  eventData: any;

  history = [];
  //  Observable navItem source
/*  private graphHistorySource = new Subject<any>();
  historyMap: Map<string, any> = new Map();
  graphhistory$ = this.graphHistorySource.asObservable();*/
  originalEvent: string;
  noResults = false;
  filter = false;
  nodeList: any = [];
  edgeList: any = [];

  constructor(
  ) {
  //  this.makeGraph();
  }

  setGraph(graph: SmrtGraphData) {
    console.log(graph);
    this.nodeList = graph.nodes;
    this.edgeList = graph.edges;
    this.graph = graph;
   // this.countEdges();
    //   this.graphHistorySource.next(graph);
  }
  /**
   * updates graph with new nodes and edges. filters out existing ones so as to not constantly create the same node
   * @returns void
   */
  makeGraph(): void {
    const newNodes = this.nodeList.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
    const newEdges = this.edgeList.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });

    const diff = {
      removedNodes: this.graph.nodes.filter(node => newNodes.indexOf(node) === -1),
      addedNodes: newNodes.filter(node => this.graph.nodes.indexOf(node) === -1),
      removedEdges: this.graph.edges.filter(edge => newEdges.indexOf(edge) === -1),
      addedEdges: newEdges.filter(edge => this.graph.edges.indexOf(edge) === -1)
    };

    if (this.eventData) {
      //  this.historyMap.set(this.eventData.id, diff);
    }
    // apply diff to current graph
    this.applyDiff(diff);
   // this.countEdges();
    // update graph
  //  this.graphHistorySource.next(this.graph);
    this.nodeList = [];
    this.edgeList = [];
    this.filter = false;
  }

  /**
   * applies the updates to the graph, adds new nodes/edges and removes dead ones
   * @param diff
   * @returns void
   */
  applyDiff(diff: any): void {
    // todo: it is possible to expand a node connected to an expanded node.
    // todo If the original node is closed, the second expanded nodes are still visible
    // todo: need to iterate over remaining nodes and edges and remove them
    if (this.filter === true) {
      diff.removedNodes.forEach(node => {
        this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
      });
      diff.removedEdges.forEach(edge => {
        this.graph.edges.splice(this.graph.edges.indexOf(edge), 1);
      });
    }
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));
    diff.addedEdges.forEach(edge => {
      this.graph.edges.push(edge);
    });
  }

  /**
   * returns a count of edges for each node. Used to track node diameter size
   */
  countEdges(): void {
    this.graph.nodes.forEach(node => node.edgeCount = 1);
      this.graph.edges.forEach(edge => {
        const source: SGNode = edge.source as SGNode;
        const target: SGNode = edge.target as SGNode;
        source.edgeCount++;
        target.edgeCount++;
      })
  }

  /**
   * empties nodes and edges from graph, broadcasts empty object to all subscribers
   */
  clearGraph(): void {
    this.graph.edges = [];
    this.graph.nodes = [];
// todo this originally passed clear event to nodeservice and edgeservice
   // this.graphHistorySource.next(this.graph);
  }

   /**
    * returns an object containing a node array and a edge array
    * download button uses this
    */
  returnGraph(): any {
    return this.graph;
  }

  /**
   * search over existing node names
   * @param q
   */
  searchNodes(q: string) {
    return of(this.graph.nodes.filter(node => node.name.toLowerCase().includes(q.toLowerCase())));
  }
}
