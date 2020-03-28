import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DiseasesEffects } from './diseases.effects';
import * as DiseasesActions from './diseases.actions';

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
        provideMockStore()
      ]
    });

    effects = TestBed.get(DiseasesEffects);
  });

  describe('loadDiseases$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DiseasesActions.loadDiseases() });

      const expected = hot('-a-|', {
        a: DiseasesActions.loadDiseasesSuccess({ diseases: [] })
      });

      expect(effects.loadDiseases$).toBeObservable(expected);
    });
  });
});
