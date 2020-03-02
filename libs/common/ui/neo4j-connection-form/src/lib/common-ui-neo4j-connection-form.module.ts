import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedUiNcatsFormModule,
  ],
  declarations: [ConnectionFormComponent],
  exports: [
    ConnectionFormComponent
  ]
})
export class CommonUiNeo4jConnectionFormModule {}
