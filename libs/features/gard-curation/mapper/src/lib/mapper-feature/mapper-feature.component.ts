import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {map} from "rxjs/operators";
import {Driver} from "neo4j-driver";
import * as neo4j from "neo4j-driver";
import {Neo4jConnectService} from "@ncats-frontend-library/shared/data-access/neo4j-connector";
import {PanelConfig, Position} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {
  CURATION_MAIN_COMPONENT,
  CURATION_SIDEPANEL_COMPONENT,
  GARD_DISEASE_HEADER_COMPONENT, GARD_DISEASE_SEARCH_COMPONENT, GARD_FOOTER_COMPONENT
} from "../../../../curation/src/lib/curation-feature/curation-feature.component";
import {GardReference} from "@ncats-frontend-library/models/gard/gard-models";
import {
  GardDataProperty,
  GardDataPropertySerializer
} from "../../../../../../models/gard/gard-models/src/lib/models/gard-base";

@Component({
  selector: 'ncats-frontend-library-mapper-feature',
  templateUrl: './mapper-feature.component.html',
  styleUrls: ['./mapper-feature.component.scss']
})
export class MapperFeatureComponent implements OnDestroy {
  title = 'mapper';
  searchTerm: string;
  session: RxSession;
 // writesession: RxSession;
  objectFields: any;
  pairs: any[] = []

  diseaseResult: any;
  diseaseResults: any[] = [];
  sources: any[] = []; //['OMIM', 'ORPHANET'];
  selectedFields: any[] = []; //Map<string, string[]> = new Map<string, string[]>(); //['OMIM', 'ORPHANET'];
  filteredSources: any[] = []; //['OMIM', 'ORPHANET'];
  allSources: any[] = ["S_GARD", "S_GHR", "S_OMIM", "S_ORDO_ORPHANET", "S_HP"]; //, "S_HP", "S_MEDLINEPLUS", "S_MESH", "S_OMIM", "S_ICD10CM", "S_ORDO_ORPHANET", "S_THESAURUS", "S_MONDO", "S_VANDF", "S_BTO", "S_CLO", "S_CL", "S_DDIEM", "S_UBERON", "S_GO", "S_GENO", "S_OGG", "S_PW", "S_MP", "S_OAE", "S_RXNO", "S_OGMS", "S_PATO", "S_FMA", "S_EFO", "S_CHEBI", "`S_RANCHO-DISEASE-DRUG_2018-12-18_13-30`", "S_FDAORPHANGARD_20190216", "S_HPO_ANNOTATION_100918", "S_MEDGEN"]; //['OMIM', 'ORPHANET'];
  // allSources: any[] = ["S_GARD", "S_GHR", "S_NORD", "S_DOID"] //, "S_HP", "S_MEDLINEPLUS", "S_MESH", "S_OMIM", "S_ICD10CM", "S_ORDO_ORPHANET", "S_THESAURUS", "S_MONDO", "S_VANDF", "S_BTO", "S_CLO", "S_CL", "S_DDIEM", "S_UBERON", "S_GO", "S_GENO", "S_OGG", "S_PW", "S_MP", "S_OAE", "S_RXNO", "S_OGMS", "S_PATO", "S_FMA", "S_EFO", "S_CHEBI", "`S_RANCHO-DISEASE-DRUG_2018-12-18_13-30`", "S_FDAORPHANGARD_20190216", "S_HPO_ANNOTATION_100918", "S_MEDGEN"]; //['OMIM', 'ORPHANET'];
  allSourcesLoading = false;
 // writedriver: Driver;
  driver: Driver;
  clones: any[] = [];
  dataz: any[] = [];

  dictionary: Map<string, string[]> = new Map<string, string[]>();
  gardPropertySerializer: GardDataPropertySerializer = new GardDataPropertySerializer();


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

