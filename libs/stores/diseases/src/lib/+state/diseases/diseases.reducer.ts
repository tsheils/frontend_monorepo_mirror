import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as DiseasesActions from './diseases.actions';
import {DiseasesEntity} from './diseases.models';
import {Disease, GardHierarchy} from "@ncats-frontend-library/models/gard/gard-models";
import {Page} from "@ncats-frontend-library/models/interfaces/core-interfaces";


export const DISEASES_FEATURE_KEY = 'diseases';

export interface State extends EntityState<DiseasesEntity> {
  selectedId?: string | number; // which Diseases record has been selected
  loaded: boolean; // has the Diseases list been loaded
  error?: string | null; // last none error (if any)
  // todo check if this cn be a Disease object
  disease?: Disease;
  stats? : any;
  hierarchy?: GardHierarchy;
  page?: Page;
  typeahead?: any;
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
    DiseasesActions.setPage,
    (state, {page}) => ({...state, page: page})
  ),
  on(
    DiseasesActions.searchDiseasesSuccess,
      (state, {typeahead}) => ({...state, typeahead: typeahead})
),
 on(
   DiseasesActions.loadDiseasesSuccess, (state, props) => {
     const diseases = props.diseases.map(disease => {
       return {
         id: disease.gard_id,
         name: disease.name,
         disease:disease
       }
     });
    return diseasesAdapter.setAll(diseases, { ...state, loaded: true })
    }
  ),
  on(
    DiseasesActions.setDiseaseSuccess,
      (state, {disease}) => ({...state, disease: disease})
  ),
  on(
    DiseasesActions.setDiseaseFailure,
    DiseasesActions.setDiseaseStatsFailure,
    DiseasesActions.searchDiseasesFailure,
    DiseasesActions.fetchHierarchyFailure,
    DiseasesActions.loadDiseasesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    DiseasesActions.fetchHierarchySuccess, (state, {hierarchy}) => {
        const setTreeData = (parent: GardHierarchy, data: GardHierarchy) => {
          if (parent.value === data.value) {
            parent = data;
          } else if (parent.children) {
            let found = false;
            parent.children.map(child => {
              if(child.value === data.value) {
                child.children = data.children;
                found = true;
              }
              return child;
            });
            if(found){
              return parent;
            } else {
              parent.children.map(child => setTreeData(child, data));
            }
          }
          return parent;
        };
      return ({...state, hierarchy: hierarchy})
    }
  )
);



export function reducer(state: State | undefined, action: Action) {
  return diseasesReducer(state, action);
}
