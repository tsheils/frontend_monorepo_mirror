import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GardDashboardComponent} from './gard-dashboard/gard-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {UiGardGardDiseaseListModule} from "@ncats-frontend-library/ui/gard/gard-disease-list";
import {GardSearchComponent, UiGardSearchBarModule} from "@ncats-frontend-library/ui/gard/search-bar";
import {
  GARD_DISEASE_SEARCH_COMPONENT,
  GARD_FOOTER_COMPONENT
} from "../../../curation/src/lib/curation-feature/curation-feature.component";
import {GardFooterComponent} from "@ncats-frontend-library/ui/gard/gard-footer";
import {SharedUiDynamicAppLayoutModule} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {UiGardNavigationTreeModule} from "@ncats-frontend-library/ui/gard/navigation-tree";

const ROUTES: Routes = [
  {
    path: '',
    component: GardDashboardComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    CustomMaterialModule,
    UiGardGardDiseaseListModule,
    UiGardSearchBarModule,
    SharedUiDynamicAppLayoutModule,
    UiGardNavigationTreeModule
  ],
  declarations: [GardDashboardComponent],
  providers: [
    DiseasesFacade,
    {provide: GARD_DISEASE_SEARCH_COMPONENT, useValue: GardSearchComponent},
    {provide: GARD_FOOTER_COMPONENT, useValue: GardFooterComponent}
  ]
})
export class FeaturesGardCurationDashboardModule {}
