import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDiseases from './diseases.reducer';
import * as DiseasesSelectors from './diseases.selectors';

@Injectable()
export class DiseasesFacade {
  // boolean if values are loaded
  loaded$ = this.store.pipe(select(DiseasesSelectors.getDiseasesLoaded));

  allDiseases$ = this.store.pipe(select(DiseasesSelectors.getAllDiseases));
  selectedDiseases$ = this.store.pipe(select(DiseasesSelectors.getSelected));
  searchDiseases$ = this.store.pipe(select(DiseasesSelectors.searchDiseasesEntities));
/*
  searchDiseases$ = this.store.pipe(select(DiseasesSelectors.search));
*/

  constructor(private store: Store<fromDiseases.DiseasesPartialState>) {
    console.log("create diseases facade");
  }
  dispatch(action: Action) {
    console.log(action);
    this.store.dispatch(action);
  }
}
