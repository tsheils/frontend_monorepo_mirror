import {EventEmitter} from '@angular/core';
import {forceSimulation,
  forceLink,
  forceManyBody, forceCenter, forceCollide} from 'd3-force';
import {SGNode} from "./sgnode";
import {SGEdge} from "./sgedge";


export interface SmrtGraphData {
  nodes: SGNode[];
  edges: SGEdge[];
}


/**
 * d3 graph class ,contains nodes and edges
 */
export class SmrtGraph {
  /**
   * event emitter for graph changes
   * keeps angular from constantly updating it
   */
  public ticker: EventEmitter<forceSimulation<SGNode, SGEdge>> = new EventEmitter();
  /**
   * d3 simulation object
   */
   simulation: forceSimulation<any, any>;


  /**
   * list of graph nodes
   * @type {Node[]}
   */
  public nodes: SGNode[] = [];
  /**
   * list of graph links
   * @type {Link[]}
   */
  public edges: SGEdge[] = [];

  private _options: any;

  /**
   * build new graph
   * @param graph
   * @param options
   */
  constructor(graph: SmrtGraphData, options: any) {
    this._options = options;
    this._initSimulation(graph);
  }

  /**
   * update graph by pushing new nodes/edges list or options
   * @param graph
   * @param options
   */
  update(graph: SmrtGraphData, options?): void {
    this._options = options;
    //  frequently the data is separate from the graph image, so these need to be set for downstream filtering
   // this.nodes = graph.nodes;
  //  this.edges = graph.edges;
    // this.initSimulation(options);
    if (!this.simulation) {
      this._initSimulation(graph);
    ///  throw new Error('simulation was not initialized yet');
    } else {
      this.simulation.nodes(graph.nodes);
    }
    this.simulation.alpha(1).restart();
  }

  /**
   * start new d3 simulation
   * sets all of the physics properties
   * sets ticket event emitter
   * @param graph
   */
  private _initSimulation(graph :SmrtGraphData): void {
    console.log(graph.nodes.length);
    if (!this._options || !this._options.width || !this._options.height) {
      throw new Error('missing options when initializing simulation');
    }
    /** Creating the simulation */
    if (!this.simulation) {
      console.log("creating simulat");
      this.simulation =
        forceSimulation(graph.nodes)
        .force("link", forceLink(graph.edges).id(d => d.id))
        .force("charge", forceManyBody())
        .force("center", forceCenter(this._options.width / 2, this._options.height / 2));

      /*this.simulation = forceSimulation(this.nodes)
      /!* repels the nodes away from each other*!/
        .force("charge", forceManyBody()
          .strength(d => -(1/d.edgeCount))
          .distanceMax(Math.min(options.height, options.width))
          )
        .force('edge', forceLink(this.edges)
            .id(d => d.id)
          .strength( l => 1/Math.min(l.source.edgeCount, l.target.edgeCount))
          .distance(this.edges.length)
        )
        /!* prevents node overlap*!/
    .force('collide', forceCollide()
          .radius(d => d.r + 7).iterations(7))
        /!** Updating the central force of the simulation *!/
        .force("center", forceCenter(options.width / 2, options.height / 2))
        .alphaDecay(.2)
*/
      const ticker = this.ticker;

      //  Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', () => {
        ticker.emit(this.simulation);
      });
    }

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
