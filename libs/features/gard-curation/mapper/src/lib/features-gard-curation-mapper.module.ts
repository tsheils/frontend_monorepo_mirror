import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapperFeatureComponent } from './mapper-feature/mapper-feature.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {SharedUiMapperUiModule} from "@ncats-frontend-library/shared/ui/mapper-ui";
import {SharedUiObjectTreeModule} from "@ncats-frontend-library/shared/ui/object-tree";
import {CommonUiNeo4jConnectionFormModule} from "@ncats-frontend-library/common/ui/neo4j-connection-form";
import {RouterModule, Routes} from "@angular/router";

const ROUTES: Routes = [
  {
    path: '',
    component: MapperFeatureComponent,
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    CustomMaterialModule,
    SharedUiSearchBarModule,
    SharedUiMapperUiModule,
    SharedUiObjectTreeModule,
    CommonUiNeo4jConnectionFormModule
  ],
  declarations: [MapperFeatureComponent]
})
export class FeaturesGardCurationMapperModule {}
