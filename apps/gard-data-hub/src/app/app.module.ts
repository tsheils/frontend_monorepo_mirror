import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UiGardGardHeaderModule } from '@ncats-frontend-library/ui/gard/gard-header';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiHeaderTemplateModule } from '@ncats-frontend-library/shared/ui/header-template';
import { CustomMaterialModule } from '@ncats-frontend-library/common/ui/custom-material';
import { SessionGuard } from './session.guard';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@ncats-frontend-library/features/gard-curation/dashboard').then(
        m => m.FeaturesGardCurationDashboardModule
      )
  },
  { path: 'index', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'mapper',
    pathMatch: 'full',
    canActivate: [SessionGuard],
    loadChildren: () =>
      import('@ncats-frontend-library/features/gard-curation/mapper').then(
        m => m.FeaturesGardCurationMapperModule
      )
  },
  {
    path: 'curation',
    pathMatch: 'full',
    canActivate: [SessionGuard],
    data: { path: 'curation' },
    loadChildren: () =>
      import('@ncats-frontend-library/features/gard-curation/curation').then(
        m => m.FeaturesGardCurationCurationModule
      )
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { initialNavigation: 'enabled' }),
    UiGardGardHeaderModule,
    SharedUiHeaderTemplateModule,
    CustomMaterialModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    DiseasesFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log("app module");
    console.log(AppModule);
  }

}
