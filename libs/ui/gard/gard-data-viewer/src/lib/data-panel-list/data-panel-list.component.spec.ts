import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPanelListComponent } from './data-panel-list.component';

describe('DataPanelListComponent', () => {
  let component: DataPanelListComponent;
  let fixture: ComponentFixture<DataPanelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPanelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPanelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
