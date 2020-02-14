import { async, TestBed } from '@angular/core/testing';
import { SharedUiCurationMatrixModule } from './shared-ui-curation-matrix.module';

describe('SharedUiCurationMatrixModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiCurationMatrixModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiCurationMatrixModule).toBeDefined();
  });
});
