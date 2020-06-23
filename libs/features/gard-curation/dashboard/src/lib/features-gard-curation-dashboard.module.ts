import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DASHBOARD_MAIN_COMPONENT,
  GARD_DASHBOARD_SIDENAV_COMPONENT, GARD_DISEASE_SEARCH_COMPONENT, GARD_FOOTER_COMPONENT,
  GardDashboardComponent
} from './gard-dashboard/gard-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {UiGardGardDiseaseListModule} from "@ncats-frontend-library/ui/gard/gard-disease-list";
import {GardSearchComponent, UiGardSearchBarModule} from "@ncats-frontend-library/ui/gard/search-bar";
import {GardFooterComponent} from "@ncats-frontend-library/ui/gard/gard-footer";
import {SharedUiDynamicAppLayoutModule} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {UiGardNavigationTreeModule} from "@ncats-frontend-library/ui/gard/navigation-tree";
import { DashboardSidepanelComponent } from './gard-dashboard/dashboard-sidepanel/dashboard-sidepanel.component';
import { DashboardMainComponent } from './gard-dashboard/dashboard-main/dashboard-main.component';
import {DiseaseService} from "../../../../../stores/diseases/src/lib/disease.service";

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
  declarations: [GardDashboardComponent, DashboardSidepanelComponent, DashboardMainComponent],
  providers: [
    DiseasesFacade,
    {provide: GARD_DASHBOARD_SIDENAV_COMPONENT, useValue: DashboardSidepanelComponent},
    {provide: GARD_DISEASE_SEARCH_COMPONENT, useValue: GardSearchComponent},
    {provide: DASHBOARD_MAIN_COMPONENT, useValue: DashboardMainComponent},
    {provide: GARD_FOOTER_COMPONENT, useValue: GardFooterComponent}
  ]
})
export class FeaturesGardCurationDashboardModule {}
