import { async, TestBed } from '@angular/core/testing';
import { FacetSidepanelModule } from './facet-sidepanel.module';

describe('FacetSidepanelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FacetSidepanelModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FacetSidepanelModule).toBeDefined();
  });
});
