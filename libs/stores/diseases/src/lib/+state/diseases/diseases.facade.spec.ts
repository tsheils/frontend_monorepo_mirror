import {NgModule} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {readFirst} from '@nrwl/angular/testing';

import {EffectsModule} from '@ngrx/effects';
import {Store, StoreModule} from '@ngrx/store';

import {NxModule} from '@nrwl/angular';

import {DiseasesEntity, Page} from './diseases.models';
import {DiseasesEffects} from './diseases.effects';
import {DiseasesFacade} from './diseases.facade';
import * as DiseasesActions from './diseases.actions';
import {DISEASES_FEATURE_KEY, reducer, State,} from './diseases.reducer';
import {Disease} from "@ncats-frontend-library/models/gard/gard-models";

const page: Page = {
  total: 666,
  pageIndex: 1,
  pageSize:10
};

interface TestSchema {
  diseases: State;
}

describe('DiseasesFacade', () => {
  let facade: DiseasesFacade;
  let store: Store<TestSchema>;
  const createDiseasesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      disease: {} as Disease
    } as DiseasesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DISEASES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([DiseasesEffects]),
        ],
        providers: [DiseasesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(DiseasesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDiseases$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(DiseasesActions.loadDiseases());

        list = await readFirst(facade.allDiseases$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDiseasesSuccess` to manually update list
     */
    it('allDiseases$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDiseases$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          DiseasesActions.loadDiseasesSuccess({
            diseases: [
              createDiseasesEntity('AAA'),
              createDiseasesEntity('BBB'),
            ],
            page: page
          })
        );

        list = await readFirst(facade.allDiseases$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
