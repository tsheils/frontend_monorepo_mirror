import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeUiComponent } from './node-ui.component';
import {SGNode} from "../../models/sgnode";

describe('NodeUiComponent', () => {
  let component: NodeUiComponent;
  let fixture: ComponentFixture<NodeUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeUiComponent);
    component = fixture.componentInstance;
    component.node = new SGNode();
    component.label = 'dsfsdf';
    component.node['label'] = 'dsfsdf';
    component.displayName = 'dfgdfgdfg';
    fixture.detectChanges();  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
