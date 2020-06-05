import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationTreeComponent } from './navigation-tree/navigation-tree.component';
import {SharedUiObjectTreeModule} from "@ncats-frontend-library/shared/ui/object-tree";

@NgModule({
  imports: [CommonModule, SharedUiObjectTreeModule],
  declarations: [NavigationTreeComponent],
  exports: [
    NavigationTreeComponent
  ]
})
export class UiGardNavigationTreeModule {}
