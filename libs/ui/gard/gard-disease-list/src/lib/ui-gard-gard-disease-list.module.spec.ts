import {async, TestBed} from '@angular/core/testing';
import {UiGardGardDiseaseListModule} from './ui-gard-gard-disease-list.module';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

describe('UiGardGardDiseaseListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        UiGardGardDiseaseListModule
      ],
      declarations: [
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardGardDiseaseListModule).toBeDefined();
  });
});
