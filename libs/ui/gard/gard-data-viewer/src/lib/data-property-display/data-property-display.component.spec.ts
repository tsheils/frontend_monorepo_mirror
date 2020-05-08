import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPropertyDisplayComponent } from './data-property-display.component';

describe('DataRefDisplayComponent', () => {
  let component: DataPropertyDisplayComponent;
  let fixture: ComponentFixture<DataPropertyDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPropertyDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPropertyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
