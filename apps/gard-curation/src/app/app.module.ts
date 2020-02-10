import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {NcatsFormModule} from "@ncats-frontend-library/ncats-form";
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {Neo4jConnectService} from "../../../../utils/neo4j-graphql.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NcatsMaterialModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    NcatsFormModule
  ],
  providers: [
    Neo4jConnectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
