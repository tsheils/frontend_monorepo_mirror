import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppContentComponent} from './app-content/app-content.component';
import {RouterModule} from "@angular/router";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: '', pathMatch: 'full', component: AppContentComponent}
    ]),
    CustomMaterialModule
  ],
  declarations: [AppContentComponent],
  exports: [
    AppContentComponent
  ]
})
export class DynamicAppModule {}
