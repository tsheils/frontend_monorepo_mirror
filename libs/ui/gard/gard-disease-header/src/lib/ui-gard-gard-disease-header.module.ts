import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardDiseaseHeaderComponent } from './gard-disease-header/gard-disease-header.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [GardDiseaseHeaderComponent],
  exports: [GardDiseaseHeaderComponent]
})
export class UiGardGardDiseaseHeaderModule {}
