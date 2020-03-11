import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurationMatrixComponent } from './curation-matrix/curation-matrix.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    FlexLayoutModule,
    DragDropModule
  ],
  exports: [
    CurationMatrixComponent
  ],
  declarations: [CurationMatrixComponent]
})
export class SharedUiCurationMatrixModule {}
