import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import * as neo4j from "neo4j-driver";
import RxSession from "neo4j-driver/types/session-rx";
import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {Neo4jInstanceConfig} from "@ncats-frontend-library/common/data-access/neo4j-connector";

@Injectable({
  providedIn: 'root'
})
export class Neo4jConnectService {
  instances: Map<string | number, neo4j.Driver> = new Map<string | number, neo4j.Driver>();

  constructor() {
  }

  createDriver(params: Neo4jInstanceConfig): void {
    const driver = neo4j.driver(
      params.url ? params.url : params.bolt,
      neo4j.auth.basic(params.user, params.password ? params.password : '')
    );
    fromPromise(driver.verifyConnectivity()).subscribe(res => {
      if (res) {
        this.instances.set(params.name, driver);
      }
    })
  }

  // todo: close session
  read(instance: string, call: string, params?: any): Observable<any> {
    const data = [];
    if (this.instances.has(instance)) {
      const session: RxSession = this.instances.get(instance).rxSession();
      return session
        .readTransaction(txc => txc.run(call, params ? params : null)
          .records())
    } else {
      console.error("Error - no instances set");
      return of([]);
    }
  }

  // todo: close session
  write(instance: string, call: string, params?: any): Observable<any> {
    const data = [];
    if (this.instances.has(instance)) {
      const session: RxSession = this.instances.get(instance).rxSession();
      return session
        .writeTransaction(txc => txc.run(call, params ? params : null)
          .records())
    } else {
      console.error("Error - no instances set");
      return of([]);
    }
  }

  destroy() {
    [...this.instances.values()].forEach(driver => driver.close());
  }
}
