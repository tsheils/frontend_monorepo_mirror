import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {select} from 'd3-selection';
import * as d3 from 'd3';
import {SGNode} from "../../models/sgnode";
import {SGEdge} from "../../models/sgedge";


/**
 * visual component for edge object
 */
@Component({
  selector: '[edge]',
  templateUrl: './edge-ui.component.html',
  styleUrls: ['./edge-ui.component.scss']
})
export class EdgeUiComponent implements OnInit {
  /**
   * edge passed in by graph
   */
  @Input() edge: SGEdge;

  /**
   * show the edge label
   */
  showEdgeLabel = true;

  edgeClicked = false;


  /**
   * output event on edge hover
   */
  @Output() readonly edgeHover: EventEmitter<{edge: SGEdge, on?: boolean}> = new EventEmitter<{edge: SGEdge, on?: boolean}>();

  /**
   * output event on edge hover
   */
  @Output() readonly edgeClick: EventEmitter<{edge: SGEdge, event: Event, on?: boolean}> =
    new EventEmitter<{edge: SGEdge, event: Event, on?: boolean}>();

  /**
   * create services
   */
  constructor(
    private _element: ElementRef
  ) {
  }

  /**
   * subscribe to settings change
   */
  ngOnInit() {
    this.setHover();
  }

  clickedEdge() {
    /** A method to bind click events to an svg element */
      // emits the node for other components to listen for
    const d3element = select(this._element.nativeElement);
    const clickFunction = (): void => {
      if(this.edgeClicked) {
        d3element.select('.edge')
          .classed('clicked', true);
        this.edgeClick.emit({edge: this.edge, event: event, on: false});
        this.edgeClicked = false;
      } else {
        d3element.select('.edge')
          .classed('clicked', false);
        this.edgeClick.emit({edge: this.edge, event: event, on: true});
        this.edgeClicked = true;
      }
      d3.event.stopPropagation();
    };
    d3element.on('click', clickFunction);
  }



  /**
   * helper function to return edge properties
   * @param edge
   * @param property
   */
  getSource(edge: SGNode, property: string): number {
    if (edge[property]) {
      return edge[property];
    } else {
      return 0;
    }
  }

  /**
   * function to subtract radius away from line end for arrow
   * @param edge
   * @param attr_name
   */
  endpointLessRadius(edge, attr_name) {
    //  this.source = edge.source;
    //   this.target = edge.target;
    const x1 =  edge.source.x || 0;
    const y1 =  edge.source.y || 0;
    const x2 =  edge.target.x || 0;
    const y2 =  edge.target.y || 0;

    const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    const radius1 =  edge.source.r || 0;
    const radius2 =  edge.target.r || 0;

    if (attr_name === 'x1') { return x1 + (x2 - x1) * radius1 / distance; }
    if (attr_name === 'y1') { return y1 + (y2 - y1) * radius1 / distance; }
    if (attr_name === 'x2') { return x2 + (x1 - x2) * radius2 / distance; }
    if (attr_name === 'y2') { return y2 + (y1 - y2) * radius2 / distance; }
  }

  setHover() {
    const d3element = select(this._element.nativeElement);
    const mouseOverFunction = (): void => {
      d3element.select('.edge').classed('hovering', true);
      this.edgeHover.emit({edge: this.edge, on: true})
    };

    const mouseOutFunction = (): void => {
      this.edgeHover.emit({edge: this.edge, on: false});
      d3element.select('.edge').classed('hovering', false);
    };

    d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);
  }

}
