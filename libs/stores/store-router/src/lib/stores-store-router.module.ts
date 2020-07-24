import {NgModule, Optional, Self} from '@angular/core';
import { CommonModule } from '@angular/common';
import {routerReducer, RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreModule} from "@ngrx/store";
import {Router} from "@angular/router";
import {MergedRouterStateSerializer} from "./+state/merged-route-serializer";

export const routerStateConfig = {
  stateKey: 'router', // state-slice name for routing state
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(routerStateConfig.stateKey, routerReducer),
    StoreRouterConnectingModule.forRoot(routerStateConfig),
  ],
  exports: [
    StoreModule,
    StoreRouterConnectingModule
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: MergedRouterStateSerializer,
    }
  ]
})
export class StoreRouterModule {
  constructor(@Self() @Optional() router: Router) {
    if (router) {
      // console.log('All good, NgrxRouterStoreModule');
    } else {
      console.error('NgrxRouterStoreModule must be imported in the same same level as RouterModule');

    }
  }
}
