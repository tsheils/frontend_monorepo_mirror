import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HighlightPipe } from './highlight.pipe';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DisableControlDirective } from './disable-control.directive';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchBarComponent,
    HighlightPipe,
    DisableControlDirective
  ],
  exports: [
    SearchBarComponent,
    HighlightPipe
  ]
})
export class SharedUiSearchBarModule {}
