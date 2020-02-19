import { async, TestBed } from '@angular/core/testing';
import { SharedUiDynamicAppSkeletonModule } from './shared-ui-dynamic-app-skeleton.module';

describe('SharedUiDynamicAppSkeletonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiDynamicAppSkeletonModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiDynamicAppSkeletonModule).toBeDefined();
  });
});
