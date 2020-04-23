import { async, TestBed } from '@angular/core/testing';
import { StoresStoreRouterModule } from './stores-store-router.module';

describe('StoresStoreRouterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoresStoreRouterModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoresStoreRouterModule).toBeDefined();
  });
});
