import { async, TestBed } from '@angular/core/testing';
import { NcatsFirebaseAuthModule } from './ncats-firebase-auth-module.module';

describe('NcatsFirebaseAuthModuleModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NcatsFirebaseAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NcatsFirebaseAuthModule).toBeDefined();
  });
});
