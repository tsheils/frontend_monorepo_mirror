import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CURATION_MAIN_COMPONENT,
  CURATION_SIDEPANEL_COMPONENT,
  CurationFeatureComponent, GARD_DISEASE_HEADER_COMPONENT,
  GARD_DISEASE_SEARCH_COMPONENT,
  GARD_FOOTER_COMPONENT,
  GARD_HEADER_COMPONENT
} from './curation-feature/curation-feature.component';
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {RouterModule, Routes} from "@angular/router";
import {SharedUiDynamicAppLayoutModule} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {GardHeaderComponent} from "@ncats-frontend-library/ui/gard/gard-header";
import {CurationSidepanelComponent} from "@ncats-frontend-library/ui/gard/curation-sidepanel";
import {GardFooterComponent} from "@ncats-frontend-library/ui/gard/gard-footer";
import {GardSearchComponent, UiGardSearchBarModule} from "@ncats-frontend-library/ui/gard/search-bar";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {GardDiseaseHeaderComponent} from "@ncats-frontend-library/ui/gard/gard-disease-header";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {DataPanelListComponent, UiGardGardDataViewerModule} from "@ncats-frontend-library/ui/gard/gard-data-viewer";
import {SharedUiObjectTreeModule} from "@ncats-frontend-library/shared/ui/object-tree";

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
    UiGardGardDataViewerModule,
    SharedUiObjectTreeModule
  ],
  declarations: [CurationFeatureComponent],
  providers: [
    DiseasesFacade,
    {provide: GARD_HEADER_COMPONENT, useValue: GardHeaderComponent},
    {provide: CURATION_SIDEPANEL_COMPONENT, useValue: CurationSidepanelComponent},
    {provide: GARD_DISEASE_HEADER_COMPONENT, useValue: GardDiseaseHeaderComponent},
    {provide: GARD_DISEASE_SEARCH_COMPONENT, useValue: GardSearchComponent},
    {provide: CURATION_MAIN_COMPONENT, useValue: DataPanelListComponent},
    {provide: GARD_FOOTER_COMPONENT, useValue: GardFooterComponent}
  ]
})
export class FeaturesGardCurationCurationModule {}
