import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as Neo4jdbsActions from './neo4jdbs.actions';
import { Neo4jdbsEntity } from './neo4jdbs.models';

export const NEO4JDBS_FEATURE_KEY = 'neo4jdbs';

export interface State extends EntityState<Neo4jdbsEntity> {
  selectedId?: string | number; // which Neo4jdbs record has been selected
  loaded: boolean; // has the Neo4jdbs list been loaded
  error?: string | null; // last none error (if any)
}

export interface Neo4jdbsPartialState {
  readonly [NEO4JDBS_FEATURE_KEY]: State;
}

export const neo4jdbsAdapter: EntityAdapter<Neo4jdbsEntity> = createEntityAdapter<
  Neo4jdbsEntity
>();

export const initialState: State = neo4jdbsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const neo4jdbsReducer = createReducer(
  initialState,
  on(Neo4jdbsActions.loadNeo4jdbs, (state) =>  {
    console.log(state);
  console.log("in load neo4j reducer");
   return  ({
    ...state,
    loaded: false,
    error: null,
  })
  }),
  on(
    Neo4jdbsActions.setNeo4jdbsSuccess,
    Neo4jdbsActions.loadNeo4jdbsSuccess,
    (state, { neo4jdbs }) => {
    console.log("laoded (or set) success in reducer")
    console.log(state)
    console.log(neo4jdbs)
     return neo4jdbsAdapter.addMany(neo4jdbs, {...state, loaded: true})
    }
  ),
  on(
    Neo4jdbsActions.setNeo4jdbsFailure,
    Neo4jdbsActions.loadNeo4jdbsFailure,
    (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return neo4jdbsReducer(state, action);
}
