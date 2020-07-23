import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
  EdgeService,
  GraphDataService,
  NodeService,
  SGEdge,
  SGNode,
  SmrtGraphData,
  SmrtgraphCoreComponent
} from "@ncats-frontend-library/shared/smrtgraph/smrtgraph-core";
import {SctlNode, SctlNodeSerializer} from "./models/sctl-node";
import {CytoscapeLoaderService} from "./services/cytoscape-loader.service";
import {from, Observable, of} from "rxjs";
import {map, zipAll} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../apps/pluriprot/src/environments/environment";

const DATAFILES = environment.dataUrls;

interface FileData {
  origin: string;
  data: any;
}
@Component({
  selector: 'ncats-frontend-library-pluriprot-network',
  templateUrl: './pluriprot-network.component.html',
  styleUrls: ['./pluriprot-network.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluriprotNetworkComponent implements OnInit {
  dataMap: Map<string, any> = new Map<string, any>();

  @ViewChild(SmrtgraphCoreComponent, {static: false}) smrtgraphInstance: SmrtgraphCoreComponent;

  graph: SmrtGraphData;

  loading = true;

  constructor(
    private changeRef: ChangeDetectorRef,
    private cytoscapeLoaderService: CytoscapeLoaderService,
    private graphDataService: GraphDataService,
    private http: HttpClient,
    private nodeService: NodeService,
    private edgeService: EdgeService
  ) { }

  ngOnInit() {
    this.nodeService.setSerializer(new SctlNodeSerializer());
this.loadData().subscribe(res => {
  this.graph = this.dataMap.get('nscs');
 // this.smrtgraphInstance.resize();
  this.loading = false;
  this.changeRef.markForCheck();
})
  }

  nodeEvents(event){
    //  console.log(event);
  }

  edgeEvents(event){
    // console.log(event);
  }

  svgElementClicked(event) {
    console.log(event);
    console.log("svg element clicked")
  }

  filterGraph(event: Event) {
    this.loading = true;
    const nodes = this._filterNodes(event);
    const edges = this._filterEdges(event, nodes);
    this.graph = {
      nodes: nodes,
      edges: edges
    };
    this.loading = false;
  }

  _filterNodes(params: Event): SctlNode[]{
    const data = params['data'] ? params['data'] : 'nscs';
    let nodes: SctlNode[] = this.dataMap.get(data).nodes as SctlNode[];
    if(params['reset']){
      return nodes.map(node => {
        node.tempcolor = null;
        return node;
      });
    } else {
      Object.keys(params).forEach(param => {
        // skip iterating from the fade parameter
        if (param !== 'fade') {
          if (Array.isArray(params[param])) {
            if (params['fade'] === true) {
              nodes = nodes.map(node => {
                if (node[param] >= params[param][0] && node[param] <= params[param][1]) {
                  node.tempcolor = null;
                } else {
                  node.tempcolor = '#f6f6f6';
                }
                return node;
              });
            } else {
              nodes = nodes.filter(node => {
                node.tempcolor = null;
                return node[param] >= params[param][0] && node[param] <= params[param][1];
              });
            }
          }
        }
      });
      if (params['no_data'] === true) {
        nodes = nodes.filter(node => {
          return node.properties.hESC_NSC_Fold_Change !== -100
        });

      }
      if (params['subgraph']) {
        if (params['subgraph'] !== 'null') {
          const node = nodes.filter(node => {
            return node.name === params['subgraph']
          });
         // this.nodeService.hoveredNode(node);
       //   this.smrtgraphInstance.clickedNode({node: node[0], on: true});
        }
      }
      return nodes;
    }
  }

  _filterEdges(params: Event, nodes : SctlNode[]){
    const data = params['data'] ? params['data'] : 'nscs';
    let edges: SGEdge[] = this.dataMap.get(data).edges as SGEdge[];
    const currentNodes = nodes.map(node => node.id);
    edges = edges.filter(edge => {
      const source: string = edge.getSourceId();
      const target: string = edge.getTargetId();
      return currentNodes.includes(source) && currentNodes.includes(target);
    });
    return edges;
  }



  highlightSubgraph(node: SGNode) {
   // this.smrtgraphInstance.clickedNode({node: node, on: true});
  }


  loadData(): Observable<any> {
    return from(DATAFILES.map(file => {
      const fileData: FileData = {origin: file.origin, data: this.http.get<any[]>(file.url)};
      return fileData;
    })).pipe(
      map(res => {
        return res.data.pipe(
          map(response => {
            const data: FileData = {origin: res.origin, data: response};
            return of({origin: res.origin, data: this._parseData(data)});
          })
        );
      }),
      zipAll()
    )
  }

  _parseData(data: any) {
    data.data.elements.nodes.map(node => {
      this.nodeService.makeNode(node);
    });

    data.data.elements.edges.map(edge => {
      const source: SGNode = this.nodeService.getById(edge.data.source);
      const target: SGNode = this.nodeService.getById(edge.data.target);
      if (source.id !== target.id) {
        source.edgeCount++;
        target.edgeCount++;
        this.nodeService.setNode(source);
        this.nodeService.setNode(target);
        this.edgeService.makeEdge(edge.data.id, source, target, {properties: edge.data});
      }
    });
    const ret = {
      nodes: this.nodeService.getNodesArr(),
      edges: this.edgeService.getEdgesArr()
    };

    this.dataMap.set(data.origin, ret);
    this.nodeService.empty();
    this.edgeService.empty();
  }

  reset() {
    this.smrtgraphInstance.zoom();
  }


}
