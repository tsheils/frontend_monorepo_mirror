import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DISEASES_FEATURE_KEY,
  State,
  DiseasesPartialState,
  diseasesAdapter,
} from './diseases.reducer';
import {DiseasesEntity} from "@ncats-frontend-library/stores/diseases";
import {getMergedRoute} from "../../../../../store-router/src/lib/+state/router-state.selectors";
import {MergedRoute} from "../../../../../store-router/src/lib/+state/merged-route";

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
  (state: State) => selectEntities(state)
);

// just returns id
export const getSelectedId = createSelector(
  getDiseasesState,
  (state: State) => state.selectedId
);

// returns selected disease
export const getSelectedDisease = createSelector(
  getDiseasesState,
  (state: State) =>  selectEntities(state)
);

// returns diseases and selected id to be filtered
export const getSelected = createSelector(
  getSelectedDisease,
  getSelectedId,
  (entities, selectedId) =>  selectedId && entities[selectedId]
);

export const getDiseasesStats = createSelector(
  getDiseasesState,
  (state) => state.stats
);

export const getDiseases = createSelector(
  getMergedRoute,
  getDiseasesState,
  (route:MergedRoute, state: State) =>  {
    return Object.values(state.entities).map(entity => entity = entity.disease);
  }
)

export const getPage = createSelector(
  getDiseasesState,
  (state) => state.page
);
