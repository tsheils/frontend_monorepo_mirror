import { createAction, props } from '@ngrx/store';
import { FiltersEntity } from './filters.models';

export const loadFilters = createAction('[Filters] Load Filters');

export const loadFiltersSuccess = createAction(
  '[Filters] Load Filters Success',
  props<{ filters: FiltersEntity[] }>()
);

export const loadFiltersFailure = createAction(
  '[Filters] Load Filters Failure',
  props<{ error: any }>()
);
