import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { FacetTableComponent } from './facet-table/facet-table.component';
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    NcatsMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FilterPanelComponent,
    FacetTableComponent
  ],
  exports: [
    FilterPanelComponent,
    FacetTableComponent
  ]
})
export class FacetSidepanelModule {}
