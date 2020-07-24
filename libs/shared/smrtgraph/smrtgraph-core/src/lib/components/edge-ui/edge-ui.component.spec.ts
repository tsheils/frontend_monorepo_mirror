import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeUiComponent } from './edge-ui.component';
import {SGEdge} from "../../models/sgedge";

describe('EdgeUiComponent', () => {
  let component: EdgeUiComponent;
  let fixture: ComponentFixture<EdgeUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeUiComponent);
    component = fixture.componentInstance;
    component.edge = new SGEdge({x:0, y:0}, {x:0, y:0}, {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
