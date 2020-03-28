import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DiseasesActions from './diseases.actions';
import { DiseasesEntity } from './diseases.models';

export const DISEASES_FEATURE_KEY = 'diseases';

export interface State extends EntityState<DiseasesEntity> {
  selectedId?: string | number; // which Diseases record has been selected
  loaded: boolean; // has the Diseases list been loaded
  error?: string | null; // last none error (if any)
}

export interface DiseasesPartialState {
  readonly [DISEASES_FEATURE_KEY]: State;
}

export const diseasesAdapter: EntityAdapter<DiseasesEntity> = createEntityAdapter<
  DiseasesEntity
>();

export const initialState: State = diseasesAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const diseasesReducer = createReducer(
  initialState,
  on(DiseasesActions.loadDiseases, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(DiseasesActions.loadDiseasesSuccess, (state, { diseases }) =>
    diseasesAdapter.addAll(diseases, { ...state, loaded: true })
  ),
  on(DiseasesActions.loadDiseasesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return diseasesReducer(state, action);
}
