import { async, TestBed } from '@angular/core/testing';
import { SharedUiCurationMatrixModule } from './shared-ui-curation-matrix.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('SharedUiCurationMatrixModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        SharedUiCurationMatrixModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiCurationMatrixModule).toBeDefined();
  });
});
