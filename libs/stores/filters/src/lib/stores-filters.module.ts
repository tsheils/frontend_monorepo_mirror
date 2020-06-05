import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFilters from './+state/filters/filters.reducer';
import { FiltersEffects } from './+state/filters/filters.effects';
import { FiltersFacade } from './+state/filters/filters.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromFilters.FILTERS_FEATURE_KEY,
      fromFilters.reducer
    ),
    EffectsModule.forFeature([FiltersEffects]),
  ],
  providers: [FiltersFacade],
})
export class StoresFiltersModule {}
