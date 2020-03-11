import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardHeaderComponent } from './gard-header/gard-header.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {SharedUiHeaderTemplateModule} from "@ncats-frontend-library/shared/ui/header-template";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedUiHeaderTemplateModule
  ],
  declarations: [GardHeaderComponent],
  exports: [GardHeaderComponent]
})
export class UiGardGardHeaderModule {}
