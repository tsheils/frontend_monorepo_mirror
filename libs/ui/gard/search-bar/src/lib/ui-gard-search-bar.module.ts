import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardSearchComponent } from './gard-search/gard-search.component';
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {ReactiveFormsModule} from "@angular/forms";
import {HighlightPipe} from "./gard-search/highlight.pipe";
import {DiseasesFacade, StoresDiseasesModule} from "@ncats-frontend-library/stores/diseases";

@NgModule({
  imports: [CommonModule,
    SharedUiSearchBarModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    StoresDiseasesModule
  ],
  declarations: [
    HighlightPipe,
    GardSearchComponent
  ],
  providers: [
    DiseasesFacade
  ],
  exports: [
    GardSearchComponent
  ]
})
export class UiGardSearchBarModule {}
