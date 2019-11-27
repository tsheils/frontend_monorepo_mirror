import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdgTdlIndicatorComponent } from './idg-tdl-indicator.component';

describe('IdgTdlIndicatorComponent', () => {
  let component: IdgTdlIndicatorComponent;
  let fixture: ComponentFixture<IdgTdlIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdgTdlIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdgTdlIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
