import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardHeaderComponent } from './gard-header/gard-header.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [GardHeaderComponent],
  exports: [GardHeaderComponent]
})
export class UiGardGardHeaderModule {}
