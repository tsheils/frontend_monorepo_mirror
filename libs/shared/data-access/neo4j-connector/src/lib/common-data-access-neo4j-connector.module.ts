import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedUiNcatsFormModule} from '@ncats-frontend-library/shared/ui/ncats-form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Neo4jConnectionFormComponent} from './neo4j-connection-form/neo4j-connection-form.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedUiNcatsFormModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [Neo4jConnectionFormComponent],
  exports: [Neo4jConnectionFormComponent],
  providers: [],
})
export class CommonDataAccessNeo4jConnectorModule {}
