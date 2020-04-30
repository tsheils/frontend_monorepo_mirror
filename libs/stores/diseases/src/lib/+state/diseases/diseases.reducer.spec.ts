import {DiseasesEntity, Page} from './diseases.models';
import * as DiseasesActions from './diseases.actions';
import { State, diseaseInitialState, reducer } from './diseases.reducer';

const page: Page = {
  total: 666,
  pageIndex: 1,
  pageSize:10
};

describe('Diseases Reducer', () => {
  const createDiseasesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DiseasesEntity);

  beforeEach(() => {});

  describe('valid Diseases actions', () => {
    it('loadDiseasesSuccess should return set the list of known Diseases', () => {
      const diseases = [
        createDiseasesEntity('PRODUCT-AAA'),
        createDiseasesEntity('PRODUCT-zzz'),
      ];
      const action = DiseasesActions.loadDiseasesSuccess({ diseases, page });

      const result: State = reducer(diseaseInitialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(diseaseInitialState, action);

      expect(result).toBe(diseaseInitialState);
    });
  });
});
