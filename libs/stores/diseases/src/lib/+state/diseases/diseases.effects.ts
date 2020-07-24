import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as DiseasesActions from './diseases.actions';
import {filter, map, mergeMap, tap} from "rxjs/operators";
import {ROUTER_NAVIGATION, RouterNavigationAction} from "@ngrx/router-store";
import {DiseaseService} from "../../disease.service";
import {State} from "@ncats-frontend-library/stores/diseases";
import {Neo4jConnectService} from "@ncats-frontend-library/shared/data-access/neo4j-connector";
import {Store} from "@ngrx/store";
import {of} from "rxjs";

@Injectable()
export class DiseasesEffects {
  constructor(
    private diseaseService: DiseaseService,
    private neo4jConnectionService: Neo4jConnectService,
    private actions$: Actions
    ) {
  }

  loadDiseases$ = createEffect(() =>
     this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => r.payload.routerState.url.startsWith('/diseases')),
      map((r: RouterNavigationAction) => r.payload.routerState.root.queryParams),
      tap((params: any) => {
        const pageSize = params.pageSize ? params.pageSize : 10;
        const pageIndex = params.pageIndex ? params.pageIndex : 0;
        let call;
        const diseaseToProperty = `MATCH (d:Disease)-[:Properties]-(p:MainProperty)-[]-(pp:Property)`;
        const collectObj = `WITH d{.*, properties: COLLECT(datas)} AS diseaseObj, d, count`;
        const mapDataSources = `optional match (pp)-[]->(ds1:DataSource) with pp, d, p, ds1, count
         OPTIONAL MATCH (pp)-[:ReferenceSource]->(rr:Reference) WITH pp, d, p, ds1, rr, count
         optional match (pp)-[]-(n:DataRef)-[]->(ds:DataSource) with n, pp, d, p, ds1, ds, rr, count
         with distinct pp{.*, sources: collect(properties(ds1)), references:collect(properties(rr))} as datarefs, p, d, pp, count
         with {field: p.field, values: collect(properties(datarefs))} as datas, d, count`;
        const orderSkipLimit = `ORDER BY d.name SKIP ${pageIndex * pageSize} LIMIT ${pageSize}`;
        const returnObj = `RETURN COLLECT(diseaseObj) AS diseases, count AS total`;
        call = `
        MATCH (n:Disease) WITH count(n) AS count
        ${diseaseToProperty} ${mapDataSources} ${collectObj} ${orderSkipLimit} ${returnObj}
          `;
        if(params['category'] && params['category'] === 'inherited') {
          call = `
     match (n:Disease)-[:Properties]-(:Inheritances)-[]-(:Property) with count(distinct n) as count
        ${diseaseToProperty} ${mapDataSources} ${collectObj} ${orderSkipLimit} ${returnObj}
          `
        }
        if((params['category'] && params['category'] === 'inherited') && (params['source'] && params['source'] === "true")) {
          call = `
           MATCH p=(d:Disease)-[r2:Properties]-(:Inheritances)-[]-(f2:Property)
            where (f2.sourceCount %2) = 0
            with distinct d
            with count(d) as count
           ${diseaseToProperty} ${mapDataSources} ${collectObj} ${orderSkipLimit} ${returnObj}
          `
        }
        if((params['category'] && params['category'] === 'inherited') && (params['source'] && params['source'] === "false")) {
          call = `
            MATCH p=(d:Disease)-[r2:Properties]-(:Inheritances)-[]-(f2:Property)
            where (f2.sourceCount %2) > 0
            with distinct d
            with count(d) as count
        ${diseaseToProperty} ${mapDataSources} ${collectObj} ${orderSkipLimit} ${returnObj}
          `;
        }
        if(params['parent']) {
          call = `
          match p=(e:HierarchyNode)-[:IsAParent*0..]->(h:HierarchySource)
          where e.value = '${params['parent']}' with distinct h
          match (h)<-[:DisplayValue]-(:Hierarchies)<-[:Properties]-(d:Disease)
            with distinct d
            with count(d) as count, collect(d) as diseases
            unwind diseases as d
        ${diseaseToProperty} ${mapDataSources} ${collectObj} ${orderSkipLimit} ${returnObj}
          `
        }
        this.diseaseService.read('gard-data', 'load-diseases', call, params);
      })
    ), {dispatch: false});

  searchDiseases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiseasesActions.searchDiseases),
      tap(action => {
        const call = `
            CALL db.index.fulltext.queryNodes("namesAndSynonyms", "name:${action.query}* OR ${action.query}*") YIELD node
            WITH COLLECT(properties(node)) AS arr
            WITH arr[0..10] AS typeahead
            RETURN typeahead;
        `;
        this.diseaseService.read('gard-data', 'typeahead', call);
      }))
  ,{dispatch: false});

  setDisease$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigationAction) => {
          return r.payload.routerState.root.queryParams['disease']
        }),
        map((r: RouterNavigationAction) => r.payload.routerState.root.queryParams),
        tap((params: any) => {
          let call;
          call = `
         MATCH (d:Disease)-[:Properties]->(p:MainProperty)-[:DisplayValue|:Value]->(pp:Property)
         WHERE d.gard_id = '${params['disease']}' OR d.name = '${params['disease']}'
         OPTIONAL MATCH (pp)-[:DataSourceReference]->(ds1:DataSource) WITH pp, d, p, ds1
         OPTIONAL MATCH (pp)-[:ReferenceSource]->(rr:Reference) WITH pp, d, p, ds1, rr
         OPTIONAL MATCH (pp)-[:ReferenceSource]-(n:DataRef)-[:DataSourceReference]->(ds:DataSource) WITH pp, d, p, ds1, n, ds, rr
         OPTIONAL MATCH (pp)<-[:IsAParent]-(hr:HierarchyNode) WITH pp, d, p, ds1, n, ds, hr, rr
         OPTIONAL MATCH p3=(e:HierarchyRoot)-[:IsAParent*0..]->(hr) WITH pp, d, p, ds1, n, p3, e, ds, rr
         WITH collect(distinct p3) AS paths, d.gard_id AS id, e.id AS nodeId, d, pp, ds,  ds1, p, n, rr
         CALL apoc.when(
            size(paths) > 0,
              'CALL apoc.convert.toTree(paths) yield value
              return value as tree, collect(properties(ds1)) as sources, collect(properties(rr)) as references',
              'return properties(pp) as props, collect(properties(ds1)) as sources, collect(properties(rr)) as references',
              {paths:paths, ds1:ds1, ds:ds, p:p, d:d, pp:pp, n:n, rr: rr})
          YIELD value
          with {field: p.field, values: collect(properties(value))} as datas, d
         with d{.*, properties: collect(datas)} as diseaseObj, d
         return diseaseObj as disease;
          `;
          this.diseaseService.read('gard-data', 'set-disease', call);
      }))
  ,{dispatch: false});

  fetchHierarchy = createEffect(() =>
      this.actions$.pipe(
        ofType(DiseasesActions.fetchHierarchy),
        tap((action) => {
          if(action.node) {
            const call = `
           match p=(e:HierarchyNode)-[:IsAParent]->(h:HierarchyNode)
           where e.value = {payload} with distinct h, e, p
           match p2=(h)-[:IsAParent]->(r) with count(p2) as count, properties(h) as props, e, p
           order by count DESC
           with e{.*, count: count(p), children: collect(props{.*, count: count})} as hierarchy
           return hierarchy
        `;
            this.diseaseService.read('gard-data', 'fetch-hierarchy', call, {payload: action.node.value})
          }
          } ))
    ,{dispatch: false});


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
  }, {dispatch: false});


  setFilters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      mergeMap((r:RouterNavigationAction) => {
        return of(DiseasesActions.setFiltersSuccess({filters: r.payload.routerState.root.queryParams}))
      })
    )
  })

 /* fetchStats$ = createEffect(() => {
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
            console.log(response);
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


  */
}


