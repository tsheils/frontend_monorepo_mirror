import { async, TestBed } from '@angular/core/testing';
import { UiGardGardFooterModule } from './ui-gard-gard-footer.module';

describe('UiGardGardFooterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGardGardFooterModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardGardFooterModule).toBeDefined();
  });
});
