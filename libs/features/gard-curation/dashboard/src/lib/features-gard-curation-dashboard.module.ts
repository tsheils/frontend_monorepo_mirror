import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardDashboardComponent } from './gard-dashboard/gard-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {CommonUiNeo4jConnectionFormModule} from "@ncats-frontend-library/common/ui/neo4j-connection-form";

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
    CommonUiNeo4jConnectionFormModule
  ],
  declarations: [GardDashboardComponent]
})
export class FeaturesGardCurationDashboardModule {}
