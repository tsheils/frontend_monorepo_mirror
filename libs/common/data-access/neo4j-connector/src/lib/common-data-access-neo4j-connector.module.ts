import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Neo4jConnectService} from "./neo4j-connect.service";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { Neo4jConnectionFormComponent } from './neo4j-connection-form/neo4j-connection-form.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedUiNcatsFormModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    Neo4jConnectionFormComponent
  ],
  exports: [
    Neo4jConnectionFormComponent
  ]
})
export class CommonDataAccessNeo4jConnectorModule {}
