import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContentComponent } from './app-content/app-content.component';
import {DynamicPanelConfig} from "./models/dynamic-panel-config";
import {DynamicAPIConfig} from "./models/dynamic-apiconfig";
import {NavHeaderConfig} from "./models/nav-header-config";
import {SidePanelOptions} from "./models/side-panel-options";
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: '', pathMatch: 'full', component: AppContentComponent}
    ]),
    NcatsMaterialModule
  ],
  declarations: [AppContentComponent],
  exports: [
    AppContentComponent
  ]
})
export class DynamicAppModule {}
