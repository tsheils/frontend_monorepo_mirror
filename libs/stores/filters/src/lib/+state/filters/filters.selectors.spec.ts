import { FiltersEntity } from './filters.models';
import { State, filtersAdapter, initialState } from './filters.reducer';
import * as FiltersSelectors from './filters.selectors';

describe('Filters Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFiltersId = (it) => it['id'];
  const createFiltersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FiltersEntity);

  let state;

  beforeEach(() => {
    state = {
      filters: filtersAdapter.addAll(
        [
          createFiltersEntity('PRODUCT-AAA'),
          createFiltersEntity('PRODUCT-BBB'),
          createFiltersEntity('PRODUCT-CCC'),
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

  describe('Filters Selectors', () => {
    it('getAllFilters() should return the list of Filters', () => {
      const results = FiltersSelectors.getAllFilters(state);
      const selId = getFiltersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = FiltersSelectors.getSelected(state);
      const selId = getFiltersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getFiltersLoaded() should return the current 'loaded' status", () => {
      const result = FiltersSelectors.getFiltersLoaded(state);

      expect(result).toBe(true);
    });

    it("getFiltersError() should return the current 'error' state", () => {
      const result = FiltersSelectors.getFiltersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
