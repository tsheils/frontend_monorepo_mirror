import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {concatAll, map, mergeMap, switchMap} from "rxjs/operators";
import {Disease, DiseaseSerializer} from "../../../../../../../models/gard/disease";

@Component({
  selector: 'ncats-frontend-library-curation-feature',
  templateUrl: './curation-feature.component.html',
  styleUrls: ['./curation-feature.component.scss']
})
export class CurationFeatureComponent implements OnInit {
  /**
   * subject to track neo4j session
   */
  private _typeaheadSource = new BehaviorSubject<any>(null);


  /**
   * Observable stream of session changes
   * @type {Observable<RxSession>}
   */
  typeaheadSource$: Observable<any> = this._typeaheadSource.asObservable();


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

  constructor(
    private changeRef: ChangeDetectorRef,
    private connectionService: Neo4jConnectService
  ) {
    this.connectionService.session$.subscribe(res => {
      this.session = res;
    });
  }


  ngOnInit(): void {
  }

  setConnection(connection: Neo4jConnectService) {
    // this.session = connection.session;
  }

  getData(call: string) {
    const session = this.connectionService.driver.rxSession();
    return session.readTransaction(txc => txc.run(call).records());
  }

  search(event: any) {
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
      match p=(n:S_GARD)-[]-(d:DATA) 
      where d.name =~ '(?i).*${event}.*' 
      return d.name as key, d.gard_id as id, n.I_CODE as codes LIMIT 10`;
      this.getData(call)
        .pipe(
          switchMap(res => {
              results.push(res.toObject());
              return res;
            }
          )
        ).subscribe( {
        complete: () => {
          this._typeaheadSource.next([{name: 'GARD names', options: results}]);
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

  disconnect() {
    this.session.close();
    this.session = null;
  }
}
