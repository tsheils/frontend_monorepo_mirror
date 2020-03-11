import { async, TestBed } from '@angular/core/testing';
import { UiGardGardDiseaseHeaderModule } from './ui-gard-gard-disease-header.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('UiGardGardDiseaseHeaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        UiGardGardDiseaseHeaderModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardGardDiseaseHeaderModule).toBeDefined();
  });
});
