import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DiseasesActions from './diseases.actions';
import {DiseasesEntity, Page} from './diseases.models';

export const DISEASES_FEATURE_KEY = 'diseases';

export interface State extends EntityState<DiseasesEntity> {
  selectedId?: string | number; // which Diseases record has been selected
  loaded: boolean; // has the Diseases list been loaded
  error?: string | null; // last none error (if any)
  selectedDisease?: any;
  stats? : any;
  page?: Page;
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
    DiseasesActions.searchDiseasesSuccess, (state, props) => {
  console.log(state);
  console.log(props);
  return diseasesAdapter.setAll(props.diseases, { ...state, page: props['page'], loaded: true })
}
),
 on(
   DiseasesActions.loadDiseasesSuccess, (state, props) => {
      console.log(state);
      console.log(props);
    return diseasesAdapter.setAll(props.diseases, { ...state, page: props['page'], loaded: true })
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
