import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from "@angular/material/dialog";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {UiGardDataDisplayModule} from "@ncats-frontend-library/ui/gard/data-display";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";

describe('AppComponent', () => {
  beforeEach(async(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({matches: true }))
    });
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CustomMaterialModule,
        MatDialogModule,
        UiGardDataDisplayModule,
        SharedUiNcatsFormModule
      ],
      providers: [
        Neo4jConnectService
      ],
      declarations: [AppComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gard-curation'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('gard-curation');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to gard-curation!'
    );
  });
});
