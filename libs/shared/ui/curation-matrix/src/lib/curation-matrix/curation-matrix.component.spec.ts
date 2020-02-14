import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurationMatrixComponent } from './curation-matrix.component';

describe('CurationMatrixComponent', () => {
  let component: CurationMatrixComponent;
  let fixture: ComponentFixture<CurationMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurationMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurationMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
