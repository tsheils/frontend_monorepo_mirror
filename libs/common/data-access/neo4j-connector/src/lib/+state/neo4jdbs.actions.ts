import { createAction, props } from '@ngrx/store';
import {Neo4jdbsEntity, Neo4jInstanceConfig} from './neo4jdbs.models';

export enum Neo4jdbsActionsTypes {
  loadNeo4jdbs = '[Neo4jdbs] Load Neo4jdbs',
  loadNeo4jdbsSuccess = '[Neo4jdbs] Load Neo4jdbs Success',
  loadNeo4jdbsFailure = '[Neo4jdbs] Load Neo4jdbs Failure',
  setNeo4jdbs = '[Neo4jdbs] Set Neo4jdbs',
  setNeo4jdbsSuccess = '[Neo4jdbs] Set Neo4jdbs Success',
  setNeo4jdbsFailure = '[Neo4jdbs] Set Neo4jdbs Failure'
}

export const loadNeo4jdbs = createAction(
  Neo4jdbsActionsTypes.loadNeo4jdbs,
  props<{ config:Neo4jInstanceConfig }>()
);

export const loadNeo4jdbsSuccess = createAction(
  Neo4jdbsActionsTypes.loadNeo4jdbsSuccess,
  props<{ neo4jdbs: Neo4jdbsEntity[] }>()
);

export const loadNeo4jdbsFailure = createAction(
  Neo4jdbsActionsTypes.loadNeo4jdbsFailure,
  props<{ error: any }>()
);

export const setNeo4jdbs = createAction(
  Neo4jdbsActionsTypes.setNeo4jdbs,
  props<{ neo4jdb: Neo4jdbsEntity }>()
);

export const setNeo4jdbsSuccess = createAction(
  Neo4jdbsActionsTypes.setNeo4jdbsSuccess,
  props<{ neo4jdbs: Neo4jdbsEntity[] }>()
);

export const setNeo4jdbsFailure = createAction(
  Neo4jdbsActionsTypes.setNeo4jdbsFailure,
  props<{ error: any }>()
);

