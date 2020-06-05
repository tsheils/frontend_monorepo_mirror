import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FILTERS_FEATURE_KEY,
  State,
  FiltersPartialState,
  filtersAdapter,
} from './filters.reducer';

// Lookup the 'Filters' feature state managed by NgRx
export const getFiltersState = createFeatureSelector<
  FiltersPartialState,
  State
>(FILTERS_FEATURE_KEY);

const { selectAll, selectEntities } = filtersAdapter.getSelectors();

export const getFiltersLoaded = createSelector(
  getFiltersState,
  (state: State) => state.loaded
);

export const getFiltersError = createSelector(
  getFiltersState,
  (state: State) => state.error
);

export const getAllFilters = createSelector(getFiltersState, (state: State) =>
  selectAll(state)
);

export const getFiltersEntities = createSelector(
  getFiltersState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFiltersState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getFiltersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