    /*
    this.connectionService.read('raw-data', call, {payload: this.allSources}).subscribe(res => {
      }
    )*/
  }

  setObjectFields(event: any) {
    this.objectFields = event;
  }

  setFields(event: any) {
    this.selectedFields = [...event.entries()].map(entry => entry = {source: entry[0], fields: entry[1]});
    // event.keys().forEach(key => this.selectedFields.push({key: event.get(key)}))
  }

  runQuery() {
  }


  initialBuild2() {
    const diseases: any[] = [];
    const call = `
        match (n:S_GARD)-[]-(d:DATA) 
        return d.name as name, d.gard_id as gard_id, n.N_Name as synonyms, n._N_Name as synonymsString, n.I_CODE as codes;
        `;
/*    this.connectionService.read('raw-data', call)
      .subscribe({
        next: (res) => {
          const resObject: any = res;
          if (!Array.isArray(resObject.synonyms)) {
            resObject.synonyms = [resObject.synonyms];
          }
          if (!Array.isArray(resObject.codes)) {
            resObject.codes = [resObject.codes];
          }
          diseases.push(resObject)
        },
        complete: () => {
          const writecall = `
              UNWIND {payload} as data
              CREATE (n:Disease)
              SET n += data
              SET n.dateCreated = ${Date.now().toString()} ;
               return count(n)`;
          this.connectionService.write('gard-data', writecall, {payload: diseases}).subscribe(res => console.log(res))
        }
      });*/
  }

