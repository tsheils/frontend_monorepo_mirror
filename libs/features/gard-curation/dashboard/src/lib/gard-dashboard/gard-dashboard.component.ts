import { Component, OnInit } from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import RxSession from "neo4j-driver/types/session-rx";
import {DiseasesFacade, setDiseaseStats} from "@ncats-frontend-library/stores/diseases";

@Component({
  selector: 'ncats-frontend-library-gard-dashboard',
  templateUrl: './gard-dashboard.component.html',
  styleUrls: ['./gard-dashboard.component.scss']
})
export class GardDashboardComponent implements OnInit {
  session: RxSession;
  stats: any;

  constructor (
    private diseasesFacade: DiseasesFacade
  ) {
  }


  ngOnInit(): void {
    this.diseasesFacade.stats$.subscribe(res => {
      console.log(res);
      this.stats = res
    });
    console.log(this);
    this.diseasesFacade.dispatch(setDiseaseStats({}));
  }

  setConnection($event: Neo4jConnectService) {
     // this.session = $event.session;
  }
}
