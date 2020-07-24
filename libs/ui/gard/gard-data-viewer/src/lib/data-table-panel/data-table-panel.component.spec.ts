import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablePanelComponent } from './data-table-panel.component';

describe('DataTablePanelComponent', () => {
  let component: DataTablePanelComponent;
  let fixture: ComponentFixture<DataTablePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTablePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
