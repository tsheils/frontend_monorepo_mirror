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

  getInstance(instance: string): WebSocketSubject<any> {
    if(this.instances.has(instance)) {
      return this.instances.get(instance);
    } else {
      // todo should throw an error
      return null;
    }
  }

  /*read(instance: string, origin: string, call: string, params?: any): Observable<any> {
    const socket =  this.instances.get(instance);
    socket.next({txcType: 'read', origin: origin, call: call, params: params ? params : null});
     return socket;
  }

  write(instance: string, origin: string, call: string, params?: any): Observable<any> {
    const socket =  this.instances.get(instance);
    socket.next({txcType: 'write', origin: origin, call: call, params: params ? params : null});
    return socket;
  }*/

  destroy() {
    [...this.instances.values()].forEach(driver => driver.complete());
  }
}


/*  public connect(): WebSocketSubject<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(WS_ENDPOINT);
    }
    return this.socket$;
  }

  public dataUpdates$() {
    return this.connect().asObservable();
  }*/
