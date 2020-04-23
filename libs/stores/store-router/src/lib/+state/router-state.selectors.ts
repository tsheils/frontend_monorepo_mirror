import {createFeatureSelector, createSelector} from '@ngrx/store';
import {routerStateConfig} from "@ncats-frontend-library/stores/store-router";
import {MergedRouteReducerState} from "./merged-route";

export const getRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);
export const getMergedRoute = createSelector(getRouterReducerState, (routerReducerState) => routerReducerState.state);
