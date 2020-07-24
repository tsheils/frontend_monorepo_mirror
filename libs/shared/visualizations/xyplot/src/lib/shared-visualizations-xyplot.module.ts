import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XyplotComponent } from './xyplot/xyplot.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    XyplotComponent
  ],
  declarations: [XyplotComponent]
})
export class SharedVisualizationsXyplotModule {}
