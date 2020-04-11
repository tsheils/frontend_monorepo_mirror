import { async, TestBed } from '@angular/core/testing';
import { UiGardGardDiseaseHeaderModule } from './ui-gard-gard-disease-header.module';

describe('UiGardGardDiseaseHeaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGardGardDiseaseHeaderModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardGardDiseaseHeaderModule).toBeDefined();
  });
});
