import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmrtgraphCoreComponent } from './components/smrtgraph-core/smrtgraph-core.component';
import { NodeUiComponent } from './components/node-ui/node-ui.component';
import { EdgeUiComponent } from './components/edge-ui/edge-ui.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    SmrtgraphCoreComponent
  ],
  declarations: [
    SmrtgraphCoreComponent,
    NodeUiComponent,
    EdgeUiComponent
  ]
})
export class SharedSmrtgraphSmrtgraphCoreModule {}
