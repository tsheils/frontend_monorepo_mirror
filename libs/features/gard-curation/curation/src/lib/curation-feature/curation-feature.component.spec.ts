import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {
  CURATION_MAIN_COMPONENT,
  CURATION_SIDEPANEL_COMPONENT,
  CurationFeatureComponent,
  GARD_DISEASE_HEADER_COMPONENT,
  GARD_DISEASE_SEARCH_COMPONENT,
  GARD_FOOTER_COMPONENT
} from './curation-feature.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {
  CurationSidepanelComponent,
  UiGardCurationSidepanelModule
} from "@ncats-frontend-library/ui/gard/curation-sidepanel";
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {UiGardSearchBarModule} from "@ncats-frontend-library/ui/gard/search-bar";
import {SharedUiDynamicAppLayoutModule} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {DiseasesFacade, StoresDiseasesModule} from "@ncats-frontend-library/stores/diseases";
import {StoreModule} from "@ngrx/store";
import {DiseasesEffects} from "../../../../../../stores/diseases/src/lib/+state/diseases/diseases.effects";
import {EffectsModule} from "@ngrx/effects";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

describe('CurationFeatureComponent', () => {
  let component: CurationFeatureComponent;
  let fixture: ComponentFixture<CurationFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        BrowserAnimationsModule,
        SharedUiCurationMatrixModule,
        SharedUiSearchBarModule,
        UiGardSearchBarModule,
        SharedUiDynamicAppLayoutModule,
        StoresDiseasesModule,
        RouterTestingModule,
        UiGardCurationSidepanelModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('feature',{},{}),
        EffectsModule.forRoot([])
      ],
      declarations: [
        CurationFeatureComponent
      ],
      providers: [
        DiseasesEffects,
        DiseasesFacade,
        {provide: CURATION_SIDEPANEL_COMPONENT, useValue: CurationSidepanelComponent},
        {provide: CURATION_MAIN_COMPONENT, useValue: CurationSidepanelComponent},
        {provide: GARD_DISEASE_SEARCH_COMPONENT, useValue: CurationSidepanelComponent},
        {provide: GARD_FOOTER_COMPONENT, useValue: CurationSidepanelComponent},
        {provide: GARD_DISEASE_HEADER_COMPONENT, useValue: CurationSidepanelComponent}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [CurationSidepanelComponent ],
        }
      }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurationFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
