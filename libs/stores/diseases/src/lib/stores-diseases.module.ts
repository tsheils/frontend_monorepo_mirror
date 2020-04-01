import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDiseases from './+state/diseases/diseases.reducer';
import { DiseasesEffects } from './+state/diseases/diseases.effects';
import { DiseasesFacade } from './+state/diseases/diseases.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDiseases.DISEASES_FEATURE_KEY,
      fromDiseases.reducer
    ),
    EffectsModule.forFeature([DiseasesEffects]),
  ],
  providers: [DiseasesFacade],
})
export class StoresDiseasesModule {
  constructor() {
    console.log("stores module");
    console.log(StoresDiseasesModule);
  }
}
