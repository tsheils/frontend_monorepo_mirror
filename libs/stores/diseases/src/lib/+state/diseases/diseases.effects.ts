import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as fromDiseases from './diseases.reducer';
import * as DiseasesActions from './diseases.actions';
import {catchError, concatMap, filter, finalize, map, mergeMap, switchMap} from "rxjs/operators";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {of} from "rxjs";
import {ROUTER_NAVIGATION, RouterNavigationAction} from "@ngrx/router-store";
import {DiseaseService} from "../../disease.service";
import {Disease, DiseaseSerializer} from "../../../../../../../models/gard/disease";
import {DiseasesEntity} from "@ncats-frontend-library/stores/diseases";

const serializer: DiseaseSerializer = new DiseaseSerializer();

@Injectable()
export class DiseasesEffects {
  constructor(
    private diseaseService: DiseaseService,
    private neo4jConnectionService: Neo4jConnectService,
    private actions$: Actions) {
  }

  loadDiseases$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return r.payload.routerState.url.startsWith('/diseases')
      }),
      map((r: RouterNavigationAction) => r.payload.routerState.root.queryParams),
      mergeMap((params: any) => {
        console.log(params);

        let call;
        call = `
          MATCH (n:Disease) 
          with n 
          ORDER BY n.name limit 25
          return collect(properties(n)) as data, count(n) as count       
          `;
        if(params['category'] && params['category'] === 'inherited') {
          call = `
          MATCH (n:Disease)-[:Properties]-(:Inheritance)
           with DISTINCT(n)
           ORDER BY n.name DESC limit 25
           RETURN collect(properties(n)) as data, count(n) as count
          `
        }
        if((params['category'] && params['category'] === 'inherited') && (params['source'] && params['source'] === "true")) {
          call = `
           MATCH (n:Disease)-[:Properties]-(p:DisplayProperty)-[]-(f:DataRef)
           with DISTINCT(n) as rr, size(collect(f.value))%2 as inCount
           where inCount > 0 with inCount, rr
                      ORDER BY rr.name DESC limit 25
           RETURN collect(properties(rr)) as data,  count(rr) as count;
          `
        }
        if((params['category'] && params['category'] === 'inherited') && (params['source'] && params['source'] === "false")) {
          call = `
           MATCH (n:Disease)-[:Properties]-(p:DisplayProperty)-[]-(f:DataRef)
           with DISTINCT(n) as rr, size(collect(f.value))%2 as inCount
           where inCount > 0 with inCount, rr
                      ORDER BY rr.name ASC limit 25
           RETURN collect(properties(rr)) as data, count(rr) as count 
          `
        }

        console.log(call);
        return this.neo4jConnectionService
          .read('gard-data', call)
          .pipe(
            map((response) => {
              console.log(response);
              const results: Disease[] = response.data.map(disease => {
                return {
                  id: disease.gard_id,
                  name: disease.name,
                  disease: serializer.fromJson(disease)
                }
              });
              return DiseasesActions.loadDiseasesSuccess({diseases: results})
            }),
            catchError(error => of(DiseasesActions.loadDiseasesFailure({error})))
          )
      })
    )
  });

/*
  setDisease$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiseasesActions.setDisease),
      concatMap(action => {
        console.log(action);
        const call = `
match p = (d:Disease {gard_id:'${action.id}'})-[r:Properties]-(n) with d, r, n
with distinct d, {field: n.field, values: collect(properties(n))} as changes
with properties(d) as disease,  collect(changes) as properties
with disease{ .*, properties: properties} as data
return data
        `;
        return this.neo4jConnectionService.read('gard-data', call).pipe(
          map(response => {
            console.log(response);
            if(response.data) {
              const resp = response.data;
              const disease = serializer.fromJson(resp);
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
            }
          }),
          catchError(error => {
            console.error(error);
            return of(DiseasesActions.setDiseaseFailure(error))
          }),
        )
      }),
    )
  });
*/
  setDisease$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        console.log(r);
        return r.payload.routerState.root.queryParams['disease']
      }),
      map((r: RouterNavigationAction) => r.payload.routerState.root.queryParams),
      mergeMap((params: any) => {
        console.log(params);
        const param = {q: params['disease']};
        const call = `
match (d:Disease)-[r:Properties]-(n)
where d.gard_id = '${params['disease']}' OR d.name = '${params['disease']}'
with properties(d) as disease, {field: n.field, values: collect(properties(n))} as changes
return disease{ .*, properties: collect(changes)} as data
        `;

        return this.neo4jConnectionService.read('gard-data', call).pipe(
          map(response => {
            console.log(response);
            if(response.data) {
              const resp = response.data;
              const disease = serializer.fromJson(resp);
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
            }
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
MATCH p=(disease:Disease)-[:Properties]-(n:DisplayProperty)-[]-(f:DataRef) 
with {disease: disease.gard_id, size: size(collect(f.value))%2 } as results, inheritanceCount, diseaseCount
where results.size > 0
with count(results) as misMatchCount, inheritanceCount, diseaseCount
MATCH p=(disease:Disease)-[:Properties]-(n:DisplayProperty)-[]-(f:DataRef) 
with {disease: disease.gard_id, size: size(collect(f.value))%2 } as results, inheritanceCount, diseaseCount,misMatchCount
where results.size = 0
with count(results) as matchCount, misMatchCount, inheritanceCount, diseaseCount
        return inheritanceCount, diseaseCount, misMatchCount, matchCount;
        `;
        return this.neo4jConnectionService.read('gard-data', call).pipe(
          map(response => {
            console.log(response);
            const stats = {};
            Object.keys(response).forEach(key => {
              stats[key] = response[key].low ? response[key].low : response[key].high
            });
            console.log(stats);
            return DiseasesActions.setDiseaseStatsSuccess({stats: stats})
          }),
          catchError(error => of(DiseasesActions.setDiseaseStatsFailure(error))),
        )
      })
    )
  });
}

