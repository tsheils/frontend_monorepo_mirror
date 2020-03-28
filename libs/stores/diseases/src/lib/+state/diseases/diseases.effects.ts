import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromDiseases from './diseases.reducer';
import * as DiseasesActions from './diseases.actions';

@Injectable()
export class DiseasesEffects {
  loadDiseases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiseasesActions.loadDiseases),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiseasesActions.loadDiseasesSuccess({ diseases: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DiseasesActions.loadDiseasesFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
