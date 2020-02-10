import { async, TestBed } from '@angular/core/testing';
import { SidenavsNavigationSidepanelModule } from './sidenavs-navigation-sidepanel.module';

describe('SidenavsNavigationSidepanelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SidenavsNavigationSidepanelModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SidenavsNavigationSidepanelModule).toBeDefined();
  });
});
