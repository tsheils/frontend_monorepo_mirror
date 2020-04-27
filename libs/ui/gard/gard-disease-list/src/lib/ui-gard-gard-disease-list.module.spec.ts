import { async, TestBed } from '@angular/core/testing';
import { UiGardGardDiseaseListModule } from './ui-gard-gard-disease-list.module';

describe('UiGardGardDiseaseListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGardGardDiseaseListModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardGardDiseaseListModule).toBeDefined();
  });
});
