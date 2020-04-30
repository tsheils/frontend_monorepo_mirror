import {TestBed} from '@angular/core/testing';

import {Observable} from 'rxjs';

import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';

import {DataPersistence, NxModule} from '@nrwl/angular';
import {hot} from '@nrwl/angular/testing';

import {DiseasesEffects} from './diseases.effects';
import * as DiseasesActions from './diseases.actions';
import {Page} from "@ncats-frontend-library/stores/diseases";

const page: Page = {
total: 666,
pageIndex: 1,
pageSize:10
};

describe('DiseasesEffects', () => {
  let actions: Observable<any>;
  let effects: DiseasesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DiseasesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DiseasesEffects);
  });

  describe('loadDiseases$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DiseasesActions.loadDiseases() });

      const expected = hot('-a-|', {
        a: DiseasesActions.loadDiseasesSuccess({ diseases: [], page: page }),
      });

      expect(effects.loadDiseases$).toBeObservable(expected);
    });
  });
});
