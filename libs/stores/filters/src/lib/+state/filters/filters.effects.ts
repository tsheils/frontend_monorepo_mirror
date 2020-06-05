import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import {ROUTER_NAVIGATION, RouterNavigationAction} from "@ngrx/router-store";
import * as fromFilters from './filters.reducer';
import * as FiltersActions from './filters.actions';

@Injectable()
export class FiltersEffects {
  loadFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FiltersActions.loadFilters),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FiltersActions.loadFiltersSuccess({ filters: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return FiltersActions.loadFiltersFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
