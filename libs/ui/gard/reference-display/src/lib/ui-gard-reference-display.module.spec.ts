import { async, TestBed } from '@angular/core/testing';
import { UiGardReferenceDisplayModule } from './ui-gard-reference-display.module';

describe('UiGardReferenceDisplayModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGardReferenceDisplayModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardReferenceDisplayModule).toBeDefined();
  });
});
