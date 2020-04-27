import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapperInterfaceComponent } from './mapper-interface/mapper-interface.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {HighlightPipe} from "./mapper-interface/highlight.pipe";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ],
  exports: [
    MapperInterfaceComponent
  ],
  declarations: [
    HighlightPipe,
    MapperInterfaceComponent
  ]
})
export class SharedUiMapperUiModule {}
