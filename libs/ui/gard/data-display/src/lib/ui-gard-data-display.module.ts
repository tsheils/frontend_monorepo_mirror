import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GardDataDisplayComponent} from "./gard-data-display.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    GardDataDisplayComponent
  ],
  exports: [
    GardDataDisplayComponent
  ]
})
export class UiGardDataDisplayModule {}
