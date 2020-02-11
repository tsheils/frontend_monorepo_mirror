import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {NcatsFormModule} from "@ncats-frontend-library/ncats-form";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {UiGardDataDisplayModule} from "@ncats-frontend-library/ui/gard/data-display";
import {DynamicAppModule} from "@ncats-frontend-library/dynamic-app";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    NcatsFormModule,
    CustomMaterialModule,
    UiGardDataDisplayModule,
    DynamicAppModule
  ],
  providers: [
    Neo4jConnectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
