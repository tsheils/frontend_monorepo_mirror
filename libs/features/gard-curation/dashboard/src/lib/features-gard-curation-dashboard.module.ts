import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardDashboardComponent } from './gard-dashboard/gard-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";

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
    CustomMaterialModule
  ],
  declarations: [GardDashboardComponent],
  providers: [
    DiseasesFacade
  ]
})
export class FeaturesGardCurationDashboardModule {}
