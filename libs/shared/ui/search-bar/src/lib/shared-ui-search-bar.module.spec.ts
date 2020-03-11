import { async, TestBed } from '@angular/core/testing';
import { SharedUiSearchBarModule } from './shared-ui-search-bar.module';

describe('SharedUiSearchBarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiSearchBarModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiSearchBarModule).toBeDefined();
  });
});
