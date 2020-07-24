import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XyplotComponent } from './xyplot.component';

describe('XyplotComponent', () => {
  let component: XyplotComponent;
  let fixture: ComponentFixture<XyplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XyplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XyplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
