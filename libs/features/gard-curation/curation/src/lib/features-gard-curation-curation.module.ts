import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CURATION_MAIN_COMPONENT,
  CURATION_SIDEPANEL_COMPONENT,
  CurationFeatureComponent, GARD_DISEASE_SEARCH_COMPONENT, GARD_FOOTER_COMPONENT,
  GARD_HEADER_COMPONENT
} from './curation-feature/curation-feature.component';
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {SharedUiDynamicAppLayoutModule} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {GardHeaderComponent} from "@ncats-frontend-library/ui/gard/gard-header";
import {CurationSidepanelComponent} from "@ncats-frontend-library/ui/gard/curation-sidepanel";
import {DataPanelComponent} from "@ncats-frontend-library/ui/gard/gard-data-viewer";
import {GardFooterComponent} from "@ncats-frontend-library/ui/gard/gard-footer";
import {GardSearchComponent, UiGardSearchBarModule} from "@ncats-frontend-library/ui/gard/search-bar";
import {diseaseInitialState, DiseasesFacade, reducer} from "@ncats-frontend-library/stores/diseases";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {DiseasesEffects} from "../../../../../stores/diseases/src/lib/+state/diseases/diseases.effects";
import {Neo4jdbsEffects} from "../../../../../common/data-access/neo4j-connector/src/lib/+state/neo4jdbs.effects";

const ROUTES: Routes = [
  {
    path: '',
    component: CurationFeatureComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedUiCurationMatrixModule,
    SharedUiSearchBarModule,
    CustomMaterialModule,
    SharedUiDynamicAppLayoutModule,
    UiGardSearchBarModule,
  ],
  declarations: [CurationFeatureComponent],
  providers: [
    DiseasesFacade,
    {provide: GARD_HEADER_COMPONENT, useValue: GardHeaderComponent},
    {provide: CURATION_SIDEPANEL_COMPONENT, useValue: CurationSidepanelComponent},
    {provide: GARD_DISEASE_SEARCH_COMPONENT, useValue: GardSearchComponent},
    {provide: CURATION_MAIN_COMPONENT, useValue: DataPanelComponent},
    {provide: GARD_FOOTER_COMPONENT, useValue: GardFooterComponent}
  ]
})
export class FeaturesGardCurationCurationModule {}
