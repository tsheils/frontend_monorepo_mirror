import { async, TestBed } from '@angular/core/testing';
import { CommonUiFullPageSearchModule } from './common-ui-full-page-search.module';

describe('CommonUiFullPageSearchModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiFullPageSearchModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiFullPageSearchModule).toBeDefined();
  });
});
