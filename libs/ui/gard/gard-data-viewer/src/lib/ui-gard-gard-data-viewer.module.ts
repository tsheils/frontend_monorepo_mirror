import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPanelComponent } from './data-panel/data-panel.component';
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import { DataPanelListComponent } from './data-panel-list/data-panel-list.component';
import { DataPropertyDisplayComponent } from './data-property-display/data-property-display.component';
import {SharedUiObjectTreeModule} from "@ncats-frontend-library/shared/ui/object-tree";
import { DataTreePanelComponent } from './data-tree-panel/data-tree-panel.component';
import {SharedUiNcatsDatatableModule} from "@ncats-frontend-library/shared/ui/ncats-datatable";
import { DataTablePanelComponent } from './data-table-panel/data-table-panel.component';
import { DataAccordionPanelComponent } from './data-accordion-panel/data-accordion-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiCurationMatrixModule,
    CustomMaterialModule,
    SharedUiObjectTreeModule,
    SharedUiNcatsDatatableModule
  ],
  declarations: [
    DataPanelComponent,
    DataPanelListComponent,
    DataPropertyDisplayComponent,
    DataTreePanelComponent,
    DataTablePanelComponent,
    DataAccordionPanelComponent
  ],
  exports: [
    DataPanelComponent,
    DataPropertyDisplayComponent
  ]
})
export class UiGardGardDataViewerModule {}
