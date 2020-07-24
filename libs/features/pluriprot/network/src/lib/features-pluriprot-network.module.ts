import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluriprotNetworkComponent } from './pluriprot-network/pluriprot-network.component';
import {
  EdgeService,
  NodeService,
  SharedSmrtgraphSmrtgraphCoreModule
} from "@ncats-frontend-library/shared/smrtgraph/smrtgraph-core";
import {HttpClientModule} from "@angular/common/http";
import { NetworkMenuComponent } from './pluriprot-network/components/network-menu/network-menu.component';
import { NodeDetailsBoxComponent } from './pluriprot-network/components/node-details-box/node-details-box.component';
import { ColorLegendComponent } from './pluriprot-network/components/color-legend/color-legend.component';
import { RangeSliderComponent } from './pluriprot-network/components/range-slider/range-slider.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {RouterModule, Routes} from "@angular/router";

const ROUTES: Routes = [
  {
    path: '',
    component: PluriprotNetworkComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    SharedSmrtgraphSmrtgraphCoreModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    PluriprotNetworkComponent,
    NetworkMenuComponent,
    NodeDetailsBoxComponent,
    ColorLegendComponent,
    RangeSliderComponent
  ]
})
export class FeaturesPluriprotNetworkModule {}
