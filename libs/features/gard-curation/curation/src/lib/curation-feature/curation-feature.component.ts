import {ChangeDetectionStrategy, ChangeDetectorRef, Component, InjectionToken, OnInit} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {concatAll, map, mergeMap, switchMap} from "rxjs/operators";
import {Disease, DiseaseSerializer} from "../../../../../../../models/gard/disease";
import {PanelConfig, Position} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";


export const GARD_HEADER_COMPONENT = new InjectionToken<string>('GardHeaderComponent');
export const CURATION_SIDEPANEL_COMPONENT = new InjectionToken<string>('SideNavComponent');
export const GARD_DISEASE_SEARCH_COMPONENT = new InjectionToken<string>('GardDiseaseSearchComponent');
export const CURATION_MAIN_COMPONENT = new InjectionToken<string>('MainComponent');
export const GARD_FOOTER_COMPONENT = new InjectionToken<string>('GardFooter');

@Component({
  selector: 'ncats-frontend-library-curation-feature',
  templateUrl: './curation-feature.component.html',
  styleUrls: ['./curation-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurationFeatureComponent implements OnInit {
  fields: string[];

  /**
   * RxJs subject to broadcast data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _fieldsObservableSource = new BehaviorSubject<any>({});

  /**
   * Observable stream of panel data changes
   * @type {Observable<boolean>}
   */
  fieldsObservable$ = this._fieldsObservableSource.asObservable();

  /**
   * RxJs subject to broadcast data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _diseaseObservableSource = new BehaviorSubject<any>({});

  /**
   * Observable stream of panel data changes
   * @type {Observable<boolean>}
   */
  diseaseObservable$ = this._diseaseObservableSource.asObservable();

  components: PanelConfig[] = [
    {
      token: CURATION_SIDEPANEL_COMPONENT,
      section: Position.Left,
      dataObservable: this.fieldsObservable$
    },
    /*{
      token: GARD_HEADER_COMPONENT,
      section: Position.Header,
      data: {title: this.title}
    },*/
   /* {
      token: GARD_DISEASE_HEADER_COMPONENT,
      section: Position.Header,
      dataObservable: this.diseaseObservable$
    },*/
   {
      token: GARD_DISEASE_SEARCH_COMPONENT,
      section: Position.Content,
      dataObservable: this.diseaseObservable$
    },
    {
      token: CURATION_MAIN_COMPONENT,
      section: Position.Content,
      dataObservable: this.diseaseObservable$
    },
    {
      token: GARD_FOOTER_COMPONENT,
      section: Position.Footer //,
      // dataObservable: this.diseaseObservable$
    }
  ];




  disease: Disease;
  displayDisease: Disease;
  diseaseObj: any[] = [];
  session: RxSession;
  curatedObject = {
    name: '',
    inheritance: []
  };

  searching = false;
  editing: string = '';
  typeaheadFields: Observable<any> = new Observable<any>();
  dataLoaded = false;
  serializer: DiseaseSerializer = new DiseaseSerializer();
  gardDriver: any;
  gardSession: RxSession;

  constructor(
    private changeRef: ChangeDetectorRef,
   private diseasesFacade: DiseasesFacade
   // private connectionService: Neo4jConnectService
  ) {
   /* this.connectionService.session$.subscribe(res => {
      this.session = res;
    });

    this.gardDriver = neo4j.driver(
      'bolt://localhost:7687',
      neo4j.auth.basic('neo4j', 'tim')
    );
    fromPromise(this.gardDriver.verifyConnectivity()
      .then((res) => {
        if (res) {
             this.gardSession = this.gardDriver.rxSession();
        }
      }));*/
  }


  ngOnInit(): void {
    this.diseasesFacade.selectedDisease$.subscribe(res=> {
      if(res) {
        this.disease = res;
        this._diseaseObservableSource.next(this.disease);
        this.changeRef.markForCheck();
      }
    });
  }

  getData(call: string) {
    return this.gardSession.readTransaction(txc => txc.run(call).records());
  }

  search(event: any) {
    console.log(event);
    const calls = [];
    this.searching = true;
    this.dataLoaded = false;
    this.disease = null;
    this.diseaseObj = [];
    let omims: any[] = [],
      orphanets: any[] = [];
    if(event.codes) {
      if (!Array.isArray(event.codes)) {
        event.codes = [event.codes];
      }
      console.log(event);
      omims = [...new Set(event.codes.filter(code => code.includes('OMIM')))];
      orphanets = [...new Set(event.codes.filter(code => code.includes('ORPHANET')))];
      console.log(omims);
      console.log(orphanets);
    }

    //this.calls.push(`match (n:S_OMIM)-[:R_rel{name:'has_inheritance_type'}]-(m:S_OMIM)-[:N_Name|:I_CODE]-(:S_HP)-[]-(z:DATA) WHERE n._N_Name CONTAINS '${event.key.toUpperCase()}' match (n)-[]-(x:DATA), (m)-[]-(y:DATA) with DISTINCT {disease: x.label, inheritance: [{value: y.label, references:['OMIM']}, {value: z.label, references: ['OMIM', 'HPO']}]} as ret RETURN ret`);
    // this.calls.push(`match (n:S_ORDO_ORPHANET{_N_Name: '${event.key.toUpperCase()}'})-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i)-[]-(h:S_HP)-[]-(d:DATA) with DISTINCT {disease: n._N_Name, inheritance: [{value:  i._N_Name, references:['ORPHANET']}, {value: d.label, references: ['ORPHANET', 'HPO']}]} as ret RETURN ret`);
    //  this.calls.push(`match p=(d:DATA{gard_id: '${event.id}'})-[]-(:S_GARD)-[]-(n:S_OMIM)-[:R_rel{name:'has_inheritance_type'}]-(m:S_OMIM)-[:N_Name|:I_CODE]-(:S_HP)-[]-(z:DATA) where n._I_CODE CONTAINS '${omim}' match (n)-[]-(x:DATA), (m)-[]-(y:DATA) with DISTINCT {disease: n._N_Name, inheritance: [{value: y.label, references:['OMIM']}, {value: z.label, references: ['OMIM', 'HPO']}]} as ret RETURN ret;`);
    if(omims && omims.length > 0) {
      omims.forEach(omim => {
      calls.push(`match (n:S_GARD)-[]-(d:DATA{gard_id: '${event.id}'}) with n 
match p=(n)-[:I_CODE|:N_Name]-(o:S_OMIM)
where o._I_CODE CONTAINS '${omim}' with n, o
match p2 = (o)-[:R_rel{name:'has_inheritance_type'}]-(m:S_OMIM)-[:N_Name|:I_CODE]-(:S_HP)-[]-(z:DATA) 
with DISTINCT {disease: n._N_Name, inheritance: [{value:  m._N_Name, references:['OMIM']}, {value: z.label, references: ['OMIM', 'HPO']}]} as ret RETURN ret;`
      )
    });
    }
    if (orphanets && orphanets.length > 0) {
      orphanets.forEach(orphanet => {
      calls.push(`
      match (n:S_GARD)-[]-(d:DATA{gard_id: '${event.id}'}) with n 
match p=(n)-[:I_CODE|:N_Name]-(o:S_ORDO_ORPHANET)
where n._I_CODE CONTAINS '${orphanet}'with n, o
match p2= (o)-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i:S_ORDO_ORPHANET)-[]-(h:S_HP)-[]-(g:DATA)
with DISTINCT {disease: n._N_Name, inheritance: [{value:  i._N_Name, references:['ORPHANET']}, {value: g.label, references: ['ORPHANET', 'HPO']}]} as ret RETURN ret
`)
    });
    }
    from(calls.map(call => {
      return this.getData(call);
    }))
      .pipe(
        map(res => {
          return res
            .pipe(
              mergeMap<any, any>(response => {
                console.log(response);
             //   if (response._fields[0].disease === event.key.toUpperCase()) {
                  this.diseaseObj.push(...response._fields[0].inheritance);
              //  }
                return of(response);
              }));
        }),
        concatAll()
      )
      .subscribe({
        complete: () => {
          const inheritanceValuesArr = [];
          const dataMap: Map<string, string[]> = new Map<string, string[]>();
          this.diseaseObj.forEach(inheritance => {
            if (dataMap.has(inheritance.value)) {
              let arr: string[] = dataMap.get(inheritance.value);
              arr.push(...inheritance.references);
              arr = Array.from(new Set(arr));
              dataMap.set(inheritance.value, arr);
            } else {
              dataMap.set(inheritance.value, inheritance.references);
            }
          });
          Array.from(dataMap.entries()).forEach(entry => {
            inheritanceValuesArr.push({value: entry[0], references: entry[1]})
          });
          this.disease = this.serializer.fromJson({name: event.key, inheritance: inheritanceValuesArr});
          this.displayDisease = this.serializer.fromJson(this.disease);
          this.dataLoaded = true;
          this.searching = false;
          this.editing = 'inheritance';
          this.changeRef.detectChanges();
        }
      });
  }

  typeahead(event: any) {
    const results = [];
    if(event) {
      const call = `
      CALL db.index.fulltext.queryNodes("namesAndSynonyms", "${event}") YIELD node
      RETURN node.name AS key, node.gard_id AS id, node.codes AS codes LIMIT 10;
      `;
      this.getData(call)
        .pipe(
          switchMap(res => {
            console.log(res);
              results.push(res.toObject());
              return res;
            }
          )
        ).subscribe( {
        complete: () => {
          this._diseaseObservableSource.next([{name: 'GARD names', options: results}]);
        }
      })
    }
  }

  /**
   * @param object
   * @param field
   */
  setCuratedObject(object, field): void {
    this.curatedObject[field] = object;
  }

  setObject(field: string): void {
    this.displayDisease[field] = this.curatedObject[field];
    this.editing = null;
  }
}
