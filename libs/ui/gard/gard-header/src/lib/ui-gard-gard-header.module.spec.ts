import { async, TestBed } from '@angular/core/testing';
import { UiGardGardHeaderModule } from './ui-gard-gard-header.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('UiGardGardHeaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UiGardGardHeaderModule,
        CustomMaterialModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardGardHeaderModule).toBeDefined();
  });
});
