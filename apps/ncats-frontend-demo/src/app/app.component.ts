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
    }
}
