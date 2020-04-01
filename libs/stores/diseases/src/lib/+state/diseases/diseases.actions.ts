import { createAction, props } from '@ngrx/store';
import { DiseasesEntity } from './diseases.models';

export enum DiseasesActionsTypes {
  loadDiseases = '[Diseases] Load Diseases',
  loadDiseasesSuccess = '[Diseases] Load Diseases Success',
  loadDiseasesFailure = '[Diseases] Load Diseases Failure',
  searchDiseases = '[Diseases] Search Diseases',
  searchDiseasesSuccess = '[Diseases] Search Diseases Success',
  searchDiseasesFailure = '[Diseases] Search Diseases Failure',
}

export const loadDiseases = createAction(DiseasesActionsTypes.loadDiseases);

export const loadDiseasesSuccess = createAction(
  DiseasesActionsTypes.loadDiseasesSuccess,
  props<{ diseases: DiseasesEntity[] }>()
);

export const loadDiseasesFailure = createAction(
  DiseasesActionsTypes.loadDiseasesFailure,
  props<{ error: any }>()
);
//input
export const searchDiseases = createAction(
  DiseasesActionsTypes.searchDiseases,
  props<{ query: string }>()
);
//output
export const searchDiseasesSuccess = createAction(
  DiseasesActionsTypes.searchDiseasesSuccess,
  props<{ diseases: DiseasesEntity[] }>()
);
//errors
export const searchDiseasesFailure = createAction(
  DiseasesActionsTypes.searchDiseasesFailure,
  props<{ error: any }>()
);
