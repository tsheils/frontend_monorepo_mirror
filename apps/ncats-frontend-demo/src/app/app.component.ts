import { Component } from '@angular/core';
import {Facet} from "../../../../libs/facet-sidepanel/src/lib/models/facet";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ncats-frontend-demo';

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
}
