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
        MATCH (n:Disease) WITH count(n) AS count
         match (d:Disease)-[:Properties]-(p:MainProperty)-[]-(pp:Property)
         optional match (pp)-[]->(ds1:DataSource) with pp, d, p, ds1, count
         optional match (pp)-[]-(n:DataRef)-[]->(ds:DataSource) with n, pp, d, p, ds1, ds, count
         with distinct pp{.*, sources: collect(properties(ds1)), references:collect(n{.*, reference: properties(ds)})} as datarefs, p, d, pp, count
         with {field: p.field, values: collect(properties(datarefs))} as datas, d, count
         with d{.*, properties: collect(datas)} as diseaseObj, d, count
          ORDER BY d.name 
          SKIP ${pageIndex * pageSize}
          LIMIT ${pageSize}
          return collect(diseaseObj) as data, count as total
          `;
        if(params['category'] && params['category'] === 'inherited') {
          call = `
     match (n:Disease)-[:Properties]-(:Inheritances)-[]-(:Property) with count(distinct n) as count
          match (d:Disease)-[:Properties]-(p:MainProperty)-[]-(pp:Property)
         optional match (pp)-[]->(ds1:DataSource) with pp, d, p, ds1, count
         optional match (pp)-[]-(n:DataRef)-[]->(ds:DataSource) with n, pp, d, p, ds1, ds, count
         with distinct pp{.*, sources: collect(properties(ds1)), references:collect(n{.*, reference: properties(ds)})} as datarefs, p, d, pp, count
         with {field: p.field, values: collect(properties(datarefs))} as datas, d, count
         with d{.*, properties: collect(datas)} as diseaseObj, d, count
          ORDER BY d.name 
          SKIP ${pageIndex * pageSize}
          LIMIT ${pageSize}
          return collect(diseaseObj) as data, count as total
          `
        }
        if((params['category'] && params['category'] === 'inherited') && (params['source'] && params['source'] === "true")) {
          call = `
           MATCH p=(d:Disease)-[r2:Properties]-(:Inheritances)-[]-(f2:Property) 
            where (f2.sourceCount %2) = 0 
            with distinct d
            with count(d) as count
             match (d)-[:Properties]-(p:MainProperty)-[]-(pp:Property)
         optional match (pp)-[]->(ds1:DataSource) with pp, d, p, ds1, count
         optional match (pp)-[]-(n:DataRef)-[]->(ds:DataSource) with n, pp, d, p, ds1, ds, count
         with distinct pp{.*, sources: collect(properties(ds1)), references:collect(n{.*, reference: properties(ds)})} as datarefs, p, d, pp, count
         with {field: p.field, values: collect(properties(datarefs))} as datas, d, count
         with d{.*, properties: collect(datas)} as diseaseObj, d, count
          ORDER BY d.name 
            SKIP ${pageIndex * pageSize}
            LIMIT ${pageSize}
            return collect(diseaseObj) as data, count as total
          `
        }
        if((params['category'] && params['category'] === 'inherited') && (params['source'] && params['source'] === "false")) {
          call = `
            MATCH p=(d:Disease)-[r2:Properties]-(:Inheritances)-[]-(f2:Property) 
            where (f2.sourceCount %2) > 0 
            with distinct d
            with count(d) as count
             match (d)-[:Properties]-(p:MainProperty)-[]-(pp:Property)
         optional match (pp)-[]->(ds1:DataSource) with pp, d, p, ds1, count
         optional match (pp)-[]-(n:DataRef)-[]->(ds:DataSource) with n, pp, d, p, ds1, ds, count
         with distinct pp{.*, sources: collect(properties(ds1)), references:collect(n{.*, reference: properties(ds)})} as datarefs, p, d, pp, count
         with {field: p.field, values: collect(properties(datarefs))} as datas, d, count
         with d{.*, properties: collect(datas)} as diseaseObj, d, count
          ORDER BY d.name 
            SKIP ${pageIndex * pageSize}
            LIMIT ${pageSize}
            return collect(diseaseObj) as data, count as total
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
/*call = `
MATCH (d:Disease)-[:Properties]->(p:MainProperty)-[:DisplayValue|:Value]->(pp:Property)
         WHERE d.gard_id = '${params['disease']}' OR d.name = '${params['disease']}'
              optional MATCH (pp)-[:DataSourceReference]->(ds1:DataSource) with pp, d, p, ds1
         optional MATCH (pp)-[:ReferenceSource]-(n:DataRef)-[:DataSourceReference]->(ds:DataSource)
         optional MATCH p3=(e:HierarchyRoot)-[:IsAParent*0..]->(pp)
with collect(distinct p3) as paths, d.gard_id as id, e.id as nodeId, d, pp, ds, ds1, p, n
CALL apoc.convert.toTree(paths) yield value
with distinct pp{.*, sources: collect(properties(ds1)), references:collect(n{.*, reference: properties(ds)})} as datarefs, p, d, pp, value
         with {field: p.field, values: collect(properties(datarefs)), tree: value} as datas, d
         with d{.*, properties: collect(datas)} as diseaseObj, d
         return diseaseObj as data;
`;*/
//          WHERE d.gard_id = '${params['disease']}' OR d.name = '${params['disease']}'
call = `
         MATCH (d:Disease)-[:Properties]->(p:MainProperty)-[:DisplayValue|:Value]->(pp:Property)
         WHERE d.gard_id = '${params['disease']}' OR d.name = '${params['disease']}'
         OPTIONAL MATCH (pp)-[:DataSourceReference]->(ds1:DataSource) WITH pp, d, p, ds1
         OPTIONAL MATCH (pp)-[:ReferenceSource]-(n:DataRef)-[:DataSourceReference]->(ds:DataSource) WITH pp, d, p, ds1, n, ds
         OPTIONAL MATCH p3=(e:HierarchyRoot)-[:IsAParent*0..]->(pp) WITH pp, d, p, ds1, n, p3,e, ds
         WITH collect(distinct p3) as paths, d.gard_id as id, e.id as nodeId, d, pp, ds,  ds1, p, n
         CALL apoc.when(
  size(paths) > 0,
   'CALL apoc.convert.toTree(paths) yield value
   return value as tree, collect(properties(ds1)) as sources, collect(n{.*, reference: properties(ds)}) as references',
  'return properties(pp) as props, collect(properties(ds1)) as sources, collect(n{.*, reference: properties(ds)}) as references',
  {paths:paths, ds1:ds1, ds:ds, p:p, d:d, pp:pp, n:n})
YIELD value
with {field: p.field, values: collect(properties(value))} as datas, d
         with d{.*, properties: collect(datas)} as diseaseObj, d
         return diseaseObj as data;
`;


        return this.neo4jConnectionService.read('gard-data', call).pipe(
          map(response => {
            if(response.data) {
            //  console.log(response.data);
              const resp = response.data;
              const disease = serializer.fromJson(resp);
             /* if (resp.data && resp.data.length > 0) {
                resp.data.forEach(data => disease[data.field] = data.values);
              }*/
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
MATCH (disease)-[:Properties]-(i:Inheritances) with count(Distinct disease) as inheritanceCount, diseaseCount MATCH (disease)-[:Properties]-(i:Inheritances)-[]-(n:Property) 
with distinct {disease: disease.gard_id, size: n.sourceCount%2 } as results, inheritanceCount, diseaseCount
where results.size > 0
with count(results) as misMatchCount, inheritanceCount, diseaseCount
MATCH (disease)-[:Properties]-(i:Inheritances)-[]-(n:Property) 
with distinct {disease: disease.gard_id, size: n.sourceCount%2 } as results, inheritanceCount, diseaseCount, misMatchCount
where results.size = 0
with count(results) as matchCount, inheritanceCount, diseaseCount, misMatchCount
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


  isLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return r.payload.routerState.url.startsWith('/diseases')
      }),
      mergeMap(() => {
        return of(DiseasesActions.loadDiseases());
      })
    )
  });
}


