import { async, TestBed } from '@angular/core/testing';
import { UiGardDataDisplayModule } from './ui-gard-data-display.module';

describe('UiGardDataDisplayModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGardDataDisplayModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardDataDisplayModule).toBeDefined();
  });
});
