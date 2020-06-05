import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTreePanelComponent } from './data-tree-panel.component';

describe('DataTreePanelComponent', () => {
  let component: DataTreePanelComponent;
  let fixture: ComponentFixture<DataTreePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTreePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTreePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
