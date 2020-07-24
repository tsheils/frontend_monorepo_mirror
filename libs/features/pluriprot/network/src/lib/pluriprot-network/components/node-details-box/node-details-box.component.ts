import { Component, OnInit } from '@angular/core';
import {SctlNode} from "../../models/sctl-node";
import {
  EdgeService,
  GraphDataService,
  NodeService,
  SGEdge
} from "@ncats-frontend-library/shared/smrtgraph/smrtgraph-core";

@Component({
  selector: 'ncats-frontend-library-node-details-box',
  templateUrl: './node-details-box.component.html',
  styleUrls: ['./node-details-box.component.scss']
})
export class NodeDetailsBoxComponent implements OnInit {

  node: SctlNode;
  edge: SGEdge;

  constructor(
    private nodeService: NodeService,
    private edgeService: EdgeService,
  //  private d3Service: D3Service,
    private graphDataService: GraphDataService
  ) { }

  ngOnInit() {
   // this.nodeService.nodeList$.subscribe(res => this.node = res.hovered[0]);
    this.edgeService.edgeslist$.subscribe(res => this.edge = res.hovered[0]);
  }

  getLabel(value: number): string {
    if(!value || value === -100){
      return 'no data'
    } else {
      return value.toExponential(2);
    }
  }

  foundNode(event){
  //  this.d3Service._clearNodes();
   // this.nodeService.hoveredNode([event])
  //  this.d3Service._manualClick(event, this.graphDataService.returnGraph());
  }
}
