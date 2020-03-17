import { async, TestBed } from '@angular/core/testing';
import { FeaturesGardCurationMapperModule } from './features-gard-curation-mapper.module';

describe('FeaturesGardCurationMapperModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesGardCurationMapperModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeaturesGardCurationMapperModule).toBeDefined();
  });
});
