import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromFilters from './filters.reducer';
import * as FiltersSelectors from './filters.selectors';

@Injectable()
export class FiltersFacade {
  loaded$ = this.store.pipe(select(FiltersSelectors.getFiltersLoaded));
  allFilters$ = this.store.pipe(select(FiltersSelectors.getAllFilters));
  selectedFilters$ = this.store.pipe(select(FiltersSelectors.getSelected));

  constructor(private store: Store<fromFilters.FiltersPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
