import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardDataDisplayComponent } from './gard-data-display.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('PropertyDisplayComponent', () => {
  let component: GardDataDisplayComponent;
  let fixture: ComponentFixture<GardDataDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GardDataDisplayComponent
      ],
      imports: [
        CustomMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [

      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
