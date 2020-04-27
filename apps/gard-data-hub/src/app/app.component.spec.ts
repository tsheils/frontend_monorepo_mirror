import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {MatDialogModule} from "@angular/material/dialog";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {StoreModule} from "@ngrx/store";
import {environment} from "../environments/environment";

describe('AppComponent', () => {
  beforeEach(async(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({matches: true }))
    });
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CustomMaterialModule,
        MatDialogModule,
        SharedUiNcatsFormModule,
        StoreModule.forRoot({},
          {
            metaReducers: !environment.production ? [] : [],
            runtimeChecks: {
              strictActionImmutability: true,
              strictStateImmutability: true
            }
          })
      ],
      declarations: [AppComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        DiseasesFacade
      ]

    }).compileComponents();
  }));


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gard-data-hub'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gard-data-hub');
  });
});