/*  initialBuild() {
    const diseases: any[] = [];
    const call = `
        match (n:S_GARD)-[]-(d:DATA)
        return d.name as name, d.gard_id as gard_id, n.N_Name as synonyms, n._N_Name as synonymsString, n.I_CODE as codes;
        `;
    this.connectionService.read('raw-data', call)
      .subscribe({
        next: (res) => {
          const resObject: any = res;
          if (!Array.isArray(resObject.synonyms)) {
            resObject.synonyms = [resObject.synonyms];
          }
          if (!Array.isArray(resObject.codes)) {
            resObject.codes = [resObject.codes];
          }
          if (resObject.codes) {
            const externalLinks = [];
            resObject.omimCodes = [];
            resObject.sources = [];
            resObject.codes = resObject.codes.map(code => {
              const splitCode = code.split(':');
              const reference: GardReference = new GardReference({source: splitCode[0]});
              if (reference.url) {
                reference.url = reference.url.concat(splitCode[1]);
              }
              const codeObj: GardDataProperty = this.gardPropertySerializer.fromJson({
                // references: [reference],
                source: splitCode[0],
                value: splitCode[1],
                displayValue: code,
              });
              if (splitCode[0] === 'OMIM') {
                resObject.omimCodes.push(splitCode[1]);
              }
              resObject.sources.push(reference);
              //  externalLinks.push(codeObj);
              return codeObj;
            });

            if (resObject.omimCodes.length === 0) {
              delete resObject.omimCodes;
            }


            //  resObject.codes = [externalLinks];
          }
          console.log(resObject);
          diseases.push(resObject)
        },
        complete: () => {
          const writecall = `
              UNWIND {payload} as data
              CREATE (n:Disease)
              set n.name = data.name
              set n.gard_id = data.gard_id
              set n.synonyms = data.synonyms
              set n.synonymsString = data.synonymsString
              SET n.dateCreated = ${Date.now().toString()}

              CREATE (d2:MainProperty:Synonyms) //dataRef node for synonym
              set d2.field = 'synonyms'
              set d2.count = size(data.synonyms)
              SET d2.dateCreated = ${Date.now().toString()}
              CREATE (n)-[:Properties { dateCreated: '${Date.now().toString()}' }]->(d2) // link disease to synonym display node

              CREATE (d3:MainProperty:Codes) //dataRef node for synonym
              set d3.field = 'codes'
              set d3.count = size(data.codes)
              SET d3.dateCreated = ${Date.now().toString()}
              CREATE (n)-[:Properties { dateCreated: '${Date.now().toString()}'}]->(d3) // link disease to synonym display node

              CREATE (d4:MainProperty:Sources) //dataRef node for synonym
              set d4.field = 'sources'
              set d4.count = size(data.sources)
              SET d4.dateCreated = ${Date.now().toString()}
              CREATE (n)-[:Properties { dateCreated: '${Date.now().toString()}' }]->(d4) // link disease to synonym display node

              FOREACH (source in data.sources | //disease code data
              CREATE (src:Property:DataSource) //dataRef node for code
              SET src = source // set node
              SET src.dateCreated = ${Date.now().toString()}
              MERGE (d4)-[:DisplayValue { dateCreated: '${Date.now().toString()}' }]->(src)  // link disease to code display node
              ) with data, n, d2, d3, d4

              FOREACH (s in data.synonyms | //disease synonym data
              CREATE (d:Property:Synonym) //dataRef node for synonym
              SET d.displayValue = s // set node
              SET d.sourceCount = 1 // default setting - this will be modified with new name sources
              SET d.dateCreated = ${Date.now().toString()}
              MERGE (d2)-[:DisplayValue { dateCreated: '${Date.now().toString()}' }]->(d) // link disease to synonym display node
              ) with data, n, d2, d3

              FOREACH (cs in data.codes | //disease synonym data
              CREATE (cd:Property:Code) //dataRef node for synonym
              SET cd = cs // set node
              SET cd.sourceCount = 1 // default setting - this will be modified with new name sources
              SET cd.dateCreated = ${Date.now().toString()}
              MERGE p2=(d3)-[:DisplayValue { dateCreated: '${Date.now().toString()}' }]->(cd) // link disease to synonym display node
              ) with data, n
              optional MATCH (n)-[]-(:Codes)-[]->(c:Code) with n, c
              optional MATCH (n)-[]-(:Sources)-[]->(ds:DataSource) WHERE ds.source = c.source with n, c, ds
              CREATE (c)-[:DataSourceReference { dateCreated: '${Date.now().toString()}' }]->(ds)
              return count(n)`;
          this.connectionService.write('gard-data', writecall, {payload: diseases}).subscribe(res => console.log(res))
        }
      });
  }

  buildInheritance() {
    const call = `
MATCH (n:S_GARD)-[:PAYLOAD]-(d:DATA) WITH n, d.gard_id AS id
MATCH (n)-[:I_CODE|:N_Name]-(o:S_OMIM)-[:R_rel{name:'has_inheritance_type'}]-(m:S_OMIM) WITH COLLECT(DISTINCT {value: m._N_Name, reference: 'OMIM'}) AS omim, n, id
MATCH (n)-[:I_CODE|:N_Name]-(o:S_ORDO_ORPHANET)-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i:S_ORDO_ORPHANET) WITH omim,  collect(Distinct {value: i._N_Name, reference: 'ORPHANET'}) AS orphas, id
with omim, orphas, id
WITH {disease: id, inheritance: omim + orphas} AS ret
  RETURN collect(ret) as data;
    `;

    const mainDataMap: Map<string, string[]> = new Map<string, string[]>();
    let data = [];
    this.connectionService.read('raw-data', call).subscribe(res => {
      data = res;
      const inheritanceTerms = `
        MATCH p=()-[r:TermOf]->(t:DataDictionaryTerm) with t
        unwind t.alternateValues as av
        return collect(distinct {display: t.displayValue,alt:av}) as data
        `;

      this.connectionService.read('gard-data', inheritanceTerms).subscribe(terms => {
        if (terms.data) {
          const inheritanceDictionary = terms.data;
          data['data'].map(disease => {
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
          });
          this.writeData(data, 'Inheritance');
        }
      });
    });
  }


  writeData(payload: any, type: string) {
    console.log(payload);
    const totalRefs = 2;
    const create = `
      UNWIND {payload} as row // all disease inheritance data
      MATCH (a2:Disease) where a2.gard_id = row.disease with a2, row //fetch disease
      CREATE (a:MainProperty:${type}s) with a, a2, row //dataRef node for inheritance
      SET a.field = '${type.toLowerCase()}'
      SET a.count = size(row['${type.toLowerCase()}'])
      SET a.dateCreated = ${Date.now().toString()}
      CREATE (a2)-[:Properties { dateCreated: ${Date.now().toString()} }]->(a) // link disease to inheritance display node

      FOREACH (noDisplayValue in row.noDisplay | //disease inheritance data
      CREATE (n2:Property:NoDisplayProperty:${type}) //dataRef node for inheritance with hpo mapping
      SET n2 += noDisplayValue
      SET n2.sourceCount = 1
      SET n2.dateCreated = ${Date.now().toString()}
      create p2=(a)-[r2:Value { dateCreated: ${Date.now().toString()} }]->(n2)// link disease to inheritance display node
      ) with row, a, a2

      unwind row.displayValue as displayValue //disease inheritance data
      CREATE (n:Property:DisplayProperty:${type}) //dataRef node for inheritance
      SET n.displayValue = displayValue.displayValue // set node
      set n.sourceCount = size(displayValue.inheritance)
      SET n.dateCreated = ${Date.now().toString()}
      CREATE p=(a)-[r:DisplayValue { dateCreated: ${Date.now().toString()} }]->(n) with a, p, n, displayValue, row ,a2// link disease to inheritance display node

      match (d:DataDictionary {field: '${type.toLowerCase()}'})-[:TermOf]-(t:DataDictionaryTerm {displayValue: displayValue.displayValue }) //get dictionary
      CREATE p3=(n)-[r3:HasDisplayTerm]->(t) with distinct displayValue, row, a, n, t, a2

      FOREACH (term in displayValue['${type.toLowerCase()}'] |
      CREATE (ref:DataRef) //dataRef node for inheritance
      SET ref += term
      CREATE p4=(n)-[r4: ReferenceSource { dateCreated: '${Date.now().toString()}'}]->(ref)  // link disease to inheritance node
      ) with a2

    OPTIONAL MATCH (a2)-[]-(:MainProperty)-[]-(:DisplayProperty)-[]-(d2:DataRef) with a2, d2
    Optional MATCH (a2)-[]-(:MainProperty)-[]-(ds:DataSource) WHERE ds.source = d2.reference with a2,d2,ds
    WHERE ds IS NOT NULL
    MERGE (d2)-[:DataSourceReference { dateCreated: ${Date.now().toString()} }]->(ds) with a2
    OPTIONAL MATCH (a2)-[]-(:MainProperty)-[]-(dd:NoDisplayProperty) with a2, dd
    Optional MATCH (a2)-[]-(:MainProperty)-[]-(ds2:DataSource) WHERE ds2.source = dd.reference with a2,dd,ds2
    WHERE ds2 IS NOT NULL
    MERGE (dd)-[:DataSourceReference { dateCreated: '${Date.now().toString()}' }]->(ds2)
      return true;
`;
    this.connectionService.write('gard-data', create, {payload: payload['data']}).subscribe(res => {
      console.log(res);
    })
  }

  mapDataDictionary() {
    const dictionary = `
    MATCH (n:S_GARD)-[:I_CODE|:N_Name]-(o:S_ORDO_ORPHANET)-[:R_subClassOf{property:'http://www.orpha.net/ORDO/Orphanet_C016'}]-(i:S_ORDO_ORPHANET) with i
OPTIONAL MATCH (i:S_ORDO_ORPHANET)-[:I_CODE|:N_Name]-(h:S_HP)-[:PAYLOAD]-(g:DATA)
with distinct {displayTerm: g.label, alternativeTerms: collect(distinct i._N_Name)} as rawdata
with collect(rawdata) as data
MATCH (n2:S_GARD)-[:I_CODE|:N_Name]-(o2:S_OMIM)-[:R_rel{name:'has_inheritance_type'}]-(l2:S_OMIM) with l2,data
OPTIONAL MATCH (l2:S_OMIM)-[:N_Name|:I_CODE]-(:S_HP)-[:PAYLOAD]-(z2:DATA)
with distinct {displayTerm: z2.label, alternativeTerms: collect(distinct l2._N_Name)} as rawdata2,data
with collect(rawdata2) as data2, data3
with data3 + data2 as values
UNWIND values as val
with collect(distinct val) as data
return data
    `;

    this.connectionService.read('raw-data', dictionary).pipe(
      map(res =>
        res.forEach(entry => {
          let disp = [];
          if (this.dictionary.has(entry.displayTerm)) {
            disp = this.dictionary.get(entry.displayTerm);
            const terms = [...new Set(disp.concat(entry.alternativeTerms))];
            this.dictionary.set(entry.displayTerm, terms);
          } else {
            this.dictionary.set(entry.displayTerm, entry.alternativeTerms);
          }
        })
      )
    ).subscribe(res => console.log(res));
  }

  createReference() {
    const dictionary = [];
    Array.from(this.dictionary.entries()).forEach(entry => {
      if (entry[0])
        dictionary.push({displayValue: entry[0], alternateValues: entry[1]})
    });
    const payload = {origin: 'hpo', fields: [{field: 'inheritance', terms: dictionary}]};
    const call = `
    match (r:DataDictionary)
        unwind {payload} as term
      create (l:DataDictionaryTerm)
      with {displayValue: term.displayValue, alternateValues: term.alternateValues} as props, r, l
      set l = props
      create p=(r)-[:TermOf]->(l)
return p;
    `;
    this.connectionService.write('gard-data', call, {payload: dictionary}).subscribe(res => console.log(res));
  }

  checkSources() {
    const totalRefs = 2;
    const call = `
MATCH p=(d:Disease)-[r:Properties]-(i:Inheritance) with distinct(d), collect(properties(i)) as inheritances
with { disease: d.gard_id, inheritance: inheritances} as diseases
RETURN collect(diseases) as data LIMIT 10
`;

    this.connectionService.read('gard-data', call).pipe(
      map(res => {
        res.data.map(disease => {
          const inheritanceMap: Map<string, string[]> = new Map<string, string[]>();
          disease.inheritance.forEach(value => {
            if (inheritanceMap.has(value.displayValue)) {
              let refs = inheritanceMap.get(value.displayValue);
              refs.push(value.reference);
              refs = Array.from(new Set(refs));
              inheritanceMap.set(value.displayValue, refs);
            } else {
              inheritanceMap.set(value.displayValue, [value.reference]);
            }
          });
          [...inheritanceMap.entries()].forEach((key, value) => {
            if (value % totalRefs === 0) {
              console.log("match");
            }
          })
        })
      })
    ).subscribe(res => {
      console.log(res);
    })
  }*/

  getHierarchy() {
    const driver = neo4j.driver('bolt://gard-dev-neo4j.ncats.io:7687', neo4j.auth.basic('neo4j', 'eic1akeghaTha4OhKahr'));
    const session = driver.rxSession();
    const mondocall = `
match (disease:DATA)-[:PAYLOAD]->(m:S_GARD)-[:R_exactMatch|:R_equivalentClass]-(n:S_MONDO)<-[:PAYLOAD]-(d:DATA)  with n, disease.gard_id as id, d.id as mondoId
match p=(n)-[e:R_subClassOf*0..]->(m:S_MONDO)<-[:PAYLOAD]-(l:DATA) where all(x in e where n.source=x.source or n.source in x.source) and not 'TRANSIENT' in labels(m)
with collect(p) as paths, id, mondoId
CALL apoc.convert.toTree(paths) yield value
with value, id, mondoId
return {disease: id, nodeId: mondoId,tree: value} as data
    `;

    const orphacall = `
match p2=(g:DATA)-[:PAYLOAD]->(n:S_GARD)-[e:I_CODE|:N_Name]-(m:S_ORDO_ORPHANET)<-[:PAYLOAD]-(d:DATA) 
where not exists(d.reason_for_obsolescence) with count(e) as s, m, d, g
where s > 2 match p=(m)-[e:R_subClassOf*0..]->(o:S_ORDO_ORPHANET)<-[:PAYLOAD]-(l:DATA) 
where not 'TRANSIENT' in labels(o) and all(x in e where m.source=x.source or m.source in x.source)
with collect(distinct p) as paths, g.gard_id as id, d.id as nodeId
CALL apoc.convert.toTree(paths) yield value 
with value, id, nodeId
return {disease: id, nodeId: nodeId,tree: value} as data
    `;

    session.readTransaction(txc => txc.run(orphacall).records()).pipe(
   // this.connectionService.read('raw-data', orphacall).pipe(
      map(response => {
        const res: any = response.toObject();
      //  console.log(res);
/*          const map = res.data.map(data => {
            return {disease: data.disease, nodeId: data.nodeId, tree:this.mapEntry(data.tree)}
          }); */
          const map = [{disease: res.data.disease, nodeId: res.data.nodeId, tree:this.mapEntry(res.data.tree)}];
          const write: any[] = [];
          map.forEach(entry => {
            this.pairs = [];
            this.clones = [];
            let current: any[] = [] ;
            this.flattenTree(entry.tree, 0);
            this.pairs.forEach(pair => {
              if(pair.parent) {
                if (current.length) {
                  const last = current[current.length - 1];
                  if (last.level < pair.level) {
                    current.push(pair);
                  } else {
                    this.clones.push(current);
                    current = current.slice(0, pair.level);
                    current.push(pair);
                  }
                } else {
                  current.push(pair);
                }
              }
            });
        //    console.log(this.clones);
            if(this.clones.length > 0) {
              this.dataz.push({disease: entry.disease, nodeId: this._makeCode(entry.nodeId), paths: this.clones});
            }
          });
         // console.log(this.dataz.length);
         //this.writeTree(write)
      //  this.dataz.push(write);
      })).subscribe()
  }

  mapEntry(entry) {
    return {
      node: entry.payload ? entry.payload.map(payload => payload = this.gardPropertySerializer.fromJson({value: payload.id, label: payload.label}))[0] : undefined,
      parents: entry.r_subclassof ? entry.r_subclassof.map(subentry => this.mapEntry(subentry)) : undefined};

  }

   flattenTree(tree, level, parent?) {
      if(parent && tree) {
        this.pairs.push({parent: tree.node, child: parent, level: level - 1});
      }
      if(tree.parents) {
        tree.parents.forEach(parent => this.flattenTree(parent, level + 1,  tree.node));
      }
   }

