import {createAction, props} from '@ngrx/store';
import {Page} from "@ncats-frontend-library/models/interfaces/core-interfaces";
import {Disease} from "@ncats-frontend-library/models/gard/gard-models";

export enum DiseasesActionsTypes {
  loadDiseases = '[Diseases] Load Diseases',
  loadDiseasesSuccess = '[Diseases] Load Diseases Success',
  loadDiseasesFailure = '[Diseases] Load Diseases Failure',

  searchDiseases = '[Diseases] Search Diseases',
  searchDiseasesSuccess = '[Diseases] Search Diseases Success',
  searchDiseasesFailure = '[Diseases] Search Diseases Failure',

  setDisease = '[Diseases] Set Disease',
  setDiseaseSuccess = '[Diseases] Set Disease Success',
  setDiseaseFailure = '[Diseases] Set Disease Failure',

  setDiseaseStats = '[Diseases] Set Disease Stats',
  setDiseaseStatsSuccess = '[Diseases] Set Disease Stats Success',
  setDiseaseStatsFailure = '[Diseases] Set Disease Stats Failure',

  fetchHierarchy = '[Diseases] Fetch Hierarchy',
  fetchHierarchySuccess = '[Diseases] Fetch Hierarchy Success',
  fetchHierarchyFailure = '[Diseases] Fetch Hierarchy Failure',

  setFilters = '[Diseases] Set Filters',
  setFiltersSuccess = '[Diseases] Set Filters Success',
  setFiltersFailure = '[Diseases] Set Filters Failure',

  setPage = '[Diseases] Set Page'
}

export const loadDiseases = createAction(
  DiseasesActionsTypes.loadDiseases
);

export const setPage = createAction(
  DiseasesActionsTypes.setPage,
  props<{page: Page }>()
);

export const loadDiseasesSuccess = createAction(
  DiseasesActionsTypes.loadDiseasesSuccess,
  props<{ diseases: Disease[]}>()
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
  props<{ typeahead: any }>()
);
//errors
export const searchDiseasesFailure = createAction(
  DiseasesActionsTypes.searchDiseasesFailure,
  props<{ error: any }>()
);

//input
export const setDisease = createAction(
  DiseasesActionsTypes.setDisease,
  props<{ id: string }>()
);
//output
export const setDiseaseSuccess = createAction(
  DiseasesActionsTypes.setDiseaseSuccess,
  props<{ disease: Disease }>()
);
//errors
export const setDiseaseFailure = createAction(
  DiseasesActionsTypes.setDiseaseFailure,
  props<{ error: any }>()
);

//input
export const setDiseaseStats = createAction(
  DiseasesActionsTypes.setDiseaseStats,
  props<{ }>()
);
//output
export const setDiseaseStatsSuccess = createAction(
  DiseasesActionsTypes.setDiseaseStatsSuccess,
  props<{ stats: any }>()
);
//errors
export const setDiseaseStatsFailure = createAction(
  DiseasesActionsTypes.setDiseaseStatsFailure,
  props<{ error: any }>()
);

//input
export const fetchHierarchy = createAction(
  DiseasesActionsTypes.fetchHierarchy,
  props<{node: any }>()
);
//output
export const fetchHierarchySuccess = createAction(
  DiseasesActionsTypes.fetchHierarchySuccess,
  props<{ hierarchy: any }>()
);
//errors
export const fetchHierarchyFailure = createAction(
  DiseasesActionsTypes.fetchHierarchyFailure,
  props<{ error: any }>()
);

//input
export const setFilters = createAction(
  DiseasesActionsTypes.setFilters
);
//output
export const setFiltersSuccess = createAction(
  DiseasesActionsTypes.setFiltersSuccess,
  props<{ filters: any }>()
);
//errors
export const setFiltersFailure = createAction(
  DiseasesActionsTypes.setFiltersFailure,
  props<{ error: any }>()
);
