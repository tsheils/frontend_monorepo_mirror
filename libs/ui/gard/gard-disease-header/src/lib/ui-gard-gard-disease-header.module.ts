import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardDiseaseHeaderComponent } from './gard-disease-header/gard-disease-header.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [GardDiseaseHeaderComponent],
})
export class UiGardGardDiseaseHeaderModule {}
