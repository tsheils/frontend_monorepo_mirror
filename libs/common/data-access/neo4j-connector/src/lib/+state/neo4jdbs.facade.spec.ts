import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { Neo4jdbsEntity } from './neo4jdbs.models';
import { Neo4jdbsEffects } from './neo4jdbs.effects';
import { Neo4jdbsFacade } from './neo4jdbs.facade';

import * as Neo4jdbsSelectors from './neo4jdbs.selectors';
import * as Neo4jdbsActions from './neo4jdbs.actions';
import {
  NEO4JDBS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './neo4jdbs.reducer';

interface TestSchema {
  neo4jdbs: State;
}

describe('Neo4jdbsFacade', () => {
  let facade: Neo4jdbsFacade;
  let store: Store<TestSchema>;
  const createNeo4jdbsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Neo4jdbsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(NEO4JDBS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([Neo4jdbsEffects]),
        ],
        providers: [Neo4jdbsFacade],
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
      facade = TestBed.get(Neo4jdbsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allNeo4jdbs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(Neo4jdbsActions.loadNeo4jdbs());

        list = await readFirst(facade.allNeo4jdbs$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadNeo4jdbsSuccess` to manually update list
     */
    it('allNeo4jdbs$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allNeo4jdbs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          Neo4jdbsActions.loadNeo4jdbsSuccess({
            neo4jdbs: [
              createNeo4jdbsEntity('AAA'),
              createNeo4jdbsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allNeo4jdbs$);
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
