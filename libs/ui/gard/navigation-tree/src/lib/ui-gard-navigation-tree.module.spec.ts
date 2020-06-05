import { async, TestBed } from '@angular/core/testing';
import { UiGardNavigationTreeModule } from './ui-gard-navigation-tree.module';

describe('UiGardNavigationTreeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGardNavigationTreeModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardNavigationTreeModule).toBeDefined();
  });
});
