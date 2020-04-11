import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {from, Observable, of, zip} from "rxjs";
import {concatAll, map, mergeMap, zipAll} from "rxjs/operators";
import * as neo4j from "neo4j-driver";
import {fromPromise} from "rxjs/internal-compatibility";
import Record from 'neo4j-driver/lib/record'
import {Driver, session} from "neo4j-driver";

@Component({
  selector: 'ncats-frontend-library-mapper-feature',
  templateUrl: './mapper-feature.component.html',
  styleUrls: ['./mapper-feature.component.scss']
})
export class MapperFeatureComponent implements OnDestroy {
  title = 'mapper';
  searchTerm: string;
  session: RxSession;
  writesession: RxSession;
  objectFields: any;

  diseaseResult: any;
  diseaseResults: any[] = [];
  sources: any[] = []; //['OMIM', 'ORPHANET'];
  selectedFields: any[] = []; //Map<string, string[]> = new Map<string, string[]>(); //['OMIM', 'ORPHANET'];
  filteredSources: any[] = []; //['OMIM', 'ORPHANET'];
  allSources: any[] = ["S_GARD", "S_GHR", "S_OMIM","S_ORDO_ORPHANET", "S_HP"]; //, "S_HP", "S_MEDLINEPLUS", "S_MESH", "S_OMIM", "S_ICD10CM", "S_ORDO_ORPHANET", "S_THESAURUS", "S_MONDO", "S_VANDF", "S_BTO", "S_CLO", "S_CL", "S_DDIEM", "S_UBERON", "S_GO", "S_GENO", "S_OGG", "S_PW", "S_MP", "S_OAE", "S_RXNO", "S_OGMS", "S_PATO", "S_FMA", "S_EFO", "S_CHEBI", "`S_RANCHO-DISEASE-DRUG_2018-12-18_13-30`", "S_FDAORPHANGARD_20190216", "S_HPO_ANNOTATION_100918", "S_MEDGEN"]; //['OMIM', 'ORPHANET'];
  // allSources: any[] = ["S_GARD", "S_GHR", "S_NORD", "S_DOID"] //, "S_HP", "S_MEDLINEPLUS", "S_MESH", "S_OMIM", "S_ICD10CM", "S_ORDO_ORPHANET", "S_THESAURUS", "S_MONDO", "S_VANDF", "S_BTO", "S_CLO", "S_CL", "S_DDIEM", "S_UBERON", "S_GO", "S_GENO", "S_OGG", "S_PW", "S_MP", "S_OAE", "S_RXNO", "S_OGMS", "S_PATO", "S_FMA", "S_EFO", "S_CHEBI", "`S_RANCHO-DISEASE-DRUG_2018-12-18_13-30`", "S_FDAORPHANGARD_20190216", "S_HPO_ANNOTATION_100918", "S_MEDGEN"]; //['OMIM', 'ORPHANET'];
  allSourcesLoading = false;
  writedriver: Driver;
  driver: Driver;

  constructor(
    private changeRef: ChangeDetectorRef,
    private connectionService: Neo4jConnectService
  ) {
   // this.fetchKeys();
  }

  fetchKeys() {
    this.allSourcesLoading = true;
    const obs = [];
    const call = `
    UNWIND ["S_GARD", "S_GHR", "S_OMIM","S_ORDO_ORPHANET", "S_HP"] as row
    MATCH (n:Entity)-[r]-(d:DATA) WHERE row IN labels(n)
    WITH DISTINCT keys(d) AS keys UNWIND keys AS keyslisting WITH DISTINCT keyslisting AS allfields 
    RETURN collect(allfields) as data;
    `;
    this.connectionService.read('raw-data', call, {payload: this.allSources}).subscribe(res => {
      // console.log(res);
      }
    )
/*
    this.allSources.forEach(source => {
      obs.push({source: source, call:`MATCH (n:${source})-[r]-(d:DATA) WITH DISTINCT keys(d) AS keys UNWIND keys AS keyslisting WITH DISTINCT keyslisting AS allfields RETURN collect(allfields)`});
    });
*/

/*    // `CALL db.labels() YIELD label WITH label WHERE label Starts WITH 'S_' RETURN collect(label) AS datasources`
    // todo: this returns the fields one source at a time
    from(obs.map(call => {
      return {source: call.source, call: this.connectionService.read('raw-data', call.call)};
    }))
      .pipe(
        map(res => {
          return res['call']
            .pipe(
              mergeMap(response => {
                this.filteredSources.push({name: res.source.replace('S_', ''), fields: response.get(response.keys[0])});
                return of(response);
              }));
        }),
        concatAll()
      )
      .subscribe({
        complete: () => {
          this.allSourcesLoading = false;
          this.sources = this.filteredSources;
        }
      });*/
  }
  setObjectFields(event: any) {
    this.objectFields = event;
  }

  setFields(event: any) {
    this.selectedFields = [...event.entries()].map(entry => entry = {source: entry[0], fields: entry[1]});
    // event.keys().forEach(key => this.selectedFields.push({key: event.get(key)}))
  }

  search(event: any) {
    console.log(event);
    this.connectionService.read('raw-data',`match p=(n:S_ORDO_ORPHANET{_N_Name: '${event.toUpperCase()}'})-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i)-[]-(h:S_HP)-[]-(d:DATA) return n._N_Name as disease, i._N_Name as ORPHANET_inheritance,  d.label as HPO_inheritance`)
      .subscribe(res=> this.diseaseResult = res);
  }

