import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import {SharedVisualizationsXyplotModule} from "@ncats-frontend-library/shared/visualizations/xyplot";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {UiPluriprotPluriprotFilterMenuModule} from "@ncats-frontend-library/ui/pluriprot/pluriprot-filter-menu";
import {RouterModule, Routes} from "@angular/router";

const ROUTES: Routes = [
  {
    path: '',
    component: ScatterPlotComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    SharedVisualizationsXyplotModule,
    CustomMaterialModule,
    UiPluriprotPluriprotFilterMenuModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [ScatterPlotComponent]
})
export class FeaturesPluriprotScatterPlotModule {}
