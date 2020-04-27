import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {UiGardGardHeaderModule} from '@ncats-frontend-library/ui/gard/gard-header';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedUiHeaderTemplateModule} from '@ncats-frontend-library/shared/ui/header-template';
import {SessionGuard} from './session.guard';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {DiseasesFacade, StoresDiseasesModule} from "@ncats-frontend-library/stores/diseases";

import {HttpClientModule} from "@angular/common/http";
import {StoreRouterModule} from "@ncats-frontend-library/stores/store-router";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {
  CommonDataAccessNeo4jConnectorModule,
  Neo4jConnectService
} from "@ncats-frontend-library/shared/data-access/neo4j-connector";


const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'diseases',
    pathMatch: 'full'
  },
  { path: 'index', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'diseases',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    loadChildren: () =>
      import('@ncats-frontend-library/features/gard-curation/dashboard').then(
        m => m.FeaturesGardCurationDashboardModule
      )
  },
  {
    path: 'mapper',
    pathMatch: 'full',
    canActivate: [SessionGuard],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {
      onSameUrlNavigation: 'reload',
      initialNavigation: 'enabled'
    }),
    UiGardGardHeaderModule,
    SharedUiHeaderTemplateModule,
    CustomMaterialModule,
    CommonDataAccessNeo4jConnectorModule,
    StoresDiseasesModule,
    StoreRouterModule,
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
    DiseasesFacade,
    {
      provide: APP_INITIALIZER,
      useFactory: (facade: DiseasesFacade, connectionService: Neo4jConnectService) => {
        return () => {
          environment.neo4j.forEach(db => {
            connectionService.createDriver(db);
          });
        //  facade.dispatch(loadDiseases());
        };
      },
      multi: true,
      deps: [DiseasesFacade, Neo4jConnectService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