/*
   writeTree(payload) {
    console.log('writing tree');
    console.log(payload);
    const call = `
          UNWIND {payload} as row // all hierarchy pairs
          MATCH (d:Disease {gard_id: row.disease})-[:Properties]->(c:Codes)
          MATCH (d:Disease {gard_id: row.disease})-[:Properties]->(ss:Sources)
          MERGE (p5:MainProperty:Hierarchies {value: row.disease})
          SET p5.field = 'hierarchies'
          MERGE (d)-[:Properties { dateCreated: ${Date.now().toString()} }]->(p5)
          MERGE (p3:HierarchySource:Property {value: row.nodeId.displayValue})
          CREATE (s1:Property:DataSource {source: 'ORPHA'})
          merge (ss)-[:DisplayValue]->(s1)
          MERGE (p3)-[:DataSourceReference { dateCreated: '${Date.now().toString()}' }]->(s1)
      SET p3.dateCreated = ${Date.now().toString()}
          MERGE (p5)-[:DisplayValue]->(p3)
           Merge (cd:Property:Code {value: row.nodeId.displayValue})
              SET cd = row.nodeId
              SET cd.sourceCount = 1
              SET cd.dateCreated = ${Date.now().toString()}
              MERGE (c)-[:DisplayValue { dateCreated: '${Date.now().toString()}' }]->(cd)
              with d, c, row, p3

            FOREACH (path in row.paths |
           MERGE (p4:HierarchyNode:Property {value: path[0].child.value})
                     SET p4 = path[0].child
                     MERGE (p4)<-[:IsAChild]-(p3)
                    MERGE (p4)-[:IsAParent]->(p3)
            FOREACH (node in path |
        MERGE (p:HierarchyNode:Property {value: node.parent.value})
        MERGE (p2:HierarchyNode:Property {value: node.child.value})
          SET p = node.parent
          SET p2 = node.child
          SET p.dateCreated = '${Date.now().toString()}'
          MERGE (p2)-[:IsAChild]->(p)
          MERGE (p2)<-[:IsAParent]-(p)
        )) with row, p3

        RETURN row.disease;
    `;


   //  this.writesession.writeTransaction(txc => txc.run(call,{payload: payload}).records()).subscribe(res =>{
       this.connectionService.write('gard-data', call, {payload: payload}).subscribe(res => {
       console.log(res);
     })
   }
*/

   _makeCode(codeString: string){
    console.log(codeString);
     const splitCode = codeString.split(':');
     const reference: GardReference = new GardReference({source: splitCode[0]});
     if (reference.url) {
       reference.url = reference.url.concat(splitCode[1]);
     }
     const codeObj: GardDataProperty = this.gardPropertySerializer.fromJson({
       // references: [reference],
       source: splitCode[0],
       value: splitCode[1],
       displayValue: codeString,
     });
     return codeObj;
   }



  ngOnDestroy() {

  }

}
