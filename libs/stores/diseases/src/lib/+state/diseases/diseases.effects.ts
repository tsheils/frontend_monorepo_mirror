import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as DiseasesActions from './diseases.actions';
import {catchError, concatMap, filter, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {ROUTER_NAVIGATION, RouterNavigationAction} from "@ngrx/router-store";
import {DiseaseService} from "../../disease.service";
import {Disease, DiseaseSerializer} from "../../../../../../../models/gard/disease";
import {DiseasesEntity, Page} from "@ncats-frontend-library/stores/diseases";
import {Neo4jConnectService} from "@ncats-frontend-library/shared/data-access/neo4j-connector";

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
       const pageSize = params.pageSize ? params.pageSize : 10;
       const pageIndex = params.pageIndex ? params.pageIndex : 0;
        let call;
        call = `
          MATCH (d:Disease)  
          WITH count(d) AS count
          MATCH (n:Disease)  
          WITH n, count
          ORDER BY n.name 
          SKIP ${pageIndex * pageSize}
          LIMIT ${pageSize}
          RETURN COLLECT(PROPERTIES(n)) AS data, count as total       
          `;
        if(params['category'] && params['category'] === 'inherited') {
          call = `
          MATCH (d:Disease)-[:Properties]-(:Inheritance)
           WITH COUNT(DISTINCT d) AS count
          MATCH (n:Disease)-[:Properties]-(:Inheritance)
           WITH DISTINCT(n), count
           ORDER BY n.name 
          SKIP ${pageIndex * pageSize}
          LIMIT ${pageSize}
           RETURN COLLECT(PROPERTIES(n)) AS data, count as total
          `
        }
        if((params['category'] && params['category'] === 'inherited') && (params['source'] && params['source'] === "true")) {
          call = `
            MATCH p=(disease:Disease)-[r2:Properties]-(:DisplayProperty)-[]-(f2:DataRef) 
            with {disease: disease, size: size(collect(f2.value))%2 } as results
            where results.size = 0 with count(results) as count 
            MATCH (n:Disease)-[r:Properties]-(p:DisplayProperty)-[]-(f:DataRef)
            with DISTINCT(n) as rr, size(collect(f.value))%2 as inCount, count
            where inCount = 0 with inCount, rr, count
           ORDER BY rr.name 
          SKIP ${pageIndex * pageSize}
          LIMIT ${pageSize}
            RETURN collect(properties(rr)) as data, count as total;
          `
        }
        if((params['category'] && params['category'] === 'inherited') && (params['source'] && params['source'] === "false")) {
          call = `
            MATCH p=(disease:Disease)-[r2:Properties]-(:DisplayProperty)-[]-(f2:DataRef) 
            with {disease: disease, size: size(collect(f2.value))%2 } as results
            where results.size > 0 with count(results) as count 
            MATCH (n:Disease)-[r:Properties]-(p:DisplayProperty)-[]-(f:DataRef)
            with DISTINCT(n) as rr, size(collect(f.value))%2 as inCount, count
            where inCount > 0 with inCount, rr, count
            ORDER BY rr.name 
            SKIP ${pageIndex * pageSize}
            LIMIT ${pageSize}
            RETURN collect(properties(rr)) as data, count as total;
          `
        }
        return this.neo4jConnectionService
          .read('gard-data', call)
          .pipe(
            map((response) => {
              const page: Page = {
                pageSize: pageSize,
                pageIndex: pageIndex,
              total: response.total ? response.total.low : 0
              };
              const results: DiseasesEntity[] = response.data.map(disease => {
                return {
                  id: disease.gard_id,
                  name: disease.name,
                  disease: serializer.fromJson(disease)
                }
              });
              return DiseasesActions.loadDiseasesSuccess({diseases: results, page: page})
            }),
            catchError(error => of(DiseasesActions.loadDiseasesFailure({error})))
          )
      })
    )
  });

  setDisease$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return r.payload.routerState.root.queryParams['disease']
      }),
      map((r: RouterNavigationAction) => r.payload.routerState.root.queryParams),
      mergeMap((params: any) => {
        let call;
         call = `
         match (d:Disease)
         where d.gard_id = '${params['disease']}' OR d.name = '${params['disease']}'
optional match (d)-[r:Properties]-(n)-[:ReferenceSource]-(f:DataRef) 
with collect(properties(f)) as references, properties(d) as disease, n
ORDER BY size(references) DESC
with {field: n.field, values: collect(distinct n{.*, references: references})} as changes, disease 
return disease{ .*, properties: collect(changes)} as data;
        `;
     /*    if (params['edit']){
           call = `
           match (d:Disease)-[r:Properties]-(n)
where d.gard_id = '${params['disease']}' OR d.name = '${params['disease']}' AND n.field = '${params['edit']}'
match (n)-[:ReferenceSource]-(f:DataRef)
with collect(properties(f)) as references, properties(d) as disease, n
with {field: n.field, values: collect(distinct n{.*, references: references})} as changes, disease
return disease{ .*, properties: collect(changes)} as data
        `;
         }*/

        return this.neo4jConnectionService.read('gard-data', call).pipe(
          map(response => {
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

