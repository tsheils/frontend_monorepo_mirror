import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routerReducer, RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreModule} from "@ngrx/store";
import {MergedRouterStateSerializer} from "./+state/merged-route-serializer";
import {routerStateConfig} from "./+state/router-state.selectors";


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(routerStateConfig.stateKey, routerReducer),
    StoreRouterConnectingModule.forRoot(routerStateConfig),
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: MergedRouterStateSerializer,
    }
  ]
})
export class StoreRouterModule {}
