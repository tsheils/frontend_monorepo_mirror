import { async, TestBed } from '@angular/core/testing';
import { StoresFiltersModule } from './stores-filters.module';

describe('StoresFiltersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoresFiltersModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoresFiltersModule).toBeDefined();
  });
});
