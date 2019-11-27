import { async, TestBed } from '@angular/core/testing';
import { NcatsMaterialModule } from './ncats-material-module.module';

describe('NcatsMaterialModuleModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NcatsMaterialModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NcatsMaterialModule).toBeDefined();
  });
});
