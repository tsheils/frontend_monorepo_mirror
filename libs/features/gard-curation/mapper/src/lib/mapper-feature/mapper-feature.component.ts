import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {from, Observable, of, zip} from "rxjs";
import {concatAll, map, mergeAll, mergeMap, zipAll} from "rxjs/operators";
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
  allSources: any[] = ["S_GARD", "S_GHR", "S_OMIM", "S_ORDO_ORPHANET", "S_HP"]; //, "S_HP", "S_MEDLINEPLUS", "S_MESH", "S_OMIM", "S_ICD10CM", "S_ORDO_ORPHANET", "S_THESAURUS", "S_MONDO", "S_VANDF", "S_BTO", "S_CLO", "S_CL", "S_DDIEM", "S_UBERON", "S_GO", "S_GENO", "S_OGG", "S_PW", "S_MP", "S_OAE", "S_RXNO", "S_OGMS", "S_PATO", "S_FMA", "S_EFO", "S_CHEBI", "`S_RANCHO-DISEASE-DRUG_2018-12-18_13-30`", "S_FDAORPHANGARD_20190216", "S_HPO_ANNOTATION_100918", "S_MEDGEN"]; //['OMIM', 'ORPHANET'];
  // allSources: any[] = ["S_GARD", "S_GHR", "S_NORD", "S_DOID"] //, "S_HP", "S_MEDLINEPLUS", "S_MESH", "S_OMIM", "S_ICD10CM", "S_ORDO_ORPHANET", "S_THESAURUS", "S_MONDO", "S_VANDF", "S_BTO", "S_CLO", "S_CL", "S_DDIEM", "S_UBERON", "S_GO", "S_GENO", "S_OGG", "S_PW", "S_MP", "S_OAE", "S_RXNO", "S_OGMS", "S_PATO", "S_FMA", "S_EFO", "S_CHEBI", "`S_RANCHO-DISEASE-DRUG_2018-12-18_13-30`", "S_FDAORPHANGARD_20190216", "S_HPO_ANNOTATION_100918", "S_MEDGEN"]; //['OMIM', 'ORPHANET'];
  allSourcesLoading = false;
  writedriver: Driver;
  driver: Driver;

  dictionary: Map<string, string[]> = new Map<string, string[]>();

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
    this.connectionService.read('raw-data', `match p=(n:S_ORDO_ORPHANET{_N_Name: '${event.toUpperCase()}'})-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i)-[]-(h:S_HP)-[]-(d:DATA) return n._N_Name as disease, i._N_Name as ORPHANET_inheritance,  d.label as HPO_inheritance`)
      .subscribe(res => this.diseaseResult = res);
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
    // todo - delete this
    const writedriver = neo4j.driver(
      'bolt://localhost:7687',
      neo4j.auth.basic('neo4j', 'tim')
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
              console.log(res);
              const writesession = writedriver.rxSession();
              const writecall = `CREATE (n:Disease $data) return n`;
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
              console.log("compete");
              console.log(diseases);
              from(diseases.map(call => {
                console.log(call);
                const writesession = writedriver.rxSession();
                return writesession.writeTransaction(txc => txc.run(call.call, {data: call.data}).records());
              }))
                .pipe(
                  concatAll()
                )
                .subscribe({
                  complete: () => {
                    console.log("done")
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

  buildInheritance2() {
    const call = `
MATCH (n:S_GARD)-[:PAYLOAD]-(d:DATA) WITH n, d.gard_id AS id
MATCH (n:S_GARD)-[:I_CODE|:N_Name]-(o:S_OMIM)-[:R_rel{name:'has_inheritance_type'}]-(m:S_OMIM) WITH COLLECT(DISTINCT {value: m._N_Name, reference: 'OMIM'}) AS omim, n, id
MATCH (n:S_GARD)-[:I_CODE|:N_Name]-(o:S_ORDO_ORPHANET)-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i:S_ORDO_ORPHANET) WITH omim,  collect(Distinct {value: i._N_Name, reference: 'ORPHANET'}) AS orphas, id
WITH {disease: id, inheritance: omim + orphas} AS ret
  RETURN collect(ret) as data;
    `;
//    RETURN ret.disease AS disease, ret.omim AS omim, ret.omimhpo AS omimhpo, ret.orpha AS orphanet, ret.orphahpo AS orphahpo LIMIT 10
console.log(call);
    const mainDataMap: Map<string, string[]> = new Map<string, string[]>();
    let data = [];
    this.connectionService.read('raw-data', call).subscribe({
      next: (res) => {
       console.log(res);
       data = res;
      },
      complete: () => {
      //  const retData: any[] = [];
  /*      [...mainDataMap.entries()].forEach(entry => {
          retData.push({disease: entry[0], values: entry[1]});
        });*/
        console.log(data);
       this.writeData(data, 'Inheritance');
      }
    });
  }


  writeData(payload: any, type: string) {
    const totalRefs = 2;
    // todo delete this
    const writedriver = neo4j.driver(
      'bolt://gard-dev.ncats.io:7687',
      neo4j.auth.basic('neo4j', 'vei1jeiceiK3Ohyaelai')
    );
    fromPromise(writedriver.verifyConnectivity()
      .then(() => {
        const session = writedriver.rxSession();
        const inheritanceTerms = `
        MATCH p=()-[r:TermOf]->(t:DataDictionaryTerm) with t
unwind t.alternateValues as av
return collect(distinct {display: t.displayValue,alt:av}) as data
        `;

        session.readTransaction(txc => txc.run(inheritanceTerms).records()).subscribe(res => {
          console.log(res);
          const inheritanceDictionary = res.toObject()['data'];
          payload.data.map(disease => {
            disease.displayValue = [];
            disease.noDisplay = [];
            const inheritanceMap: Map<string, any[]> = new Map<string, any[]>();
            disease.inheritance.forEach(value => {
              const disp = inheritanceDictionary.filter(val => val.alt === value.value)[0];
              if (disp) {
                if (inheritanceMap.has(disp.display)) {
                  const vals = inheritanceMap.get(disp.display);
                  vals.push(value);
                  inheritanceMap.set(disp.display, vals);
                } else {
                  inheritanceMap.set(disp.display, [value]);
                }
              } else {
                disease.noDisplay.push(value);
                disease.noDisplay = [...new Set(disease.noDisplay)]
              }
            });

            disease.displayValue = Array.from(inheritanceMap.entries()).map(ent => {
              return {displayValue: ent[0], inheritance: ent[1]}
            });
            // console.log(inheritanceMap);
            /*        [...inheritanceMap.entries()].forEach((key, value) => {
                      if(value % totalRefs === 0){
                        console.log("match");
                        disease.displayValue = key;
                      }
                    })*/
          });

          console.log(payload);


          /*        const create = `
              UNWIND {payload} as row // all disease inheritance data
              match (a:Disease) where a.gard_id = row.disease with a, row //fetch disease
              unwind row.inheritance as value //disease inheritance data
              CREATE (n:DataRef:${type}) //dataRef node for inheritance
              SET n += value // set node
              CREATE p=(a)-[r:Properties { dateCreated: ${Date.now()}}]->(n) with p, n, value // link disease to inheritance node
              match (d:DataDictionary {field: '${type.toLowerCase()}'})-[:TermOf]-(t:DataDictionaryTerm) //get dictionary
              where value.value in t.alternateValues // match term with alternate values
              set n.displayValue = t.displayValue // set display value
              CREATE p2=(n)-[r2:HasDisplayTerm]->(t)
              return count(p), count(p2);
              `;*/

          const create = `
UNWIND {payload} as row // all disease inheritance data
    match (a:Disease) where a.gard_id = row.disease with a, row //fetch disease
    FOREACH (noDisplayValue in row.noDisplay | //disease inheritance data
    CREATE (n2:NoDisplayProperty:${type}) //dataRef node for inheritance with hpo mapping
    SET n2 += noDisplayValue
create p2=(a)-[r2:Properties { dateCreated: ${Date.now()}}]->(n2)// link disease to inheritance display node
) with row, a
    unwind row.displayValue as displayValue //disease inheritance data
    CREATE (n:DisplayProperty:${type}) //dataRef node for inheritance
    SET n.displayValue = displayValue.displayValue // set node
CREATE p=(a)-[r:Properties { dateCreated: ${Date.now()}}]->(n) with a, p, n, displayValue, row // link disease to inheritance display node
match (d:DataDictionary {field: '${type.toLowerCase()}'})-[:TermOf]-(t:DataDictionaryTerm {displayValue: displayValue.displayValue }) //get dictionary
    CREATE p3=(n)-[r3:HasDisplayTerm]->(t) with distinct displayValue, row, a, n, t
  
  FOREACH (inheritance in displayValue.inheritance |
    CREATE (ref:DataRef:${type}) //dataRef node for inheritance 
    SET ref += inheritance
    CREATE p4=(n)-[r4: ReferenceSource { dateCreated: ${Date.now()}}]->(ref)  // link disease to inheritance node
    )
    
    return true;
`;
          const session2 = writedriver.rxSession();

          console.log("writing");
          session2.writeTransaction(txc => txc.run(create, {payload: payload['data']}).records()).subscribe(res => {
            console.log(res);
          })
        })
      }))
  }

  mapDataDictionary() {
    const orpha = `
    MATCH (n:S_GARD)-[:I_CODE|:N_Name]-(o:S_ORDO_ORPHANET)-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i:S_ORDO_ORPHANET) with i
OPTIONAL MATCH (i:S_ORDO_ORPHANET)-[:I_CODE|:N_Name]-(h:S_HP)-[:PAYLOAD]-(g:DATA)
with distinct {displayTerm: g.label, alternativeTerms: collect(distinct i._N_Name)} as rawdata
return distinct collect(rawdata) as data
    `;
    const omim = `
    MATCH (n:S_GARD)-[:I_CODE|:N_Name]-(o:S_OMIM)-[:R_rel{name:'has_inheritance_type'}]-(l:S_OMIM) with l
OPTIONAL MATCH (l:S_OMIM)-[:N_Name|:I_CODE]-(:S_HP)-[:PAYLOAD]-(z:DATA)
with distinct {displayTerm: z.label, alternativeTerms: collect(distinct l._N_Name)} as rawdata
return collect(rawdata) as data
    `;

//const calls = ;
   const obs = [omim, orpha];
        from(obs.map(call => {
          return { call: this.connectionService.read('raw-data', call)};
        }))
          .pipe(
            map(res => {
              return res['call']
                .pipe(
                  mergeMap(response => {
                    console.log(response);
                    response['data'].forEach(entry => {
                      let disp = [];
                      if (this.dictionary.has(entry.displayTerm)) {
                        disp = this.dictionary.get(entry.displayTerm);
                        const terms = [... new Set(disp.concat(entry.alternativeTerms))];
                        this.dictionary.set(entry.displayTerm, terms);
                      } else {
                        this.dictionary.set(entry.displayTerm, entry.alternativeTerms);
                      }
                    })
                    return of(response);
                  }),
                );
            }),
            concatAll()
          )
          .subscribe();
  }

  createReference() {
    const dictionary = [];
    Array.from(this.dictionary.entries()).forEach(entry => {
      if(entry[0])
      dictionary.push({displayValue:entry[0], alternateValues: entry[1] })
    });
    console.log(dictionary);
    const payload = {origin: 'hpo', fields: [{field: 'inheritance', terms: dictionary}]};
    console.log(dictionary);
    const call = `
    match (r:DataDictionary)
        unwind {payload} as term
      create (l:DataDictionaryTerm)
      with {displayValue: term.displayValue, alternateValues: term.alternateValues} as props, r, l
      set l = props
      create p=(r)-[:TermOf]->(l)
return p;
    `;
   this.connectionService.write('gard-data', call, {payload:dictionary}).subscribe(res=> console.log(res));
  }

  checkSources() {
    const totalRefs = 2;
const call =`
MATCH p=(d:Disease)-[r:Properties]-(i:Inheritance) with distinct(d), collect(properties(i)) as inheritances
with { disease: d.gard_id, inheritance: inheritances} as diseases
RETURN collect(diseases) as data LIMIT 10
`;

this.connectionService.read('gard-data', call).pipe(
  map(res => {
    console.log(res);
    res.data.map(disease => {
      const inheritanceMap: Map<string, string[]> = new Map<string, string[]>();
      disease.inheritance.forEach(value => {
        if(inheritanceMap.has(value.displayValue)) {
          let refs = inheritanceMap.get(value.displayValue);
          refs.push(value.reference);
          refs = Array.from(new Set(refs));
          inheritanceMap.set(value.displayValue, refs);
        } else {
          inheritanceMap.set(value.displayValue, [value.reference]);
        }
      });
      console.log(inheritanceMap);
      [...inheritanceMap.entries()].forEach((key, value) => {
        if(value % totalRefs === 0){
          console.log("match");
        }
      })
    })
  })
).subscribe()
  }


  ngOnDestroy() {

  }

}
