import { async, TestBed } from '@angular/core/testing';
import { NcatsFormModule } from './ncats-form.module';

describe('NcatsFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NcatsFormModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NcatsFormModule).toBeDefined();
  });
});
