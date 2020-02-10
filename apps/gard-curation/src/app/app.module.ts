import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {NcatsFormModule} from "@ncats-frontend-library/ncats-form";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    NcatsFormModule
  ],
  providers: [
    Neo4jConnectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
