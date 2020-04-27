import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectTreeComponent } from './object-tree/object-tree.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

@NgModule({
  imports: [CommonModule, CustomMaterialModule],
  exports: [
    ObjectTreeComponent
  ],
  declarations: [ObjectTreeComponent]
})
export class SharedUiObjectTreeModule {}
