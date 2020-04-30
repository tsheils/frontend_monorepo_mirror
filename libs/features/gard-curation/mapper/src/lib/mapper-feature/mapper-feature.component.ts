import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import RxSession from "neo4j-driver/types/session-rx";
import {map} from "rxjs/operators";
import {Driver} from "neo4j-driver";
import {Neo4jConnectService} from "@ncats-frontend-library/shared/data-access/neo4j-connector";
import {PanelConfig, Position} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {
  CURATION_MAIN_COMPONENT,
  CURATION_SIDEPANEL_COMPONENT,
  GARD_DISEASE_HEADER_COMPONENT, GARD_DISEASE_SEARCH_COMPONENT, GARD_FOOTER_COMPONENT
} from "../../../../curation/src/lib/curation-feature/curation-feature.component";

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
      }
    )
  }

  setObjectFields(event: any) {
    this.objectFields = event;
  }

  setFields(event: any) {
    this.selectedFields = [...event.entries()].map(entry => entry = {source: entry[0], fields: entry[1]});
    // event.keys().forEach(key => this.selectedFields.push({key: event.get(key)}))
  }

  search(event: any) {
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
              diseases.push(resObject)
            },
            complete: () => {
              const writecall = `
              UNWIND {payload} as data
              CREATE (n:Disease)
              SET n += data
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
with size(omim) as omimsize, size(orphas) as orphanetsize, omim, orphas, id
WITH {disease: id, inheritance: omim + orphas, sources: {orphanet: orphanetsize, omim: omimsize}} AS ret
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

        this.connectionService.read('gard-data', inheritanceTerms).subscribe(res => {
          const inheritanceDictionary = res.data;
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
        });
  });
}


  writeData(payload: any, type: string) {
    const totalRefs = 2;
                  const create = `
UNWIND {payload} as row // all disease inheritance data
    match (a2:Disease) where a.gard_id = row.disease with a, row //fetch disease
    CREATE (a:MainProperty) with a, row //fetch disease
    set a.field = 'inheritance'
    set a.sources = row.sources
    FOREACH (noDisplayValue in row.noDisplay | //disease inheritance data
    CREATE (n2:NoDisplayProperty:${type}) //dataRef node for inheritance with hpo mapping
    SET n2 += noDisplayValue
    SET n2.sourceCount = 1
create p2=(a)-[r2:Properties { dateCreated: ${Date.now()}}]->(n2)// link disease to inheritance display node
) with row, a
    unwind row.displayValue as displayValue //disease inheritance data
    CREATE (n:DisplayProperty:${type}) //dataRef node for inheritance
    SET n.displayValue = displayValue.displayValue // set node
    set n.sourceCount = size(displayValue.inheritance)
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
         this.connectionService.write('gard-data', create, {payload: payload['data']}).subscribe(res => {
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
      map(res=>
      res.forEach(entry => {
        let disp = [];
        if (this.dictionary.has(entry.displayTerm)) {
          disp = this.dictionary.get(entry.displayTerm);
          const terms = [... new Set(disp.concat(entry.alternativeTerms))];
          this.dictionary.set(entry.displayTerm, terms);
        } else {
          this.dictionary.set(entry.displayTerm, entry.alternativeTerms);
        }
      })
    )
    ).subscribe(res=> console.log(res));
 }

  createReference() {
    const dictionary = [];
    Array.from(this.dictionary.entries()).forEach(entry => {
      if(entry[0])
      dictionary.push({displayValue:entry[0], alternateValues: entry[1] })
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
      [...inheritanceMap.entries()].forEach((key, value) => {
        if(value % totalRefs === 0){
          console.log("match");
        }
      })
    })
  })
).subscribe(res => {
    console.log(res);
    })
  }


  ngOnDestroy() {

  }

}
