import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {FilterPanelComponent} from "./filter-panel/filter-panel.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FacetTableComponent} from "./facet-table/facet-table.component";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
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
export class SidenavsFacetSidepanelModule {}
