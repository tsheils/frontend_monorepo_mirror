import { Component, OnInit } from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import RxSession from "neo4j-driver/types/session-rx";

@Component({
  selector: 'ncats-frontend-library-gard-dashboard',
  templateUrl: './gard-dashboard.component.html',
  styleUrls: ['./gard-dashboard.component.scss']
})
export class GardDashboardComponent implements OnInit {
  session: RxSession;

  constructor (
    private connectionService: Neo4jConnectService
  ) {
    this.connectionService.session$.subscribe(res => {
      this.session = res;
    });
  }


  ngOnInit(): void {
  }

  setConnection($event: Neo4jConnectService) {
     // this.session = $event.session;
  }
}
