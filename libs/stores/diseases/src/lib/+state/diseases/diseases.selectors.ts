import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DISEASES_FEATURE_KEY, diseasesAdapter, DiseasesPartialState, State,} from './diseases.reducer';
import {getMergedRoute, MergedRoute} from "@ncats-frontend-library/stores/store-router";


// Lookup the 'Diseases' feature state managed by NgRx
export const getDiseasesState = createFeatureSelector<
  DiseasesPartialState,
  State
>(DISEASES_FEATURE_KEY);

const { selectAll, selectEntities } = diseasesAdapter.getSelectors();

export const getDiseasesLoaded = createSelector(
  getDiseasesState,
  (state: State) => state.loaded
);

export const getDiseasesError = createSelector(
  getDiseasesState,
  (state: State) => state.error
);

// get everything
export const getAllDiseases = createSelector(getDiseasesState, (state: State) => selectAll(state)
);
// get some diseases
export const getDiseasesEntities = createSelector(
  getDiseasesState,
  (state: State) => selectEntities(state)
);

export const searchDiseasesEntities = createSelector(
  getDiseasesState,
  (state: State) => state.typeahead
);

// just returns id
export const getSelectedId = createSelector(
  getDiseasesState,
  (state: State) => state.selectedId
);

export const getHierarchy = createSelector(
  getDiseasesState,
  (state: State) => state.hierarchy
);

export const getPage = createSelector(
  getDiseasesState,
  (state: State) =>  state.page
);

// returns selected disease
export const getSelectedDisease = createSelector(
  getDiseasesState,
  (state: State) =>  selectEntities(state)
);

// returns diseases and selected id to be filtered
export const getSelected = createSelector(
  getDiseasesState,
  (state) => state.disease

);

export const getDiseasesStats = createSelector(
  getDiseasesState,
  (state) => state.stats
);

export const getDiseases = createSelector(
  getMergedRoute,
  getDiseasesState,
  (route:MergedRoute, state: State) =>  {
    return Object.values(state.entities).map(entity => entity.disease);
  }
);
