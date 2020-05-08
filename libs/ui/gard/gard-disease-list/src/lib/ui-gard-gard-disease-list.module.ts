import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { DiseaseListCardComponent } from './disease-list-card/disease-list-card.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {UiGardGardDataViewerModule} from "@ncats-frontend-library/ui/gard/gard-data-viewer";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    UiGardGardDataViewerModule
  ],
  declarations: [DiseaseListComponent, DiseaseListCardComponent],
  exports: [
    DiseaseListComponent
  ]
})
export class UiGardGardDiseaseListModule {}
