import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MergedRouteReducerState} from "@ncats-frontend-library/stores/store-router";


export const routerStateConfig = {
  stateKey: 'router', // state-slice name for routing state
};

export const getRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);
export const getMergedRoute = createSelector(getRouterReducerState, (routerReducerState) => routerReducerState.state);
