import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidenavPanelComponent} from "./sidenav-panel.component";
import {ScrollspyDirective} from "./directives/scrollspy.directive";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [
    ScrollspyDirective,
    SidenavPanelComponent
  ],
  exports: [
    ScrollspyDirective,
    SidenavPanelComponent
  ]
})
export class SidenavsNavigationSidepanelModule {}
