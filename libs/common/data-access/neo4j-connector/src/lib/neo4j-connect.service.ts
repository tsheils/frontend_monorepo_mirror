import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import * as neo4j from "neo4j-driver";
import RxSession from "neo4j-driver/types/session-rx";
import {fromPromise} from "rxjs/internal/observable/fromPromise";

@Injectable({
    providedIn: 'root'
  })
export class Neo4jConnectService {
driver: neo4j.Driver;
session: RxSession;

  /**
   * subject to track neo4j session
   */
  private _sessionSource = new BehaviorSubject<RxSession>(null);


  /**
   * Observable stream of session changes
   * @type {Observable<RxSession>}
   */
  session$: Observable<RxSession> = this._sessionSource.asObservable();


  constructor() { }

  connect(params: any):Observable<boolean> {
    this.driver = neo4j.driver(
      params.url,
      neo4j.auth.basic(params.user, params.password ? params.password : '')
    );
    return fromPromise(this.driver.verifyConnectivity()
      .then(() => {
      this.session = this.driver.rxSession();
      this._sessionSource.next(this.session);
      return true;
    })
      .catch(res => {
        console.error(res);
      return false;
    }));

  }

  fetch(query: string, params?: any): Observable<any> {
    if(this.session) {
      return this.session.run(query, params).records();
    }
  }

  close():void {
    this.session.close();
    this.driver.close();
    this._sessionSource.next(null);
  }
}
