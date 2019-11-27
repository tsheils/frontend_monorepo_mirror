import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {NcatsFirebaseAuthModule} from "@ncats-frontend-library/ncats-firebase-auth-module";
import {environment} from "../environments/environment.prod";
import {RouterModule} from "@angular/router";
import {DynamicAppModule} from "@ncats-frontend-library/dynamic-app";
import {BrowserModule} from "@angular/platform-browser";
import {IdgTdlIndicatorModule} from "@ncats-frontend-library/idg-tdl-indicator";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {FIRESTORESTUB} from "../../../../test/firestore-stub";
import {COMMON_CONFIG} from "../../../../test/test-config";
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {MatDialogModule} from "@angular/material";
import {FacetSidepanelModule} from "@ncats-frontend-library/facet-sidepanel";

describe('AppComponent', () => {
  beforeEach(async(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => { return { matches: true } })
    });
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        NcatsFirebaseAuthModule,
        IdgTdlIndicatorModule,
        DynamicAppModule,
        NcatsMaterialModule,
        MatDialogModule,
        FacetSidepanelModule,
      AngularFireModule.initializeApp(COMMON_CONFIG),
    ],
      providers: [
      { provide: AngularFirestore, useValue: FIRESTORESTUB },
      AngularFireAuth
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ncats-frontend-demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ncats-frontend-demo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to ncats-frontend-demo!'
    );
  });
});
