import { DiseasesEntity } from './diseases.models';
import * as DiseasesActions from './diseases.actions';
import { State, initialState, reducer } from './diseases.reducer';

describe('Diseases Reducer', () => {
  const createDiseasesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as DiseasesEntity);

  beforeEach(() => {});

  describe('valid Diseases actions', () => {
    it('loadDiseasesSuccess should return set the list of known Diseases', () => {
      const diseases = [
        createDiseasesEntity('PRODUCT-AAA'),
        createDiseasesEntity('PRODUCT-zzz')
      ];
      const action = DiseasesActions.loadDiseasesSuccess({ diseases });

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
