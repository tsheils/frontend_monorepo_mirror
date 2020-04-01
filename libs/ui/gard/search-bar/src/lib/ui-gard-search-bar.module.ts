import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardSearchComponent } from './gard-search/gard-search.component';
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {ReactiveFormsModule} from "@angular/forms";
import {HighlightPipe} from "./gard-search/highlight.pipe";

@NgModule({
  imports: [CommonModule,
    SharedUiSearchBarModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    HighlightPipe,
    GardSearchComponent
  ],
  exports: [
    GardSearchComponent
  ]
})
export class UiGardSearchBarModule {}
