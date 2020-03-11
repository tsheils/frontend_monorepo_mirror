import { async, TestBed } from '@angular/core/testing';
import { UiGardCurationSidepanelModule } from './ui-gard-curation-sidepanel.module';

describe('UiGardCurationSidepanelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGardCurationSidepanelModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardCurationSidepanelModule).toBeDefined();
  });
});
