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
        this.instances.set(params.name, webSocket(params.url) );
  }

  read(instance: string, call: string, params?: any): Observable<any> {
    const socket =  this.instances.get(instance);
    socket.next({txcType: 'read', call: call, params: params ? params : null});
     return socket;
    /*const data = [];
    if (this.instances.has(instance)) {
      const session: RxSession = this.instances.get(instance).rxSession();
      return session
        .readTransaction(txc => txc.run(call, params ? params : null)
          .records())*/
   /* } else {
      console.error("Error - no instances set");
      return of([]);
    }*/
  }

  write(instance: string, call: string, params?: any): Observable<any> {
    const socket =  this.instances.get(instance);
    socket.next({txcType: 'write', call: call, params: params ? params : null});
    return socket;
/*    const data = [];
    if (this.instances.has(instance)) {
      const session: RxSession = this.instances.get(instance).rxSession();
      return session
        .writeTransaction(txc => txc.run(call, params ? params : null)
          .records())
    } else {
      console.error("Error - no instances set");
      return of([]);
    }*/
  }

  destroy() {
    [...this.instances.values()].forEach(driver => driver.complete());
  }
}
