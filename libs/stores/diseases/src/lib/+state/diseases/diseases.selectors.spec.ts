import { DiseasesEntity } from './diseases.models';
import { State, diseasesAdapter, initialState } from './diseases.reducer';
import * as DiseasesSelectors from './diseases.selectors';

describe('Diseases Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDiseasesId = it => it['id'];
  const createDiseasesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as DiseasesEntity);

  let state;

  beforeEach(() => {
    state = {
      diseases: diseasesAdapter.addAll(
        [
          createDiseasesEntity('PRODUCT-AAA'),
          createDiseasesEntity('PRODUCT-BBB'),
          createDiseasesEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Diseases Selectors', () => {
    it('getAllDiseases() should return the list of Diseases', () => {
      const results = DiseasesSelectors.getAllDiseases(state);
      const selId = getDiseasesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DiseasesSelectors.getSelected(state);
      const selId = getDiseasesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDiseasesLoaded() should return the current 'loaded' status", () => {
      const result = DiseasesSelectors.getDiseasesLoaded(state);

      expect(result).toBe(true);
    });

    it("getDiseasesError() should return the current 'error' state", () => {
      const result = DiseasesSelectors.getDiseasesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
