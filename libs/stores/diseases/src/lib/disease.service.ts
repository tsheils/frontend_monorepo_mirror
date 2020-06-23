import {Injectable} from '@angular/core';
import {map, shareReplay} from "rxjs/operators";
import * as DiseaseActions from "@ncats-frontend-library/stores/diseases";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {Page} from "@ncats-frontend-library/models/interfaces/core-interfaces";
import {
  DiseaseSerializer,
  GardHierarchy,
  GardHierarchySerializer
} from "@ncats-frontend-library/models/gard/gard-models";

@Injectable({
  providedIn: 'root'
})
export class DiseaseService  {

  data: any = {};
  instances: Map<string | number, WebSocketSubject<any>> = new Map<string | number, WebSocketSubject<any>>();
   diseaseSerializer: DiseaseSerializer = new DiseaseSerializer();
  gardHierarchySerializer: GardHierarchySerializer = new GardHierarchySerializer();

  // links neo4j service with diseases store facade, dispatches events as needed
  constructor(
    private diseaseFacade: DiseasesFacade
  ) {
  }

  createDriver(params: {name: string, url: string}): void {
    this.instances.set(params.name, webSocket({url: params.url}));
  }

  getInstance(instance: string): WebSocketSubject<any> {
    if(this.instances.has(instance)) {
      return this.instances.get(instance);
    } else {
      // todo should throw an error
      return null;
    }
  }

  parseResponse(response: any) {
    switch (response.origin) {
      case 'fetch-hierarchy': {
          let hierarchy: GardHierarchy = this.gardHierarchySerializer.fromJson(response.data.hierarchy);
          if (this.data.hierarchy) {
            hierarchy = this.gardHierarchySerializer.mergeChildren(this.data.hierarchy, hierarchy);
          }
          this.data.hierarchy = this.gardHierarchySerializer.fromJson(hierarchy);
          this.diseaseFacade.dispatch(DiseaseActions.fetchHierarchySuccess({hierarchy: hierarchy}));
          break;
      }
      case 'load-diseases': {
        const page: Page = {
          pageSize: response.params.pageSize ? response.params.pageSize : 10,
          pageIndex: response.params.pageIndex ? response.params.pageIndex : 1,
          total: response.data.total ? response.data.total.low : 0
        };
        const diseases = response.data.diseases.map(disease => this.diseaseSerializer.fromJson(disease));
        this.diseaseFacade.dispatch(DiseaseActions.setPage({page: page}));
        this.diseaseFacade.dispatch(DiseaseActions.loadDiseasesSuccess({diseases: diseases}));
        break;
      }
      case 'typeahead': {
        this.diseaseFacade.dispatch(DiseaseActions.searchDiseasesSuccess({typeahead: response.data}));
        break;
      }
      case 'set-disease': {
        const diseases = this.diseaseSerializer.fromJson(response.data.disease);
        this.diseaseFacade.dispatch(DiseaseActions.setDiseaseSuccess({disease: diseases}));
        break;
      }
    }
  }

  read(instance: string, origin: string, call: string, params?: any): void {
    const socket = this.getInstance(instance);
    socket.next({txcType: 'read', origin: origin, call: call, params: params ? params : null});
    socket.pipe(
      map(response => {
       return this.parseResponse(response);
      }),
      shareReplay(1)
    ).subscribe()
  }

  write(instance: string, origin: string, call: string, params?: any): void {
    const socket: WebSocketSubject<any> = this.getInstance(instance);
    socket.next({txcType: 'write', origin: origin, call: call, params: params ? params : null});
    //  return socket;
  }
}
