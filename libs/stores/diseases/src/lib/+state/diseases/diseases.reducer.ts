import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DiseasesActions from './diseases.actions';
import {DiseasesEntity, Page} from './diseases.models';
import {Disease, GardHierarchy} from "@ncats-frontend-library/models/gard/gard-models";


export const DISEASES_FEATURE_KEY = 'diseases';

export interface State extends EntityState<DiseasesEntity> {
  selectedId?: string | number; // which Diseases record has been selected
  loaded: boolean; // has the Diseases list been loaded
  error?: string | null; // last none error (if any)
  // todo check if this cn be a Disease object
  selectedDisease?: any;
  stats? : any;
  hierarchy?: GardHierarchy;
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
  return diseasesAdapter.setAll(props.diseases, { ...state, page: props['page'], loaded: true })
}
),
 on(
   DiseasesActions.loadDiseasesSuccess, (state, props) => {
    return diseasesAdapter.setAll(props.diseases, { ...state, page: props['page'], loaded: true })
    }
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
    DiseasesActions.setDiseaseSuccess, (state, {disease}) => diseasesAdapter.setOne(disease, { ...state, selectedId: disease.id, loaded: true })
  ),

  on(
    DiseasesActions.fetchHierarchySuccess, (state, {hierarchy}) => {
      console.log(state);
  //    let merge = hierarchy;
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
        }

      //  const clone = { ...state.hierarchy };
      //  console.log([setTreeData(state.hierarchy, hierarchy)]);
 /*     if (state.hierarchy) {
        //const stateHierarchy = [state.hierarchy].map(g => ({ ...g }));
      //  const stateHierarchy = {...state.hierarchy};
      //   merge = [setTreeData(stateHierarchy, hierarchy)];
      }*/
     // console.log(merge);
    //  const h = [state.hierarchy].map(hier => setTreeData(hier, hierarchy) )
      return ({...state, hierarchy: hierarchy, loaded: true})
    }
  )
);



export function reducer(state: State | undefined, action: Action) {
  return diseasesReducer(state, action);
}
