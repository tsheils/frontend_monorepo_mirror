import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdgTdlIndicatorComponent } from './idg-tdl-indicator/idg-tdl-indicator.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IdgTdlIndicatorComponent],
  exports: [
    IdgTdlIndicatorComponent
  ]
})
export class IdgTdlIndicatorModule {}
