import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {UiGardGardHeaderModule} from "@ncats-frontend-library/ui/gard/gard-header";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const ROUTES: Routes = [
  { path: 'index',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'mapper',
    pathMatch: 'full',
    loadChildren: () => import('@ncats-frontend-library/features/gard-curation/mapper').then(m => m.FeaturesGardCurationMapperModule)
  }, {
    path: 'curation',
    pathMatch: 'full',
    loadChildren: () => import('@ncats-frontend-library/features/gard-curation/curation').then(m => m.FeaturesGardCurationCurationModule)
  }
  ];



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {initialNavigation: 'enabled'}),
    UiGardGardHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
