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

  setDisease$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiseasesActions.setDisease),
      concatMap(action => {
//        match p = (d:Disease {gard_id:'${action.disease.disease.gard_id}'})-[]-(:DataRef) RETURN COLLECT(p) as disease;
        const call = `
match p = (d:Disease {gard_id:'${action.disease.disease.gard_id}'})-[r:Properties]-(n) with d, r, n 
with distinct properties(d) as disease, {field: r.type, values: collect(properties(n))} as changes
return {disease: disease,  data: collect(changes)} as data;
        `;
        //  console.log(call);
        return this.neo4jConnectionService.read('gard-data', call).pipe(
          map(response => {
            console.log(response);
            const resp = response.data;
            const disease = resp.disease;
            if (resp.data && resp.data.length > 0) {
              resp.data.forEach(data => disease[data.field] = data.values);
            }
            return DiseasesActions.setDiseaseSuccess({
              disease: {
                id: disease.gard_id,
                name: disease.name,
                disease: disease
              }
            });
          }),
          catchError(error => {
            console.error(error);
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

  fetchStats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiseasesActions.setDiseaseStats),
      concatMap(action => {
        const call = `
        MATCH (d:Disease) WITH COLLECT(d) as diseases, count(d) as diseaseCount
        UNWIND diseases as disease
        MATCH (disease:Disease)-[:Properties]-(:Inheritance) with count(Distinct disease) as inheritanceCount, diseaseCount
        return inheritanceCount, diseaseCount;
        `;
        return this.neo4jConnectionService.read('gard-data', call).pipe(
          map(response => {
            const stats = {};
            Object.keys(response).forEach(key => {
              stats[key] = response[key].low ? response[key].low : response[key].high
            });
            return DiseasesActions.setDiseaseStatsSuccess({stats: stats})
          }),
          catchError(error => of(DiseasesActions.setDiseaseStatsFailure(error))),
        )
      })
    )
  });
}
