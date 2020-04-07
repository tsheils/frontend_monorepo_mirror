import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as fromNeo4jdbs from './neo4jdbs.reducer';
import * as Neo4jdbsActions from './neo4jdbs.actions';
import * as neo4j from "neo4j-driver";
import {fromPromise} from "rxjs/internal-compatibility";
import {catchError, concatMap, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class Neo4jdbsEffects {
  constructor(private actions$: Actions) {
  }

  loadNeo4jdbs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Neo4jdbsActions.loadNeo4jdbs),
      fetch({
        run: (action) => {
          return Neo4jdbsActions.loadNeo4jdbsSuccess({neo4jdbs: []});
        },
        onError: (action, error) => {
          console.error('Error', error);
          return Neo4jdbsActions.loadNeo4jdbsFailure({error});
        },
      })
    )
  );

  setNeo4jdbs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Neo4jdbsActions.setNeo4jdbs),
      fetch({
        run: (action) => {
          console.log(action);
          return Neo4jdbsActions.setNeo4jdbsSuccess({neo4jdbs: [action.neo4jdb]});
        },
        onError: (action, error) => {
          console.error('Error', error);
          return Neo4jdbsActions.setNeo4jdbsFailure({error});
        },
      })
    )
  );




}








