import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DISEASES_FEATURE_KEY,
  State,
  DiseasesPartialState,
  diseasesAdapter,
} from './diseases.reducer';

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
export const getAllDiseases = createSelector(getDiseasesState, (state: State) =>
  selectAll(state)
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

// returns diseases and selected id to be filtered
export const getSelected = createSelector(
  getDiseasesEntities,
  getSelectedId,
  (entities, selectedId) => {
      console.log("inside selector state");
      console.log(entities);
      console.log(selectedId);
    return selectedId && entities[selectedId]
  }
);
