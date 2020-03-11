import { async, TestBed } from '@angular/core/testing';
import { SharedUiMapperUiModule } from './shared-ui-mapper-ui.module';

describe('SharedUiMapperUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiMapperUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiMapperUiModule).toBeDefined();
  });
});
