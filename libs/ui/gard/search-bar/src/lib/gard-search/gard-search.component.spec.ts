import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardSearchComponent } from './gard-search.component';

describe('GardSearchComponent', () => {
  let component: GardSearchComponent;
  let fixture: ComponentFixture<GardSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
