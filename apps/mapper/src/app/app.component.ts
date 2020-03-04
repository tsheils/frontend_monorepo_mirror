import { Component } from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {Disease} from "../../../../models/gard/disease";
import RxSession from "neo4j-driver/types/session-rx";
import {concat, of} from "rxjs/index";
import {flatMap} from "tslint/lib/utils";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mapper';

  session: RxSession;

  sources: any[] = []; //['OMIM', 'ORPHANET'];
  allSources: any[] = []; //['OMIM', 'ORPHANET'];

  setConnection(connection: Neo4jConnectService) {
    console.log(connection);
    this.session = connection.session;

/*
    this.session
      .beginTransaction()
      .pipe(
        flatMap(txc =>
        concat(
          txc.run(
            `CALL db.labels() YIELD label WITH label WHERE label Starts WITH 'S_' RETURN collect(label) AS datasources`
          )
            .records()
            .pipe(map(r => r.get('datasources'))),
          of('datasources collected'),
          txc.run
        ))
      )
*/








    this.session.run(
      `CALL db.labels() YIELD label WITH label WHERE label Starts WITH 'S_' RETURN collect(label) AS datasources`
//        'match p=(n:`S_GARD`)-[]-(:DATA) return p limit 20'
    ).records().subscribe({
      next: data => {
        console.log(data.toObject());
        /*     const source = data['data']
               .map(source => {source = {name: source.replace('S_', ''), fields: ['name', 'id', 'inheritance']}
               });*/
        this.allSources.push(data.get(0));
        //   console.log(data);
        //   console.log(source);
        //  console.log(data);
        /* this.sources.push(data._fields[0].start.labels.filter(label => label.includes('S_')));
         const names = data._fields[0].start.properties.N_Name;
         console.log(names);
         if (Array.isArray(names)) {
           names.forEach(name => {
             if (this.synonymsMap.has(name)) {
               let arr: string[] = this.synonymsMap.get(name);
               arr.concat(source);
               console.log(arr);
               arr = Array.from(new Set(arr));
               this.synonymsMap.set(name, arr);
             } else {
               console.log(source);
               this.synonymsMap.set(name, source);
             }
           });

           this.synonyms.push(...names);
         } else {
           this.synonyms.push(names);
         }
         this.synonyms = Array.from(new Set(this.synonyms));
         this.tempdisease = data._fields[0].segments[0].end.properties;
         this.disease = this.diseaseSerializer.fromJson(data._fields[0].segments[0].end.properties);
         //  this.fields = Object.keys(this.disease);
         this.fields = Disease.displayFields();
         this._fieldsObservableSource.next(this.fields);
         this._diseaseObservableSource.next(this.disease);*/
        console.log(this.allSources);
        this.allSources.forEach(source => {
          console.log(source);
          this.session.run(`MATCH (n:${source})-[r]-(d:DATA) WITH DISTINCT keys(d) AS keys
          UNWIND keys AS keyslisting WITH DISTINCT keyslisting AS allfields
          RETURN collect(allfields)`).records().subscribe(res => {
            console.log(res.toObject());
            this.sources.push({name: source.replace('S_', ''), fields: [res.toObject()]});
          })
        })
      }
    });
    //  complete: () => {

        /*  Array.from(this.synonymsMap.entries()).forEach(entry => {
            this.curationData.push({value: entry[0], references: entry[1]})
          });
          console.log(this);
          this.changeRef.detectChanges();*/
     // }
   // });
  }

  setFields(event: any) {
    console.log(event);
  }
}
