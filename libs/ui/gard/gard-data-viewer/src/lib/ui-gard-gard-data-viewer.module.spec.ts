import { async, TestBed } from '@angular/core/testing';
import { UiGardGardDataViewerModule } from './ui-gard-gard-data-viewer.module';
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('UiGardGardDataViewerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        SharedUiCurationMatrixModule,
        UiGardGardDataViewerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardGardDataViewerModule).toBeDefined();
  });
});
