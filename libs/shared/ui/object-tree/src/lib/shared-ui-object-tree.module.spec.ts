import { async, TestBed } from '@angular/core/testing';
import { SharedUiObjectTreeModule } from './shared-ui-object-tree.module';

describe('SharedUiObjectTreeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiObjectTreeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiObjectTreeModule).toBeDefined();
  });
});
