import { async, TestBed } from '@angular/core/testing';
import { UiGardGardDataViewerModule } from './ui-gard-gard-data-viewer.module';

describe('UiGardGardDataViewerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGardGardDataViewerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardGardDataViewerModule).toBeDefined();
  });
});
