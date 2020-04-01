import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {
  AppComponent,
  CURATION_MAIN_COMPONENT,
  CURATION_SIDEPANEL_COMPONENT, GARD_DISEASE_HEADER_COMPONENT,
  GARD_FOOTER_COMPONENT, GARD_HEADER_COMPONENT
} from './app.component';
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
import {SharedUiDynamicAppLayoutModule} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {DataPanelComponent, UiGardGardDataViewerModule} from "@ncats-frontend-library/ui/gard/gard-data-viewer";
import {GardDiseaseHeaderComponent} from "../../../../libs/ui/gard/gard-disease-header/src/lib/gard-disease-header/gard-disease-header.component";
import {GardHeaderComponent, UiGardGardHeaderModule} from "@ncats-frontend-library/ui/gard/gard-header";
import {UiGardGardDiseaseHeaderModule} from "@ncats-frontend-library/ui/gard/gard-disease-header";
import {GardFooterComponent, UiGardGardFooterModule} from "@ncats-frontend-library/ui/gard/gard-footer";

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
    SharedUiDynamicAppLayoutModule,
    UiGardDataDisplayModule,
    UiGardCurationSidepanelModule,
    UiGardGardDataViewerModule,
    UiGardGardHeaderModule,
    UiGardGardDiseaseHeaderModule,
    UiGardGardFooterModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    Neo4jConnectService,
    {provide: GARD_HEADER_COMPONENT, useValue: GardHeaderComponent},
    {provide: CURATION_SIDEPANEL_COMPONENT, useValue: CurationSidepanelComponent},
    {provide: GARD_DISEASE_HEADER_COMPONENT, useValue: GardDiseaseHeaderComponent},
    {provide: CURATION_MAIN_COMPONENT, useValue: DataPanelComponent},
    {provide: GARD_FOOTER_COMPONENT, useValue: GardFooterComponent}
  ]
})
export class AppModule {}
