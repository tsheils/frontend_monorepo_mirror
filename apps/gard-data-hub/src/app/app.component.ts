import {Component, OnDestroy} from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import RxSession from "neo4j-driver/types/session-rx";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'gard-data-hub';
  session: RxSession;
  links: any[] = [];

  constructor (
    private connectionService: Neo4jConnectService
  ) {
    this.connectionService.session$.subscribe(res => {
      this.session = res;
      this.links = [{link:'mapper'}, {link: 'curation', label: 'curation'}];
      console.log(this.session);
      });
  }

  ngOnDestroy() {
    if(this.session) {
      this.session.close();
      this.connectionService.driver.close();
    }
  }

}
