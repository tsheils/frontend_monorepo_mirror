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
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiseasesActions.loadDiseasesSuccess({ diseases: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DiseasesActions.loadDiseasesFailure({ error });
        },
      })
    )
  );

searchDiseases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiseasesActions.searchDiseases),
      fetch({
        run: (action) => {
          console.log(action);
          const call = `
            CALL db.index.fulltext.queryNodes("namesAndSynonyms", "name:${action.query} OR ${action.query}") YIELD node
            RETURN node LIMIT 10;
        `;
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiseasesActions.searchDiseasesSuccess({ diseases: [
            {
              id: 666,
            name: 'sdfsdfs'
            },
              {id: 111,
                name:'sfsdfsfs'}
                ] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DiseasesActions.searchDiseasesFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {
    console.log("create disease erffects");
  }}
