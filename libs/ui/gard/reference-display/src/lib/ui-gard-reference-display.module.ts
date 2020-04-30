import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenceDisplayComponent } from './reference-display/reference-display.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ReferenceDisplayComponent],
  exports: [
    ReferenceDisplayComponent
  ]
})
export class UiGardReferenceDisplayModule {}
