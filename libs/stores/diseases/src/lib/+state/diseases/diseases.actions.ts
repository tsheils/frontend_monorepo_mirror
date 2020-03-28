import { createAction, props } from '@ngrx/store';
import { DiseasesEntity } from './diseases.models';

export const loadDiseases = createAction('[Diseases] Load Diseases');

export const loadDiseasesSuccess = createAction(
  '[Diseases] Load Diseases Success',
  props<{ diseases: DiseasesEntity[] }>()
);

export const loadDiseasesFailure = createAction(
  '[Diseases] Load Diseases Failure',
  props<{ error: any }>()
);
