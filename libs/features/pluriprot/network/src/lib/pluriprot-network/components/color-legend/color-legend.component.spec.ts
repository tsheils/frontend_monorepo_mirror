import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorLegendComponent } from './color-legend.component';

describe('D3ColorLegendComponent', () => {
  let component: ColorLegendComponent;
  let fixture: ComponentFixture<ColorLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
