import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as fromDiseases from './diseases.reducer';
import * as DiseasesActions from './diseases.actions';
import {catchError, concatMap, finalize, map, mergeMap, switchMap} from "rxjs/operators";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {of} from "rxjs";

@Injectable()
export class DiseasesEffects {
  constructor(
    private neo4jConnectionService: Neo4jConnectService,
    private actions$: Actions) {
  }

  loadDiseases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiseasesActions.loadDiseases),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiseasesActions.loadDiseasesSuccess({diseases: []});
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DiseasesActions.loadDiseasesFailure({error});
        },
      })
    )
  );

/*
  setDisease$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DiseasesActions.setDisease),
        fetch({
          run: (action) => {
            console.log(action);
            const call = `
            match p = (d:Disease {gard_id :${action.disease.disease.gard_id})-[]-(:DataRef) RETURN p;
            `;
            return this.neo4jConnectionService.read('gard-data', call).pipe(
              map(response => {
                console.log(response);
                return DiseasesActions.setDiseaseSuccess({selectedDisease: response.toObject()});
              }),
              catchError(error => of(DiseasesActions.setDiseaseFailure(error))),
            )
          },
          onError: (action, error) => {
            return DiseasesActions.setDiseaseFailure({error});
          },
        })
      )
  );
*/





  setDisease$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiseasesActions.setDisease),
      concatMap(action => {
        console.log(action);
        const call = `
          match p = (d:Disease {gard_id:'${action.disease.disease.gard_id}'})-[]-(:DataRef) RETURN p;
        `;
        console.log(call);
     return this.neo4jConnectionService.read('gard-data', call).pipe(
          map(response => {
            console.log(response);
            return DiseasesActions.setDiseaseSuccess({selectedDisease: response});
          }),
          catchError(error => {
            console.log(error);
            return of(DiseasesActions.setDiseaseFailure(error))
          }),
        )
  }),
    )
  });

  searchDiseases$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiseasesActions.searchDiseases),
      concatMap(action => {
        const call = `
            CALL db.index.fulltext.queryNodes("namesAndSynonyms", "name:${action.query} OR ${action.query}") YIELD node
            RETURN node LIMIT 10;
        `;
     return this.neo4jConnectionService.read('gard-data', call).pipe(
          map(response => {
           return DiseasesActions.searchDiseasesSuccess({diseases: response})
          }),
          catchError(error => of(DiseasesActions.searchDiseasesFailure(error))),
        )
  }),
    )
  });

  /*searchDiseases$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiseasesActions.searchDiseases),
      fetch({
        run: (action) => {
          const results: any[] = [];
          console.log(action);
          const call = `
            CALL db.index.fulltext.queryNodes("namesAndSynonyms", "name:${action.query} OR ${action.query}") YIELD node
            RETURN node LIMIT 10;
        `;
          return this.neo4jConnectionService.read('gard-data', call)
            .pipe(
              switchMap(res => {
                results.push(res.toObject());
                  return res;
                }
              )
            ).subscribe( {
            complete: () => {
              console.log("completing");
              console.log(results);
              return DiseasesActions.searchDiseasesSuccess({diseases: results})
            }
          })
        },
        onError: (action, error) => {
          console.error('Error', error);
          return DiseasesActions.loadDiseasesFailure({error});
        },
      })
    )
  })*/
}

