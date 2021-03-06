import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurationMatrixComponent } from './curation-matrix.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";

describe('CurationMatrixComponent', () => {
  let component: CurationMatrixComponent;
  let fixture: ComponentFixture<CurationMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ CurationMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurationMatrixComponent);
    component = fixture.componentInstance;
    component.data = {inheritance: []};
    component.field = "inheritance";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
