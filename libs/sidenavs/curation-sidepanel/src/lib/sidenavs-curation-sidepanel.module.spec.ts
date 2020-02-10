import { async, TestBed } from '@angular/core/testing';
import { SidenavsCurationSidepanelModule } from './sidenavs-curation-sidepanel.module';

describe('SidenavsCurationSidepanelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SidenavsCurationSidepanelModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SidenavsCurationSidepanelModule).toBeDefined();
  });
});
