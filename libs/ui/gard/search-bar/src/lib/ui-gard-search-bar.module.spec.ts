import { async, TestBed } from '@angular/core/testing';
import { UiGardSearchBarModule } from './ui-gard-search-bar.module';

describe('UiGardSearchBarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGardSearchBarModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardSearchBarModule).toBeDefined();
  });
});
