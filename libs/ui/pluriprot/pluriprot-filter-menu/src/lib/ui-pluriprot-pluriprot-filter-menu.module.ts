import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluriprotFilterMenuComponent } from './pluriprot-filter-menu/pluriprot-filter-menu.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [PluriprotFilterMenuComponent],
  exports: [
    PluriprotFilterMenuComponent
  ]
})
export class UiPluriprotPluriprotFilterMenuModule {}
