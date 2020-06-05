import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FiltersActions from './filters.actions';
import { FiltersEntity } from './filters.models';

export const FILTERS_FEATURE_KEY = 'filters';

export interface State extends EntityState<FiltersEntity> {
  selectedId?: string | number; // which Filters record has been selected
  loaded: boolean; // has the Filters list been loaded
  error?: string | null; // last none error (if any)
}

export interface FiltersPartialState {
  readonly [FILTERS_FEATURE_KEY]: State;
}

export const filtersAdapter: EntityAdapter<FiltersEntity> = createEntityAdapter<
  FiltersEntity
>();

export const initialState: State = filtersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const filtersReducer = createReducer(
  initialState,
  on(FiltersActions.loadFilters, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FiltersActions.loadFiltersSuccess, (state, { filters }) =>
    filtersAdapter.addAll(filters, { ...state, loaded: true })
  ),
  on(FiltersActions.loadFiltersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return filtersReducer(state, action);
}
