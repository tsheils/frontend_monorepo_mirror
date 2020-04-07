import { Neo4jdbsEntity } from './neo4jdbs.models';
import * as Neo4jdbsActions from './neo4jdbs.actions';
import { State, initialState, reducer } from './neo4jdbs.reducer';

describe('Neo4jdbs Reducer', () => {
  const createNeo4jdbsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Neo4jdbsEntity);

  beforeEach(() => {});

  describe('valid Neo4jdbs actions', () => {
    it('loadNeo4jdbsSuccess should return set the list of known Neo4jdbs', () => {
      const neo4jdbs = [
        createNeo4jdbsEntity('PRODUCT-AAA'),
        createNeo4jdbsEntity('PRODUCT-zzz'),
      ];
      const action = Neo4jdbsActions.loadNeo4jdbsSuccess({ neo4jdbs });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
