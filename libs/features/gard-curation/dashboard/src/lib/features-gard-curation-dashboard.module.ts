import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardDashboardComponent } from './gard-dashboard/gard-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {UiGardGardDiseaseListModule} from "@ncats-frontend-library/ui/gard/gard-disease-list";

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
    UiGardGardDiseaseListModule
  ],
  declarations: [GardDashboardComponent],
  providers: [
    DiseasesFacade
  ]
})
export class FeaturesGardCurationDashboardModule {}
