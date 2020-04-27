import {async, TestBed} from '@angular/core/testing';
import {FeaturesGardCurationDashboardModule} from './features-gard-curation-dashboard.module';
import {RouterModule} from "@angular/router";

describe('FeaturesGardCurationDashboardModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        FeaturesGardCurationDashboardModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeaturesGardCurationDashboardModule).toBeDefined();
  });
});
