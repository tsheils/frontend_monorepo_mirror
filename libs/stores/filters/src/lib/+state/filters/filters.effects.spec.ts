import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { FiltersEffects } from './filters.effects';
import * as FiltersActions from './filters.actions';

describe('FiltersEffects', () => {
  let actions: Observable<any>;
  let effects: FiltersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FiltersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(FiltersEffects);
  });

  describe('loadFilters$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FiltersActions.loadFilters() });

      const expected = hot('-a-|', {
        a: FiltersActions.loadFiltersSuccess({ filters: [] }),
      });

      expect(effects.loadFilters$).toBeObservable(expected);
    });
  });
});
