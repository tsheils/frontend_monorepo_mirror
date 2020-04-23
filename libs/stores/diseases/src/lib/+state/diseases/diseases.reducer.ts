import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DiseasesActions from './diseases.actions';
import { DiseasesEntity } from './diseases.models';

export const DISEASES_FEATURE_KEY = 'diseases';

export interface State extends EntityState<DiseasesEntity> {
  selectedId?: string | number; // which Diseases record has been selected
  loaded: boolean; // has the Diseases list been loaded
  error?: string | null; // last none error (if any)
  selectedDisease?: any;
  stats? : any;
}

export interface DiseasesPartialState {
  readonly [DISEASES_FEATURE_KEY]: State;
}

export const diseasesAdapter: EntityAdapter<DiseasesEntity> = createEntityAdapter<
  DiseasesEntity
>();

export const diseaseInitialState: State = diseasesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const diseasesReducer = createReducer(
  diseaseInitialState,
  on(
    DiseasesActions.setDiseaseStats,
    DiseasesActions.searchDiseases,
    DiseasesActions.setDisease,
    DiseasesActions.loadDiseases, (state) => ({...state, loaded: false, error: null})
    ),
  on(
    DiseasesActions.setDiseaseStatsSuccess,
    (state, {stats}) => ({...state, stats: stats, loaded: true})
  ),
  on(
    DiseasesActions.searchDiseasesSuccess,
    DiseasesActions.loadDiseasesSuccess, (state, { diseases }) => {
      console.log(state);
      console.log(diseases);
    return diseasesAdapter.setAll(diseases, { ...state, loaded: true })
    }
  ),
  on(
    DiseasesActions.setDiseaseFailure,
    DiseasesActions.setDiseaseStatsFailure,
    DiseasesActions.searchDiseasesFailure,
    DiseasesActions.loadDiseasesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    DiseasesActions.setDiseaseSuccess, (state, {disease}) => diseasesAdapter.setOne(disease, { ...state, selectedId: disease.id, loaded: true })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return diseasesReducer(state, action);
}
