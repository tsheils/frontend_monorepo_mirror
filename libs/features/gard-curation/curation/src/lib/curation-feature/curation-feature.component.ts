import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {from, of} from "rxjs";
import {concatAll, map, mergeMap} from "rxjs/operators";
import {Disease, DiseaseSerializer} from "../../../../../../../models/gard/disease";

@Component({
  selector: 'ncats-frontend-library-curation-feature',
  templateUrl: './curation-feature.component.html',
  styleUrls: ['./curation-feature.component.scss']
})
export class CurationFeatureComponent implements OnInit {
  disease: Disease;
  displayDisease: Disease;
  diseaseObj: any[] = [];
  session: RxSession;
  curatedObject = {
    name: '',
    inheritance: []
  };

  searching = false;
  editing:string  = '';
  calls: any[] = [];
  dataLoaded = false;
  serializer: DiseaseSerializer = new DiseaseSerializer();

  constructor(
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  setConnection(connection: Neo4jConnectService) {
    this.session = connection.session;
  }

  getData(call: string) {
    if(this.session) {
      return this.session.readTransaction(txc => txc.run(call).records());
    }
  }

  search(event: any) {
    this.searching = true;
    this.dataLoaded = false;
    this.disease = null;
    this.diseaseObj = [];
    this.calls.push(`match (n:S_OMIM)-[:R_rel{name:'has_inheritance_type'}]-(m:S_OMIM)-[:N_Name|:I_CODE]-(:S_HP)-[]-(z:DATA) WHERE n._N_Name CONTAINS '${event.toUpperCase()}' match (n)-[]-(x:DATA), (m)-[]-(y:DATA) with DISTINCT {disease: x.label, inheritance: [{value: y.label, references:['OMIM']}, {value: z.label, references: ['OMIM', 'HPO']}]} as ret RETURN ret`);
this.calls.push(`match (n:S_ORDO_ORPHANET{_N_Name: '${event.toUpperCase()}'})-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i)-[]-(h:S_HP)-[]-(d:DATA) with DISTINCT {disease: n._N_Name, inheritance: [{value:  i._N_Name, references:['ORPHANET']}, {value: d.label, references: ['ORPHANET', 'HPO']}]} as ret RETURN ret`);
    from(this.calls.map(call => {
      return this.getData(call);
    }))
      .pipe(
        map(res => {
          return res
            .pipe(
              mergeMap<any, any>(response => {
                if(response._fields[0].disease === event.toUpperCase()) {
                  this.diseaseObj.push(...response._fields[0].inheritance);
                }
                return of(response);
              }));
        }),
        concatAll()
      )
      .subscribe({
        complete: () => {
          const inheritanceValuesArr = [];
          const dataMap: Map<string, string[]> = new Map<string, string[]>();
          this.diseaseObj.forEach(inheritance =>  {
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
          this.disease = this.serializer.fromJson({name: event, inheritance: inheritanceValuesArr});
          this.displayDisease = this.serializer.fromJson(this.disease);
          this.dataLoaded = true;
          this.searching = false;
          this.editing = 'inheritance';
          this.changeRef.detectChanges();
        }
      });
  }

  typeahead(event: any) {

  }

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
