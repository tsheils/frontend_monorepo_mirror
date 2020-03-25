import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardSearchComponent } from './gard-search/gard-search.component';
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

@NgModule({
  imports: [CommonModule,
    SharedUiSearchBarModule,
    CustomMaterialModule],
  declarations: [GardSearchComponent],
  exports: [
    GardSearchComponent
  ]
})
export class UiGardSearchBarModule {}
