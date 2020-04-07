import { Neo4jdbsEntity } from './neo4jdbs.models';
import { State, neo4jdbsAdapter, initialState } from './neo4jdbs.reducer';
import * as Neo4jdbsSelectors from './neo4jdbs.selectors';

describe('Neo4jdbs Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNeo4jdbsId = (it) => it['id'];
  const createNeo4jdbsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Neo4jdbsEntity);

  let state;

  beforeEach(() => {
    state = {
      neo4jdbs: neo4jdbsAdapter.addAll(
        [
          createNeo4jdbsEntity('PRODUCT-AAA'),
          createNeo4jdbsEntity('PRODUCT-BBB'),
          createNeo4jdbsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Neo4jdbs Selectors', () => {
    it('getAllNeo4jdbs() should return the list of Neo4jdbs', () => {
      const results = Neo4jdbsSelectors.getAllNeo4jdbs(state);
      const selId = getNeo4jdbsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = Neo4jdbsSelectors.getSelected(state);
      const selId = getNeo4jdbsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getNeo4jdbsLoaded() should return the current 'loaded' status", () => {
      const result = Neo4jdbsSelectors.getNeo4jdbsLoaded(state);

      expect(result).toBe(true);
    });

    it("getNeo4jdbsError() should return the current 'error' state", () => {
      const result = Neo4jdbsSelectors.getNeo4jdbsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
