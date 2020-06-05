import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { FiltersEntity } from './filters.models';
import { FiltersEffects } from './filters.effects';
import { FiltersFacade } from './filters.facade';

import * as FiltersSelectors from './filters.selectors';
import * as FiltersActions from './filters.actions';
import {
  FILTERS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './filters.reducer';

interface TestSchema {
  filters: State;
}

describe('FiltersFacade', () => {
  let facade: FiltersFacade;
  let store: Store<TestSchema>;
  const createFiltersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FiltersEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FILTERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([FiltersEffects]),
        ],
        providers: [FiltersFacade],
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
      facade = TestBed.get(FiltersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allFilters$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(FiltersActions.loadFilters());

        list = await readFirst(facade.allFilters$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadFiltersSuccess` to manually update list
     */
    it('allFilters$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allFilters$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          FiltersActions.loadFiltersSuccess({
            filters: [createFiltersEntity('AAA'), createFiltersEntity('BBB')],
          })
        );

        list = await readFirst(facade.allFilters$);
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
