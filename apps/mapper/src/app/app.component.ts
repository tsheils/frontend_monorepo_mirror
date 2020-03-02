import { Component } from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {Disease} from "../../../../models/gard/disease";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mapper';

  connection: Neo4jConnectService;

  sources: any[] = [] //['OMIM', 'ORPHANET'];

  setConnection(connection: Neo4jConnectService) {
    console.log(connection);
    this.connection = connection;
    this.connection.fetch(
      `CALL db.labels() YIELD label WITH label WHERE label Starts WITH 'S_' RETURN label`
//        'match p=(n:`S_GARD`)-[]-(:DATA) return p limit 20'
    ).subscribe({
      next: data => {
        console.log(data);
        const source = data._fields
          .map(source => source = {name: source.replace('S_', ''), fields: ['name', 'id', 'inheritance']});
        this.sources.push(...source);
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
      },
      complete: () => {
        console.log(this.sources);
        /*  Array.from(this.synonymsMap.entries()).forEach(entry => {
            this.curationData.push({value: entry[0], references: entry[1]})
          });
          console.log(this);
          this.changeRef.detectChanges();*/
      }
    });
  }

  setFields(event: any) {
    console.log(event);
  }
}
