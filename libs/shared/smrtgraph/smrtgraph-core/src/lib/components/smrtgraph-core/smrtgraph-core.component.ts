import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as d3 from 'd3';
import {forceSimulation,
  forceLink,
  forceManyBody, forceCenter, forceCollide} from 'd3-force';
import {zoom, zoomIdentity} from 'd3-zoom';
import {select} from 'd3-selection';
import {SmrtGraph, SmrtGraphData} from '../../models/smrt-graph';
import {SGEdge} from '../../models/sgedge';
import {SGNode} from '../../models/sgnode';


@Component({
  selector: 'smrtgraph',
  templateUrl: './smrtgraph-core.component.html',
  styleUrls: ['./smrtgraph-core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SmrtgraphCoreComponent implements OnInit {

  /**
   * container that holds the radar chart object
   */
  @ViewChild('fdg', {static: true} ) chartContainer: ElementRef;

  simulation: any;

  /**
   * initialize a private variable _data, it's a BehaviorSubject
   */
  protected _graph_data = new BehaviorSubject<SmrtGraphData>({nodes: [], edges: []});

  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set graph(value: SmrtGraphData) {
      this._graph_data.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   */
  get graph(): SmrtGraphData {
    return this._graph_data.getValue();
  }

  /**
   * show or hide loading modal
   */
  loading = false;


  /**
   * d3 graph options
   * updated dynamically
   */
  _options: {width, height} = {width: 1000, height: 1000};

  /**
   * d3 configured graph object
   */
   _smrtGraph: SmrtGraph //= new SmrtGraph(this.graph, this._options);


  hoveredEdges: SGEdge[];

  nonNeighbors: SGEdge[];

  svg: any;

  edges: any[] = [];
  nodes: any[] = [];

  chart: any;
  /**
   * output event on node events
   */
  @Output() readonly nodeEvents: EventEmitter<{nodeHover?: SGNode, event: any}> = new EventEmitter<{nodeHover: SGNode, event: any}>();  /**

   * output event on edge events
   */
  @Output() readonly edgeEvents: EventEmitter<{edgeHover?: SGEdge, event: any}> = new EventEmitter<{edgeHover: SGEdge, event: any}>();

  @Output() readonly svgEvents: EventEmitter<{svgClick: boolean}> = new EventEmitter<{svgClick: boolean}>();

  /**
   * rescales the graph on window resize
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
 //   this.resize();
  }

  /**
   * create services
   * @param ref
   * @param el
   */
  constructor(
    private ref: ChangeDetectorRef,
    private el: ElementRef
  ) {
  }

  /**
   * set up loading modal subscription
   * set up graph data subscription
   */
  ngOnInit() {
    console.log(this);
    // this.graphObject = new GraphSimulation(this.graph, this._options);



    /**
     * Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */

   // this.chart = () => {

    this._graph_data
      .subscribe(x => {
        if(x) {
          if(!this.svg){
            console.log("draw")
            this._smrtGraph = new SmrtGraph(this.graph, this._options);
            this.svg = select('#fdg');
            this._smrtGraph.ticker.subscribe((d) => {
              this.ref.markForCheck();
            });

            //    this.drawSmrtgraph();
            this.zoom();
          }
          console.log("update");
          // this.chart.update(this.graph);
          this._smrtGraph.update(this.graph, this.options)
        }
      //
       // this.drawSmrtGraph(this.graph);
        // this._smrtGraph.update(this.graph, this.options);
      });

  }


/*
  drawSmrtgraph() {
    const element = this.chartContainer.nativeElement;
    this.svg = select(element)
      .append('svg:svg')
      .attr('id', "fdg")
      .attr('viewBox', [-this._options.width / 2, -this._options.height / 2, this._options.width, this._options.height])
      .on('click',  () => {
        console.log('click');
        this.svgEvents.emit({svgClick: true});
        //  this._clearNodes()
      });

      const container = this.svg.append('svg:g')
      .attr('id', 'root')

    let edge = container.append('g')
      .selectAll('line');


    let squareNode = container.append('g')
      .attr('class', 'node-child')
      .selectAll('square-node');

    let diamondNode = container.append('g')
      .selectAll('diamond-node');

    let circleNode = container.append('g')
      .selectAll('circle-node');

    let allNodes = container.selectAll('node-child');

    console.log(allNodes.length);

      const ticked = () => {

        edge.attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

      circleNode
        .attr('cx', d =>  d.x)
        .attr('cy', d => d.y);

      squareNode
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      diamondNode
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    };

    console.log(squareNode);
    console.log(circleNode);

    let simulation =
      forceSimulation(this.graph.nodes)
     //   .force('edge', forceLink(this.graph.edges))
        .force('charge', forceManyBody())
        .force('center', forceCenter(this._options.width / 2, this._options.height / 2))
        .on('tick', ticked)
    ;

    // Terminate the force layout when this cell re-runs.
   // invalidation.then(() => simulation.stop());

    const dragNode = (simulation) => {
      console.log("dragging")
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
       // d.fx = null;
      //  d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }


    this.chart = Object.assign(this.svg.node(), {
      update({nodes, edges}) {
        // Make a shallow copy to protect against mutation, while
        // recycling old nodes to preserve position and velocity.
     //   const old = new Map(node.data().map(d => [d.id, d]));
      //  nodes = nodes.map(d => Object.assign(old.get(d.id) || new SGNode(), d));
      //  edges = edges.map(d => Object.assign(new SGEdge(d.source, d.target, d), d));

        edge = edge
          .data(edges)
          .join('svg:line')
          .attr('class', 'edge');

        circleNode = circleNode
          .data(nodes.filter(node => node.shape && node.shape === 'circle'))
          .join('svg:circle')
          .attr('class', 'node-child circle-node')
          .attr('r', d => d.r)
          .attr('x', d => d.x)
          .attr('y', d => d.y)
            .attr('fill', d => d.color)
          .attr('transform', d => 'translate(' + d.r + ',' + (d.r) + ')')
          .call(dragNode(simulation))

        squareNode = squareNode
          .data(nodes.filter(node => node.shape && node.shape === 'square'))
          .join('svg:rect')
          .attr('class', 'node-child square-node')
          .attr('width', d => d.r*2)
          .attr('height', d => d.r*2)
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .attr('fill', d => d.color)
          .attr('transform', d => 'translate(' + -d.r + ',' + (-d.r) + ')')
          .call(dragNode(simulation))
        ;

        diamondNode = diamondNode
          .data(nodes.filter(node => node.shape && node.shape === 'diamond'))
          .join('svg:rect')
          .attr('class', 'node-child diamond-node')
          .attr('width', d => d.r * 2)
          .attr('height', d => d.r * 2)
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .attr('transform', d=> 'translate(' + (d.r / 2) + ',' + (-d.r / 2) + ')rotate(45 ' + d.r +' '+ -d.r+')')
          .attr('fill', d => d.color)
          .call(dragNode(simulation))
        ;

        console.log(squareNode.data());
        console.log(squareNode.length);
        console.log(circleNode.length);
        console.log(nodes);
        console.log(edges);

        simulation.nodes(nodes);
       // simulation.force('edge').links(edges);
        simulation.alpha(.5).restart();
      }
    });
    // }
  }
*/


    // Terminate the force layout when this cell re-runs.
  //  const chart =  Object.assign(this.svg.node(), {



  ngAfterViewInit() {
  //  this.zoom();
  }

  /*  downloadGraph(): void {
      this.downloader.downloadFile(d3.select('svg'), this.options);
    }*/


  /**
   * dynamically sets the size of the graph
   */
  get options() {
    if ((this.el.nativeElement.parentElement && this.el.nativeElement.parentElement.offsetWidth) &&
      (this.el.nativeElement.parentElement && this.el.nativeElement.parentElement.offsetHeight)) {
      return this._options = {
        width: this.el.nativeElement.parentElement.offsetWidth,
        height: this.el.nativeElement.parentElement.offsetHeight
      };
    } else {
      return this._options = {width: 1200, height: 1000};
    }
  }

  zoom() {
    const container = this.svg.select('#root');
    console.log(container);
    const transform = zoomIdentity.translate(this.options.width / 2,
      this.options.height / 2).scale(.15);

    const zoomed = () => {
      container.attr('transform', d3.event.transform); // updated for d3 v4
    };

    const zooming = zoom().on('zoom', zoomed);

    this.svg
     // .call(zooming.transform, transform) // Calls/inits handleZoom
      .call(zooming);
  }

  hoveredNode(event) {
    let connectedEdges;
    let connectedNodes;
    let neighbors: SGEdge[] = [];
    if(event.on === true) {
      const getNeighborEdges = (e: SGEdge): boolean => {
        const neighbor = (event.node.id === (typeof (e.source) === 'object' ? e.source.id : e.source)
          || event.node.id === (typeof (e.target) === 'object' ? e.target.id : e.target));
        if (neighbor === true) {
          neighbors.push(e);
        }
        return event.node.id === (typeof (e.source) === 'object' ? e.source.id : e.source);
      };

      const getNeighborNodes = (e: any): boolean => {
        return connectedEdges.data().map(edge => edge.target.id).indexOf(e.id) > -1;
      };

      const decorateNodes = (): void => {
        connectedEdges = this.svg.selectAll('.edge')
          .data(this.graph.edges)
          .filter(getNeighborEdges)
          .classed('hovering', true)
          .classed('connected', function(edge) {return edge.edgeType !== 'down'; })
          .classed('connectedflat', function(edge) {return edge.edgeType === 'down'; });

        connectedNodes = this.svg.selectAll('circle')
          .data(this.graph.nodes)
          .filter(getNeighborNodes)
          .classed('hovering', true);
      };
      decorateNodes();
      this.nodeEvents.emit({nodeHover: event.node, event: event})
    } else {
      this.svg.selectAll('.edge')
        .classed('connected', false)
        .classed('connectedflat', false)
        .classed('hovering', false)
        .classed('maximal', false);
      this.svg.selectAll('circle')
        .classed('connected', false)
        .classed('hovering', false)
        .classed('maximal', false);
      this.nodeEvents.emit({nodeHover: null, event: null})
    }
  }

  clickedNode(event) {
    let connectedEdges;
    let nonConnectedEdges;
    let connectedNodes;
    let nonConnectedNodes;

    const getNeighborEdges = (e: SGEdge): boolean => {
      return (event.node.id === (typeof (e.source) === 'object' ? e.source.id : e.source)
        || event.node.id === (typeof (e.target) === 'object' ? e.target.id : e.target));
    };

    const getNonNeighborEdges = (e: SGEdge): boolean => {
      return (event.node.id !== (typeof (e.source) === 'object' ? e.source.id : e.source)
        && event.node.id !== (typeof (e.target) === 'object' ? e.target.id : e.target));
    };

    const getNeighborNodes = (e: any): boolean => {
      return (connectedEdges.data().map(edge => edge.target.id).indexOf(e.id) > -1) ||
        (connectedEdges.data().map(edge => edge.source.id).indexOf(e.id) > -1);
    };

    const getNotNeighborNodes = (e: any): boolean => {
      if((connectedEdges.data().map(edge => edge.target.id).indexOf(e.id) === -1) &&
        (connectedEdges.data().map(edge => edge.source.id).indexOf(e.id) === -1)) {
        e.showLabel = false;
      }
      return (connectedEdges.data().map(edge => edge.target.id).indexOf(e.id) === -1) &&
        (connectedEdges.data().map(edge => edge.source.id).indexOf(e.id) === -1);
    };


    const decorateNodes = (): void => {
      //highlight edges
      connectedEdges = this.svg.selectAll('.edge')
        .data(this.graph.edges)
        .filter(getNeighborEdges)
        .classed('clicked', true);

      nonConnectedEdges = this.svg.selectAll('.edge')
        .data(this.graph.edges)
        .filter(getNonNeighborEdges)
        .classed('not-related', true);

      // highlight neighbor nodes
      connectedNodes = this.svg.selectAll('.node-child')
        .data(this.graph.nodes)
        .filter(getNeighborNodes)
        .classed('clicked', true);

      nonConnectedNodes = this.svg.selectAll('.node-child')
        .data(this.graph.nodes)
        .filter(getNotNeighborNodes)
        .classed('not-related', true);

      // highlight parent
      const parent = this.svg.selectAll('.node-child')
        .data(this.graph.nodes)
        .filter(d => d.id === event.node.id)
        .classed('clicked', true)
        .classed('not-related', false);
    };

    const _clearNodes = (): void => {
      this.svg.selectAll('.edge')
        .classed('clicked', false)
        .classed('not-related', false);
      this.svg.selectAll('.node-child')
        .classed('connected', false)
        .classed('clicked-parent', false)
        .classed('clicked-neighbor', false)
        .classed('not-related', false)
        .classed('clicked', false);
    };
    _clearNodes();
    if(event.on === true) {
      this.nodeEvents.emit({event: event});
      decorateNodes();
    } else {
      this.nodeEvents.emit({ event: event});
    }
  }

  hoveredEdge(event){
    if(event.on === true) {
      this.svg.selectAll('.node-child')
        .data(this.graph.nodes)
        .filter(d => [event.edge.source.id, event.edge.target.id].includes(d.id))
        .classed('hovering', true);
      this.edgeEvents.emit({edgeHover: event.edge, event: event})

    } else {
      this.svg.selectAll('.node-child')
        .classed('hovering', false);
      this.edgeEvents.emit({event: event})
    }
  }

  clickedEdge(event){
    if(event.on === true) {
      this.svg.selectAll('.node-child')
        .data(this.graph.nodes)
        .filter(d => [event.edge.source.id, event.edge.target.id].includes(d.id))
        .classed('clicked', true);

      this.svg.selectAll('.node-child')
        .data(this.graph.nodes)
        .filter(d => ![event.edge.source.id, event.edge.target.id].includes(d.id))
        .classed('not-related', true);

      this.svg.selectAll('.edge')
        .data(this.graph.edges)
        .filter(edge => edge.id !== event.edge.id)
        .classed('not-related', true);
      this.edgeEvents.emit({event: event})
    } else {
      this._clearNodes();
      this.edgeEvents.emit({event: event})
    }
  }

  draggingNode(event) {
    console.log(event);
    if(event.start) {
      this._smrtGraph.simulation.alphaTarget(0.3).restart();
    } else {
      if (!d3.event.active) {
        this._smrtGraph.simulation.alphaTarget(0);
      }
      this._smrtGraph.simulation.stop();
    }
    /*const started = (): void => {
      d3.event.sourceEvent.preventDefault();
      d3.event.sourceEvent.stopImmediatePropagation();
      if (!d3.event.active) {
        console.log('should start drtagging animation');
        this._smrtGraph.simulation.alphaTarget(0.3).restart();
      }
    };

    const dragged = (): void => {
      this.node.fx = d3.event.x;
      this.node.fy = d3.event.y;
    };

    const ended = (): void => {
      d3.event.sourceEvent.stopPropagation();
      d3.event.sourceEvent.preventDefault();
      if (!d3.event.active) {
        console.log('should stop fraffing animation')
        //  this.graph.simulation.alphaTarget(0);
      }
    };

    d3element.call(d3.drag()
      .on('start', started)
      .on('drag', dragged)
      .on('end', ended)
    );*/
  }




  _clearNodes(): void {
    this.svg.selectAll('.edge')
      .classed('clicked', false)
      .classed('hovering', false)
      .classed('not-related', false);
    this.svg.selectAll('.node-child')
      .classed('connected', false)
      .classed('clicked-parent', false)
      .classed('clicked-neighbor', false)
      .classed('not-related', false)
      .classed('clicked', false)
      .classed('hovering', false);
  };

  _manualClick(node: SGNode){
    this._clearNodes();
    let connectedEdges;
    let nonConnectedEdges;
    let connectedNodes;
    let nonConnectedNodes;

    const getNeighborEdges = (e: SGEdge): boolean => {
      return (node.id === (typeof (e.source) === 'object' ? e.source.id : e.source)
        || node.id === (typeof (e.target) === 'object' ? e.target.id : e.target));
    };

    const getNonNeighborEdges = (e: SGEdge): boolean => {
      return (node.id !== (typeof (e.source) === 'object' ? e.source.id : e.source)
        && node.id !== (typeof (e.target) === 'object' ? e.target.id : e.target));
    };

    const getNeighborNodes = (e: any): boolean => {
      return (connectedEdges.data().map(edge => edge.target.uuid).indexOf(e.uuid) > -1) ||
        (connectedEdges.data().map(edge => edge.source.uuid).indexOf(e.uuid) > -1);
    };

    const getNotNeighborNodes = (e: any): boolean => {
      return (connectedEdges.data().map(edge => edge.target.uuid).indexOf(e.uuid) === -1) &&
        (connectedEdges.data().map(edge => edge.source.uuid).indexOf(e.uuid) === -1);
    };

    //highlight edges
    connectedEdges = d3.selectAll('.edge')
      .data(this.graph.edges)
      .filter(getNeighborEdges)
      .classed('clicked', true);

    nonConnectedEdges = d3.selectAll('.edge')
      .data(this.graph.edges)
      .filter(getNonNeighborEdges)
      .classed('not-related', true);

    nonConnectedNodes = d3.selectAll('.node-child')
      .data(this.graph.nodes)
      .filter(getNotNeighborNodes)
      .classed('not-related', true);

    // highlight neighbor nodes
    connectedNodes = d3.selectAll('.node-child')
      .data(this.graph.nodes)
      .filter(getNeighborNodes)
      .classed('clicked-neighbor', true);

    // highlight parent
    const parent = d3.selectAll('.node-child')
      .data(this.graph.nodes)
      .filter(d => d.id === node.id)
      .classed('clicked-neighbor', true)
      .classed('not-related', false);
  };

  resize() {
    this._smrtGraph.update(this.graph, this.options);
    console.log('calling zoom');
    this.zoom();
  }
}

