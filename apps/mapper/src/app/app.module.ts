import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {CommonUiNeo4jConnectionFormModule} from "@ncats-frontend-library/common/ui/neo4j-connection-form";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";
import {SharedUiMapperUiModule} from "@ncats-frontend-library/shared/ui/mapper-ui";
import {SharedUiObjectTreeModule} from "@ncats-frontend-library/shared/ui/object-tree";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {initialNavigation: 'enabled'}),
    CustomMaterialModule,
    SharedUiNcatsFormModule,
    CommonUiNeo4jConnectionFormModule,
    SharedUiMapperUiModule,
    SharedUiObjectTreeModule,
    SharedUiSearchBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
