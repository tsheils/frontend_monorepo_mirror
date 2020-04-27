import { async, TestBed } from '@angular/core/testing';
import { UiGardDataDisplayModule } from './ui-gard-data-display.module';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

describe('UiGardDataDisplayModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        UiGardDataDisplayModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardDataDisplayModule).toBeDefined();
  });
});
