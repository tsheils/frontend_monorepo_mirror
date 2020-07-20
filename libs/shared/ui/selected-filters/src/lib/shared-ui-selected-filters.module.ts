import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import { SelectedFiltersComponent } from './selected-filters/selected-filters.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [SelectedFiltersComponent]
})
export class SharedUiSelectedFiltersModule {}
