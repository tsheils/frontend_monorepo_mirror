import { async, TestBed } from '@angular/core/testing';
import { SharedUiSelectedFiltersModule } from './shared-ui-selected-filters.module';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

describe('SharedUiSelectedFiltersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedUiSelectedFiltersModule,
        CustomMaterialModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiSelectedFiltersModule).toBeDefined();
  });
});
