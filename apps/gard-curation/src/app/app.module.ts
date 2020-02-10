import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {NcatsFormModule} from "@ncats-frontend-library/ncats-form";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    NcatsFormModule,
    CustomMaterialModule
  ],
  providers: [
    Neo4jConnectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
