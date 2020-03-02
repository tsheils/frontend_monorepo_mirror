import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapperInterfaceComponent } from './mapper-interface/mapper-interface.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
    ],
  exports: [
    MapperInterfaceComponent
  ],
  declarations: [MapperInterfaceComponent]
})
export class SharedUiMapperUiModule {}
