import {Component, OnDestroy} from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import RxSession from "neo4j-driver/types/session-rx";
import {from, of} from "rxjs/index";
import {concatAll, map, mergeMap} from "rxjs/internal/operators";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'mapper';
  searchTerm: string;
  session: RxSession;
  objectFields: any;

  sources: any[] = []; //['OMIM', 'ORPHANET'];
  selectedFields: any[] = [] //Map<string, string[]> = new Map<string, string[]>(); //['OMIM', 'ORPHANET'];
  filteredSources: any[] = []; //['OMIM', 'ORPHANET'];
  allSources: any[] = ["S_GARD", "S_GHR", "S_OMIM","S_ORDO_ORPHANET", "S_HP"]; //, "S_HP", "S_MEDLINEPLUS", "S_MESH", "S_OMIM", "S_ICD10CM", "S_ORDO_ORPHANET", "S_THESAURUS", "S_MONDO", "S_VANDF", "S_BTO", "S_CLO", "S_CL", "S_DDIEM", "S_UBERON", "S_GO", "S_GENO", "S_OGG", "S_PW", "S_MP", "S_OAE", "S_RXNO", "S_OGMS", "S_PATO", "S_FMA", "S_EFO", "S_CHEBI", "`S_RANCHO-DISEASE-DRUG_2018-12-18_13-30`", "S_FDAORPHANGARD_20190216", "S_HPO_ANNOTATION_100918", "S_MEDGEN"]; //['OMIM', 'ORPHANET'];
 // allSources: any[] = ["S_GARD", "S_GHR", "S_NORD", "S_DOID"] //, "S_HP", "S_MEDLINEPLUS", "S_MESH", "S_OMIM", "S_ICD10CM", "S_ORDO_ORPHANET", "S_THESAURUS", "S_MONDO", "S_VANDF", "S_BTO", "S_CLO", "S_CL", "S_DDIEM", "S_UBERON", "S_GO", "S_GENO", "S_OGG", "S_PW", "S_MP", "S_OAE", "S_RXNO", "S_OGMS", "S_PATO", "S_FMA", "S_EFO", "S_CHEBI", "`S_RANCHO-DISEASE-DRUG_2018-12-18_13-30`", "S_FDAORPHANGARD_20190216", "S_HPO_ANNOTATION_100918", "S_MEDGEN"]; //['OMIM', 'ORPHANET'];
  allSourcesLoading = false;

  getData(call: string) {
    if(this.session) {
      return this.session.readTransaction(txc => txc.run(call).records());
    }
  }


  setConnection(connection: Neo4jConnectService) {
    this.session = connection.session;
    this.allSourcesLoading = true;
    const obs = [];
    this.allSources.forEach(source => {
      obs.push({source: source, call:`MATCH (n:${source})-[r]-(d:DATA) WITH DISTINCT keys(d) AS keys UNWIND keys AS keyslisting WITH DISTINCT keyslisting AS allfields RETURN collect(allfields)`});
    });

   // `CALL db.labels() YIELD label WITH label WHERE label Starts WITH 'S_' RETURN collect(label) AS datasources`
  // todo: this returns the fields one source at a time
    from(obs.map(call => {
              return {source: call.source, call: this.getData(call.call)};
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
  }

  filter(term: string) {
    this.searchTerm = term;
    this.filteredSources = this.sources.filter(option => JSON.stringify(option).toLowerCase().includes(term.toLowerCase()));
  }

  runQuery() {

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

  ngOnDestroy() {
    if(this.session) {
      this.session.close();
    }
  }

}
