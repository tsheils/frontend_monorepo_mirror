import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromNeo4jdbs from './neo4jdbs.reducer';
import * as Neo4jdbsSelectors from './neo4jdbs.selectors';

@Injectable()
export class Neo4jdbsFacade {
  // store output
  loaded$ = this.store.pipe(select(Neo4jdbsSelectors.getNeo4jdbsLoaded));
  allNeo4jdbs$ = this.store.pipe(select(Neo4jdbsSelectors.getAllNeo4jdbs));
  selectedNeo4jdbs$ = this.store.pipe(select(Neo4jdbsSelectors.getSelected));

  constructor(private store: Store<fromNeo4jdbs.Neo4jdbsPartialState>) {}

  // store input (via actions)
  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
