import { Injectable } from '@angular/core';
import {Neo4jdbsEntity, Neo4jdbsFacade} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import * as neo4j from "neo4j-driver";
import {Observable, of} from "rxjs";
import {map, materialize, toArray} from "rxjs/operators";
import RxSession from "neo4j-driver/types/session-rx";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class Neo4jSessionService {
instances: Map<string | number, neo4j.Driver> = new Map<string | number, neo4j.Driver>();
  constructor(
    private neo4jdbFacade: Neo4jdbsFacade
  ) {
    /*this.neo4jdbFacade.allNeo4jdbs$.subscribe(res => {
       console.log(res);
       res.forEach(instance => {
         this.instances.set(instance.id, instance.driver)
       })
     })*/
  }

  setInstance(instance: Neo4jdbsEntity) {
    this.instances.set(instance.id, instance.driver as neo4j.Driver)
  }

read(instance: string, call: string, params?: any ): Observable<Record<any, any>> {
    console.log(this);
    if(this.instances.has(instance)) {
            const session: RxSession = this.instances.get(instance).rxSession();
            console.log(session);
            return session.readTransaction(txc => txc.run(call, params ? params : null).records())
    } else {
      console.error("Error - no instances set");
      return of({});
    }
}
}
