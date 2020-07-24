import {Component, ElementRef, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as d3 from 'd3';
import {select} from 'd3-selection';
import {SGNode} from "../../models/sgnode";
import {SmrtGraph} from "../../models/smrt-graph";


@Component({
  selector: '[node]',
  templateUrl: './node-ui.component.html',
  styleUrls: ['./node-ui.component.scss']
})
export class NodeUiComponent implements OnInit {

  /**
   * node passed in from graph
   */
  @Input() node: SGNode;

  /**
   * node passed in from graph
   */
  @Input() graph: SmrtGraph;
  /**
   * node label
   */
  label: string;
  /**
   * boolean to display clicked properties
   */
  nodeClicked = false;
  /**
   * display name if different from node name
   */
  displayName: string;

  /**
   * output event on node hover
   */
  @Output() readonly nodeHover: EventEmitter<{node: SGNode, on?: boolean}> = new EventEmitter<{node: SGNode, on?: boolean}>();

  /**
   * output event on node drag
   */
  @Output() readonly nodeDragging: EventEmitter<{start: boolean}> = new EventEmitter<{start: boolean}>();

  /**
   * output event on node hover
   */
  @Output() readonly nodeClick: EventEmitter<{node: SGNode, event: Event, on?: boolean}> =
    new EventEmitter<{node: SGNode, event: Event, on?: boolean}>();



  constructor(
    private _element: ElementRef
  ) {}


  ngOnInit(): void {
    this.setHover();
  }


  /**
   * emit node click event
   */
  clickedNode(event): void {

    /** A method to bind click events to an svg element */
      // emits the node for other components to listen for
    const d3element = select(this._element.nativeElement);
    const clickFunction = (): void => {
      if(this.nodeClicked){
        this.nodeClick.emit({node: this.node, event: event, on: false});
        this.nodeClicked = false;
      } else {
        this.nodeClick.emit({node: this.node, event: event, on: true});
        this.nodeClicked = true;
      }
      d3.event.stopPropagation();
    };
    d3element.on('click', clickFunction);
  }

  setHover() {
    let isDragging = false;
    const d3element = select(this._element.nativeElement);

    const mouseOverFunction = (): void => {
      d3element.select('.node-child').classed('hovering', true);
      if (isDragging || d3.event.defaultPrevented) {
        return;
      }
      this.nodeHover.emit({node: this.node, on: true})
    };

    const mouseOutFunction = (): void => {
      this.nodeHover.emit({node: this.node, on: false});
      d3element.select('.node-child').classed('hovering', false);
    };

    d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);

    const started = (): void => {
      isDragging = true;
      d3.event.sourceEvent.preventDefault();
      d3.event.sourceEvent.stopImmediatePropagation();
      if (!d3.event.active) {
        console.log("should start drtagging animation");
        this.nodeDragging.emit({start: true});
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
        console.log("should stop fraffing animation")
     //   this.graph.simulation.alphaTarget(0);
        this.nodeDragging.emit({start: false});

      }
     // this.graph.simulation.stop();
      isDragging = false;
    };

    d3element.call(d3.drag()
      .on('start', started)
      .on('drag', dragged)
      .on('end', ended)
    );
  }
}




