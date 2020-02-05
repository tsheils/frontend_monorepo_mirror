import {Component, OnInit} from '@angular/core';
import {Facet} from "@ncats-frontend-library/facet-sidepanel";
import * as neo4j from "neo4j-driver"

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ncats-frontend-demo';

   driver = neo4j.driver(
    'bolt://disease.ncats.io:80/',
    neo4j.auth.basic('neo4j', '')
  );

  facets: Facet[] =  [new Facet({
    "facet": "Target Development Level",
    "values": [
      {
        "name": "Tbio",
        "count": 11792,
        "selected": true
      },
      {
        "name": "Tdark",
        "count": 6368,
        "selected": true
      },
      {
        "name": "Tchem",
        "count": 1639
      },
      {
        "name": "Tclin",
        "count": 613,
        "selected": true
      }
      ]
  })];

  disease: any;

  ngOnInit(): void {
    console.log(this);
    this.driver.verifyConnectivity().then(res=> console.log(res));
    const session = this.driver.rxSession();
    console.log(session);

    session.run('match p=(n:`S_GARD`)-[]-(:DATA) return p limit 1').records().subscribe(res=> {
      this.disease = res._fields[0].segments[0].end.properties;
    });
  }
}
