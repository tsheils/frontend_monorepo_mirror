import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {UiGardDataDisplayModule} from "@ncats-frontend-library/ui/gard/data-display";
import {DynamicAppModule} from "@ncats-frontend-library/dynamic-app";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";

const routes: Routes = [
 // {
/*    path: 'login',
    loadChildren: () =>
      import('@ncats-frontend-library/dynamic-app').then(m => m.DynamicAppModule)
  }*/
];


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    SharedUiNcatsFormModule,
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
