import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFiltersComponent } from './selected-filters.component';

describe('SelectedFiltersComponent', () => {
  let component: SelectedFiltersComponent;
  let fixture: ComponentFixture<SelectedFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
