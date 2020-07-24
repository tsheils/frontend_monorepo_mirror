import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NcatsDatatableComponent } from './ncats-datatable/ncats-datatable.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {PropertyDisplayComponent} from "./ncats-datatable/components/property-display/property-display.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule
  ],
  declarations: [
    NcatsDatatableComponent,
    PropertyDisplayComponent
  ],
  exports: [
    NcatsDatatableComponent
  ]
})
export class SharedUiNcatsDatatableModule {}
