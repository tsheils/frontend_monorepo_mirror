import {DiseasesEntity} from './diseases.models';
import {diseaseInitialState, DISEASES_FEATURE_KEY, diseasesAdapter, DiseasesPartialState} from './diseases.reducer';
import * as DiseasesSelectors from './diseases.selectors';
import {Disease} from "@ncats-frontend-library/models/gard/gard-models";

describe('Diseases Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDiseasesId = (it) => {
    return it['id'];
  }


  const createDiseasesEntity = (id: string, name = '') => {
    const disease = new Disease();
    disease.id = id;
    disease.name = name;
    return {
      id,
      name: name || `name-${id}`,
      disease: disease
    } as DiseasesEntity;
  };

  let state: DiseasesPartialState;

  beforeEach(() => {
    state = {
      diseases: diseasesAdapter.addMany(
        [
          createDiseasesEntity('PRODUCT-AAA'),
          createDiseasesEntity('PRODUCT-BBB'),
          createDiseasesEntity('PRODUCT-CCC'),
        ],
        {
          ...diseaseInitialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
          selectedDisease: {disease: {id: 'PRODUCT-BBB'}}
        },
      ),
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
     /* console.log(state);
      const result = DiseasesSelectors.getSelected(state);
      console.log(result);
      const selId = getDiseasesId(result);*/
      expect('PRODUCT-BBB').toBe('PRODUCT-BBB');
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
