import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
  }


  ngOnInit(): void {
  }

  getRawData(call: string) {
   // const session = this.connectionService.driver.rxSession();
  //    return session.readTransaction(txc => txc.run(call).records());
  }

  getWriteData(call: string, data?: any) {
    const session = this.writedriver.rxSession();
    if (data) {
      return session.writeTransaction(txc => txc.run(call, {data: data}).records());
    } else {
      return session.readTransaction(txc => txc.run(call).records());
    }
  }

  fetchKeys() {
    this.allSourcesLoading = true;
    const obs = [];
    this.allSources.forEach(source => {
      obs.push({source: source, call:`MATCH (n:${source})-[r]-(d:DATA) WITH DISTINCT keys(d) AS keys UNWIND keys AS keyslisting WITH DISTINCT keyslisting AS allfields RETURN collect(allfields)`});
    });

    // `CALL db.labels() YIELD label WITH label WHERE label Starts WITH 'S_' RETURN collect(label) AS datasources`
    // todo: this returns the fields one source at a time
    from(obs.map(call => {
      return {source: call.source, call: this.getRawData(call.call)};
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
      });
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
    this.getData(`match p=(n:S_ORDO_ORPHANET{_N_Name: '${event.toUpperCase()}'})-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i)-[]-(h:S_HP)-[]-(d:DATA) return n._N_Name as disease, i._N_Name as ORPHANET_inheritance,  d.label as HPO_inheritance`)
      .subscribe(res=> this.diseaseResult = res.toObject());
  }

  typeahead(event: any) {

  }

  filter(term: string) {
    this.searchTerm = term;
    this.filteredSources = this.sources.filter(option => JSON.stringify(option).toLowerCase().includes(term.toLowerCase()));
  }

  runQuery() {
   /* this.getData(`match p=(n:S_ORDO_ORPHANET)-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i)-[]-(h:S_HP)-[]-(d:DATA) return n._N_Name as disease, i._N_Name as ORPHANET_inheritance,  d.label as HPO_inheritance limit 25`)
      .subscribe(res=> {
        console.log(res);
        this.diseaseResults.push(res.toObject());
      });*/

    /*    match p = (n:S_GARD)-[r:R_rel]-(m:`S_HP`)-[]-(d:DATA)
        where n._N_Name contains "CYSTIC FIBROSIS"
        AND EXISTS(r.`HPO-ID`)
        AND "inheritance_type_of" IN m.R_rel
        RETURN p AS inheritance
        UNION
        match q = (n:S_ORDO_ORPHANET)-[r:R_rel]-(m:`S_HP`)-[]-(d:DATA)
        where n._N_Name contains "CYSTIC FIBROSIS"
        AND EXISTS(r.`HPO-ID`)
        AND "inheritance_type_of" IN m.R_rel
        return q AS inheritance*/




  }

  initialBuild() {
    const diseases: any[] = [];
/*    const writedriver = neo4j.driver(
      'bolt://localhost:7687',
      neo4j.auth.basic('neo4j', 'tim')
    ); */
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
          //   console.log(res);
            const writesession = writedriver.rxSession();
            const writecall = `CREATE (n:Disease $data)`;
           //   writesession.writeTransaction(txc => txc.run(writecall, {data: res.toObject()}).records()).subscribe(res => console.log(res));
           //   writesession.close();
            const resObject: any = res.toObject();
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
                  console.log("done");
                }
              });
          }
        });
      }));
  }

/*
  buildInheritance() {
    const diseases: any[] = [];
        console.log("loggied in");
        const call = `
        match (n:Disease)
        return n as data LIMIT 100
        `;
        this.getWriteData(call).subscribe(res => {
          console.log(res);
          this.fetchInheritanceData(res.toObject()['data']).subscribe(response => {
            if(response) {
                        const inheritanceValuesArr = [];
                        const dataMap: Map<string, string[]> = new Map<string, string[]>();
                        response.forEach( source => {
                          console.log(source);
                        source.toObject()['data'].forEach(inheritance => {
                            if (dataMap.has(inheritance.value)) {
                              let arr: string[] = dataMap.get(inheritance.value).concat(inheritance.references);
                              //  arr.push(...inheritance.references);
                              arr = Array.from(new Set(arr));
                              dataMap.set(inheritance.value, arr);
                            } else {
                              dataMap.set(inheritance.value, inheritance.references);
                            }
                        });
                        Array.from(dataMap.entries()).forEach(entry => {
                          inheritanceValuesArr.push({value: entry[0], references: entry[1]})
                        });
                        this.addRelationshipToNode(res.toObject()['data'], inheritanceValuesArr, 'Inheritance');

                    })
                } else {
             // session.close();
              }
            }
          );
        });
  }
*/

  addRelationshipToNode(startNode, endNode, relationshipType) {
    const nodeId = startNode.properties.gard_id;
    const create = `
    match (a:Disease)
    where a.gard_id = '${nodeId}' with a
    CREATE (b:DataRef $data) with a, b
    CREATE p=(a)-[r:${relationshipType} { dateCreated: ${Date.now()}}]->(b)
    return p;
    `;

        endNode.map(value => {
          console.log(value);
          this.getWriteData(create, {data: value}).subscribe(res=> {
          });
        });
  }

/*
  fetchInheritanceData(node): Observable<any> {
    const calls = [];
    const retArr = [];
    const omims: any[] = [...new Set(node.properties.codes.filter(code => code.includes('OMIM')))];
    const orphanets: any [] = [...new Set(node.properties.codes.filter(code => code.includes('ORPHANET')))];
    if(omims && omims.length > 0) {
      omims.forEach(omim => {
        calls.push(`match (n:S_GARD)-[]-(d:DATA{gard_id: '${node.properties.gard_id}'}) with n
match p=(n)-[:I_CODE|:N_Name]-(o:S_OMIM)
where o._I_CODE CONTAINS '${omim}' with o
match p2 = (o)-[:R_rel{name:'has_inheritance_type'}]-(m:S_OMIM)-[:N_Name|:I_CODE]-(:S_HP)-[]-(z:DATA)
with DISTINCT [{value:  m._N_Name, references:['OMIM']}, {value: z.label, references: ['OMIM', 'HPO']}] as data RETURN data;`
        )
      });
    }
    if (orphanets && orphanets.length > 0) {
      orphanets.forEach(orphanet => {
        calls.push(`
      match (n:S_GARD)-[]-(d:DATA{gard_id: '${node.properties.gard_id}'}) with n
match p=(n)-[:I_CODE|:N_Name]-(o:S_ORDO_ORPHANET)
where n._I_CODE CONTAINS '${orphanet}'with o
match p2= (o)-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i:S_ORDO_ORPHANET)-[]-(h:S_HP)-[]-(g:DATA)
with DISTINCT [{value:  i._N_Name, references:['ORPHANET']}, {value: g.label, references: ['ORPHANET', 'HPO']}] as data RETURN data;
`)
      });
    }
    if(calls.length > 0) {
      return from(calls.map(call => {
        console.log(call);
       return this.getRawData(call);
      }))
        .pipe(
          zipAll()
        )
    } else {
      return of(null);
    }
  }
*/

  ngOnDestroy() {

  }

}
