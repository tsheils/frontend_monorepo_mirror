import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurationFeatureComponent } from './curation-feature/curation-feature.component';
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {CommonUiNeo4jConnectionFormModule} from "@ncats-frontend-library/common/ui/neo4j-connection-form";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

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
    CommonUiNeo4jConnectionFormModule,
    SharedUiSearchBarModule,
    CustomMaterialModule
  ],
  declarations: [CurationFeatureComponent]
})
export class FeaturesGardCurationCurationModule {}
