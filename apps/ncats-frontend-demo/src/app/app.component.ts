import {Component, OnInit} from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    Neo4jConnectService
  ]
})
export class AppComponent implements OnInit{
  title = 'ncats-frontend-demo';



/*  facets: Facet[] =  [new Facet({
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
  })];*/

  disease: any;

  connected = false;

  constructor(
    private neo4jConnectService: Neo4jConnectService
  ){}

  ngOnInit(): void {
    console.log(this);

   /* this.neo4jConnectService.connect().subscribe(res=> {
      console.log(res);
      this.connected = res;

      this.neo4jConnectService.fetch('match p=(n:`S_GARD`)-[]-(:DATA) return p limit 20').subscribe(res => {
          this.disease = res._fields[0].segments[0].end.properties;
        }
      )
    });*/
/*

    this.driver.verifyConnectivity().then(res=> console.log(res));
    const session = this.driver.rxSession();
    console.log(session);

    session.run('match p=(n:`S_GARD`)-[]-(:DATA) return p limit 20').records().subscribe(res=> {
      this.disease = res._fields[0].segments[0].end.properties;
    });*/
    }
}
