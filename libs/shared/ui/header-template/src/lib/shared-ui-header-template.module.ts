import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTemplateComponent } from './header-template/header-template.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule
  ],
  declarations: [HeaderTemplateComponent],
  exports: [
    HeaderTemplateComponent
  ]
})
export class SharedUiHeaderTemplateModule {}
