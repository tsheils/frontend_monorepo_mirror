import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicAppContentComponent } from './dynamic-app-content/dynamic-app-content.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  exports: [
    DynamicAppContentComponent
  ],
  declarations: [
    DynamicAppContentComponent
  ]
})
export class SharedUiDynamicAppLayoutModule {}