  typeahead(event: any) {

  }

  filter(term: string) {
    this.searchTerm = term;
    this.filteredSources = this.sources.filter(option => JSON.stringify(option).toLowerCase().includes(term.toLowerCase()));
  }

  runQuery() {
  }

  initialBuild() {
    const diseases: any[] = [];
      const writedriver = neo4j.driver(
      ' bolt://gard-dev.ncats.io:7687',
      neo4j.auth.basic('neo4j', 'vei1jeiceiK3Ohyaelai')
    );
     fromPromise(writedriver.verifyConnectivity()
      .then(() => {
     //   const session = this.connectionService.driver.rxSession();
        const call = `
        match (n:S_GARD)-[]-(d:DATA) 
        return d.name as name, d.gard_id as gard_id, n.N_Name as synonyms, n._N_Name as synonymsString, n.I_CODE as codes;
        `;
        this.connectionService.read('raw-data', call)
          .subscribe({
           next: (res) => {
            const writesession = writedriver.rxSession();
            const writecall = `CREATE (n:Disease $data)`;
            const resObject: any = res;
              if (!Array.isArray(resObject.synonyms)) {
                resObject.synonyms = [resObject.synonyms];
              }
              if (!Array.isArray(resObject.codes)) {
                resObject.codes = [resObject.codes];
              }
            diseases.push({call: writecall, data: resObject});

          },
          complete: () => {
            from(diseases.map(call => {
              const writesession = writedriver.rxSession();
              return writesession.writeTransaction(txc => txc.run(call.call, {data: call.data}).records());
            }))
              .pipe(
                concatAll()
              )
              .subscribe({
                complete: () => {
                }
              });
          }
        });
      }));
  }

  buildInheritance() {
    const call = `
    MATCH (n:S_GARD)-[:PAYLOAD]-(d:DATA) WITH n, d.gard_id AS id
MATCH (n:S_GARD)-[:I_CODE|:N_Name]-(o:S_OMIM)-[:R_rel{name:'has_inheritance_type'}]-(m:S_OMIM) WITH id, COLLECT(DISTINCT m._N_Name) AS omims, COLLECT(DISTINCT m) AS m, n
UNWIND(m) AS mm
OPTIONAL MATCH (mm:S_OMIM)-[:N_Name|:I_CODE]-(:S_HP)-[:PAYLOAD]-(z:DATA) WITH id, m, n, COLLECT(DISTINCT z.label) AS omimhpos, omims
WITH DISTINCT {d: id, h: omimhpos, o: omims} AS omim, n
MATCH (n:S_GARD)-[:I_CODE|:N_Name]-(o:S_ORDO_ORPHANET)-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i:S_ORDO_ORPHANET) WITH omim, COLLECT(DISTINCT i._N_Name) AS orphas, COLLECT(DISTINCT i) AS i
UNWIND(i) AS ii
OPTIONAL MATCH (ii:S_ORDO_ORPHANET)-[:I_CODE|:N_Name]-(h:S_HP)-[:PAYLOAD]-(g:DATA) WITH i, COLLECT(DISTINCT g.label) AS orphaHpos , omim, orphas
WITH DISTINCT {disease: omim.d, omim:omim.o, omim_hpo: omim.h, orphanet: orphas, orphanet_hpo:orphaHpos} AS ret
  RETURN ret;
    `;
//    RETURN ret.disease AS disease, ret.omim AS omim, ret.omimhpo AS omimhpo, ret.orpha AS orphanet, ret.orphahpo AS orphahpo LIMIT 10

    const mainDataMap: Map<string, string[]> = new Map<string, string[]>();
    this.connectionService.read('raw-data', call).subscribe({
      next: (res) => {
        const inheritanceValuesArr = [];
        res.forEach(disease => {
          let inheritanceValuesArr = [];
          const dataMap: Map<string, string[]> = new Map<string, string[]>();
          Object.keys(disease).forEach(key => {
            if (key !== 'disease') {
              disease[key].forEach(inheritance => {
                if (dataMap.has(inheritance)) {
                  let arr: string[] = dataMap.get(inheritance).concat(key.split('_'));
                  //  arr.push(...inheritance.references);
                  arr = Array.from(new Set(arr));
                  dataMap.set(inheritance, arr);
                } else {
                  dataMap.set(inheritance, key.split('_'));
                }
              });
            }
          });
          Array.from(dataMap.entries()).forEach(entry => {
            inheritanceValuesArr.push({value: entry[0], references: entry[1], preferred: entry[1].includes('hpo')})
          });
          mainDataMap.set(disease.disease, inheritanceValuesArr);
        });
      },
      complete: () => {
        const retData: any[] = [];
       [...mainDataMap.entries()].forEach(entry => {
          retData.push({disease: entry[0], values: entry[1]});
        });
        this.writeData(retData, 'Inheritance');
    }
    });
  }


  writeData(payload: any[], type: string) {
    const create = `
    UNWIND {payload} as row
    match (a:Disease) where a.gard_id = row.disease with a, row
    unwind row.values as value
    CREATE (n:DataRef)
    SET n += value
    CREATE p=(a)-[r:${type} { dateCreated: ${Date.now()}}]->(n)
    return count(p);
    `;
    this.connectionService.write('gard-data', create, {payload: payload}).subscribe(res=> {
    })
  }

  ngOnDestroy() {

  }

}
