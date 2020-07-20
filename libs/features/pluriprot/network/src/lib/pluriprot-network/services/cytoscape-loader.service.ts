import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of, Subject} from 'rxjs/index';
import {map, zipAll} from 'rxjs/internal/operators';
import {
  EdgeService,
  NodeService, SGNode,
  SmrtGraphData,
  SmrtGraphDataParserInterface
} from "@ncats-frontend-library/shared/smrtgraph/smrtgraph-core";
import {environment} from "../../../../../../../../apps/pluriprot/src/environments/environment";

interface FileData {
  origin: string;
  data: any;
}

// todo: this should maybe be in a config object
const DATAFILES = environment.dataUrls;

@Injectable({
  providedIn: 'root'
})
export class CytoscapeLoaderService implements SmrtGraphDataParserInterface {

   _data = new Subject<SmrtGraphData>();


  data$ = this._data.asObservable();

  constructor(
    private http: HttpClient,
    private nodeService: NodeService,
    private edgeService: EdgeService
  ) {
      this.connectToData();
  }

  private _fetchFile(url: string) {
    return this.http.get<any[]>(url);
  }

  setSerializers(serializers) {
    if(serializers.node) {
      this.nodeService.setSerializer(serializers.node);
    }
  }

  //todo -- do i want to handle loading multiple files here?
  connectToData(): void {
    from(DATAFILES.map(file => {
      const fileData: FileData = {origin: file.origin, data: this._fetchFile(file.url)};
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
    this._data.next(ret);
  }


  getData(): Observable<SmrtGraphData> {
    return this.data$;
  }
}
