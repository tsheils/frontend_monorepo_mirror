import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDiseases from './diseases.reducer';
import * as DiseasesSelectors from './diseases.selectors';

@Injectable()
export class DiseasesFacade {
  loaded$ = this.store.pipe(select(DiseasesSelectors.getDiseasesLoaded));
  allDiseases$ = this.store.pipe(select(DiseasesSelectors.getAllDiseases));
  selectedDiseases$ = this.store.pipe(select(DiseasesSelectors.getSelected));

  constructor(private store: Store<fromDiseases.DiseasesPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
