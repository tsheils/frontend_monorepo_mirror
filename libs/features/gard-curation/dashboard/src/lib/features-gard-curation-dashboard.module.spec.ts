import { async, TestBed } from '@angular/core/testing';
import { FeaturesGardCurationDashboardModule } from './features-gard-curation-dashboard.module';

describe('FeaturesGardCurationDashboardModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesGardCurationDashboardModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeaturesGardCurationDashboardModule).toBeDefined();
  });
});
