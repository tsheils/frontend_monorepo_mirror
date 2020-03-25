import {Component, OnInit} from '@angular/core';
import {concatAll, map, mergeMap, switchMap} from "rxjs/operators";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {Disease, DiseaseSerializer} from "../../../../../../../models/gard/disease";

@Component({
  selector: 'ncats-frontend-library-gard-search',
  templateUrl: './gard-search.component.html',
  styleUrls: ['./gard-search.component.scss']
})
export class GardSearchComponent implements OnInit {
  /**
   * subject to track neo4j session
   */
  private _typeaheadSource = new BehaviorSubject<any>(null);


  /**
   * Observable stream of session changes
   * @type {Observable<RxSession>}
   */
  typeaheadSource$: Observable<any> = this._typeaheadSource.asObservable();

  searching = false;
  dataLoaded = false;
  private diseaseObj: any[] = [];
  private disease: any;
  serializer: DiseaseSerializer = new DiseaseSerializer();


  constructor(
    private connectionService: Neo4jConnectService
  ) {
  }

  ngOnInit(): void {
  }

  getData(call: string) {
    const session = this.connectionService.driver.rxSession();
    return session.readTransaction(txc => txc.run(call).records());
  }

  //todo: this searches just for inheritance data ,but ideally, it will pull in the entire disease node from the db
  search(event: any) {
    const calls = [];
    this.searching = true;
    this.dataLoaded = false;
    this.disease = null;
    this.diseaseObj = [];
    let omims: any[] = [],
      orphanets: any[] = [];
    if (event.codes) {
      if (!Array.isArray(event.codes)) {
        event.codes = [event.codes];
      }
      omims = [...new Set(event.codes.filter(code => code.includes('OMIM')))];
      orphanets = [...new Set(event.codes.filter(code => code.includes('ORPHANET')))];
    }

    if (omims && omims.length > 0) {
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
          /* this.fields = Disease.displayFields();
           this._fieldsObservableSource.next(this.fields);
           this._diseaseObservableSource.next(this.disease);
           this.displayDisease = this.serializer.fromJson(this.disease);*/
          this.dataLoaded = true;
          this.searching = false;
          // this.editing = 'inheritance';
          //  this.changeRef.detectChanges();
        }
      });
  }


  typeahead(event: any) {
    const results = [];
    if (event) {
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
        ).subscribe({
        complete: () => {
          this._typeaheadSource.next([{name: 'GARD names', options: results}]);
        }
      })
    }
  }

}
