import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  NEO4JDBS_FEATURE_KEY,
  State,
  Neo4jdbsPartialState,
  neo4jdbsAdapter,
} from './neo4jdbs.reducer';

// Lookup the 'Neo4jdbs' feature state managed by NgRx
export const getNeo4jdbsState = createFeatureSelector<
  Neo4jdbsPartialState,
  State
>(NEO4JDBS_FEATURE_KEY);

const { selectAll, selectEntities } = neo4jdbsAdapter.getSelectors();

export const getNeo4jdbsLoaded = createSelector(
  getNeo4jdbsState,
  (state: State) => state.loaded
);

export const getNeo4jdbsError = createSelector(
  getNeo4jdbsState,
  (state: State) => state.error
);

export const getAllNeo4jdbs = createSelector(getNeo4jdbsState, (state: State) => {
  console.log("get all selector");
  console.log(state);
   return selectAll(state)
  }
);

export const getNeo4jdbsEntities = createSelector(
  getNeo4jdbsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getNeo4jdbsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getNeo4jdbsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
