import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";
import {SharedUiMapperUiModule} from "@ncats-frontend-library/shared/ui/mapper-ui";
import {SharedUiObjectTreeModule} from "@ncats-frontend-library/shared/ui/object-tree";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {UiGardGardHeaderModule} from "@ncats-frontend-library/ui/gard/gard-header";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {initialNavigation: 'enabled'}),
    CustomMaterialModule,
    SharedUiNcatsFormModule,
    SharedUiMapperUiModule,
    SharedUiObjectTreeModule,
    SharedUiSearchBarModule,
    UiGardGardHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
