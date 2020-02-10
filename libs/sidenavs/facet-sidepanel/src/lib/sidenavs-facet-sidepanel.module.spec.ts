import { async, TestBed } from '@angular/core/testing';
import { SidenavsFacetSidepanelModule } from './sidenavs-facet-sidepanel.module';

describe('SidenavsFacetSidepanelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SidenavsFacetSidepanelModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SidenavsFacetSidepanelModule).toBeDefined();
  });
});
