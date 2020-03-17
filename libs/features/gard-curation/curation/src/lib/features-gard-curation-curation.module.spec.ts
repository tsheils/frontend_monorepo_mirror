import { async, TestBed } from '@angular/core/testing';
import { FeaturesGardCurationCurationModule } from './features-gard-curation-curation.module';

describe('FeaturesGardCurationCurationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesGardCurationCurationModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeaturesGardCurationCurationModule).toBeDefined();
  });
});
