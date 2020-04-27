import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPanelComponent } from './data-panel/data-panel.component';
import {UiGardDataDisplayModule} from "@ncats-frontend-library/ui/gard/data-display";
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

@NgModule({
  imports: [
    CommonModule,
    UiGardDataDisplayModule,
    SharedUiCurationMatrixModule,
    CustomMaterialModule
  ],
  declarations: [
    DataPanelComponent
  ],
  exports: [
    DataPanelComponent
  ]
})
export class UiGardGardDataViewerModule {}
