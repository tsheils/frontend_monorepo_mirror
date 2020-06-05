import { FiltersEntity } from './filters.models';
import * as FiltersActions from './filters.actions';
import { State, initialState, reducer } from './filters.reducer';

describe('Filters Reducer', () => {
  const createFiltersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FiltersEntity);

  beforeEach(() => {});

  describe('valid Filters actions', () => {
    it('loadFiltersSuccess should return set the list of known Filters', () => {
      const filters = [
        createFiltersEntity('PRODUCT-AAA'),
        createFiltersEntity('PRODUCT-zzz'),
      ];
      const action = FiltersActions.loadFiltersSuccess({ filters });

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
