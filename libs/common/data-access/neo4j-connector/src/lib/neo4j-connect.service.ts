import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import * as neo4j from "neo4j-driver";
import RxSession from "neo4j-driver/types/session-rx";
import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class Neo4jConnectService {
  instances: Map<string | number, WebSocketSubject<any>> = new Map<string | number, WebSocketSubject<any>>();

  constructor() {
  }

  createDriver(params: {name: string, url: string}): void {
        this.instances.set(params.name, webSocket({url: params.url}));
  }

  read(instance: string, call: string, params?: any): Observable<any> {
    const socket =  this.instances.get(instance);
    socket.next({txcType: 'read', call: call, params: params ? params : null});
     return socket;
  }

  write(instance: string, call: string, params?: any): Observable<any> {
    const socket =  this.instances.get(instance);
    socket.next({txcType: 'write', call: call, params: params ? params : null});
    return socket;
  }

  destroy() {
    [...this.instances.values()].forEach(driver => driver.complete());
  }
}
