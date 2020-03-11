import { async, TestBed } from '@angular/core/testing';
import { SharedUiNcatsFormModule } from './shared-ui-ncats-form.module';

describe('SharedUiNcatsFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedUiNcatsFormModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiNcatsFormModule).toBeDefined();
  });
});
