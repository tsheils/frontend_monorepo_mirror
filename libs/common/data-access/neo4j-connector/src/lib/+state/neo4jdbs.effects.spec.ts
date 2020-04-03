import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Neo4jdbsEffects } from './neo4jdbs.effects';
import * as Neo4jdbsActions from './neo4jdbs.actions';

describe('Neo4jdbsEffects', () => {
  let actions: Observable<any>;
  let effects: Neo4jdbsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        Neo4jdbsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(Neo4jdbsEffects);
  });

  describe('loadNeo4jdbs$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: Neo4jdbsActions.loadNeo4jdbs({config: {
            name: 'ffff',
            bolt: ' sdfsfs',
            user: 'neo4j',
            password: 'sgsdgsgsg'
          }
        })
      });

      const expected = hot('-a-|', {
        a: Neo4jdbsActions.loadNeo4jdbsSuccess({ neo4jdbs: [] }),
      });

      expect(effects.loadNeo4jdbs$).toBeObservable(expected);
    });
  });
});
