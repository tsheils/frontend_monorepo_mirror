import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import * as neo4j from "neo4j-driver";
import RxSession from "neo4j-driver/types/session-rx";
import {fromPromise} from "rxjs/internal/observable/fromPromise";

@Injectable()
export class Neo4jConnectService {
driver: neo4j.Driver;
session: RxSession;

  constructor() { }

  connect():Observable<boolean> {
    this.driver = neo4j.driver(
      'bolt://disease.ncats.io:80/',
      neo4j.auth.basic('neo4j', ''),
      {encrypted: true}
    );
    return fromPromise(this.driver.verifyConnectivity()
      .then(() => {
      this.session = this.driver.rxSession();
      return true;
    })
      .catch(res => {
        console.error(res);
      return false;
    }));

  }

  fetch(query: string, params?: any): Observable<any> {
    if(this.session) {
      return this.session.run('match p=(n:`S_GARD`)-[]-(:DATA) return p limit 20').records();
    }
  }

  close():void {
    this.session.close();
    this.driver.close();
  }
}
