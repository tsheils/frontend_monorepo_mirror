import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Neo4jConnectService } from './neo4j-connect.service';
import { CustomMaterialModule } from '@ncats-frontend-library/common/ui/custom-material';
import { SharedUiNcatsFormModule } from '@ncats-frontend-library/shared/ui/ncats-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Neo4jConnectionFormComponent } from './neo4j-connection-form/neo4j-connection-form.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromNeo4jdbs from './+state/neo4jdbs.reducer';
import { Neo4jdbsEffects } from './+state/neo4jdbs.effects';
import { Neo4jdbsFacade } from './+state/neo4jdbs.facade';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedUiNcatsFormModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromNeo4jdbs.NEO4JDBS_FEATURE_KEY,
      fromNeo4jdbs.reducer,
      {
        initialState: fromNeo4jdbs.initialState,
      }
    ),
    EffectsModule.forFeature([Neo4jdbsEffects]),
  ],
  declarations: [Neo4jConnectionFormComponent],
  exports: [Neo4jConnectionFormComponent],
  providers: [Neo4jdbsFacade],
})
export class CommonDataAccessNeo4jConnectorModule {}
