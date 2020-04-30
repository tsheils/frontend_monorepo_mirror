import { async, TestBed } from '@angular/core/testing';
import { StoreRouterModule } from './stores-store-router.module';

describe('StoreRouterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreRouterModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreRouterModule).toBeDefined();
  });
});
