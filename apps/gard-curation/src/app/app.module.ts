import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent, CURATION_SIDEPANEL_COMPONENT} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {UiGardDataDisplayModule} from "@ncats-frontend-library/ui/gard/data-display";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {
  CurationSidepanelComponent,
  UiGardCurationSidepanelModule
} from "@ncats-frontend-library/ui/gard/curation-sidepanel";
import {SharedUiDynamicAppSkeletonModule} from "@ncats-frontend-library/shared/ui/dynamic-app-skeleton";
import {UiGardGardDataViewerModule} from "@ncats-frontend-library/ui/gard/gard-data-viewer";

const routes: Routes = [/*
 {
    path: 'login',
    loadChildren: () =>
      import('@ncats-frontend-library/dynamic-app').then(m => m.DynamicAppModule)
  }*/
];


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {initialNavigation: 'enabled'}),
    CustomMaterialModule,
    SharedUiNcatsFormModule,
    SharedUiCurationMatrixModule,
    SharedUiDynamicAppSkeletonModule,
    UiGardDataDisplayModule,
    UiGardCurationSidepanelModule,
    UiGardGardDataViewerModule
  ],
  providers: [
    Neo4jConnectService,
    {provide: CURATION_SIDEPANEL_COMPONENT, useValue: CurationSidepanelComponent}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
