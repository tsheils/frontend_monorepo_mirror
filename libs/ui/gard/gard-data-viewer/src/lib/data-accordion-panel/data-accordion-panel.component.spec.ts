import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAccordianPanelComponent } from './data-accordion-panel.component';

describe('DataAccordianPanelComponent', () => {
  let component: DataAccordianPanelComponent;
  let fixture: ComponentFixture<DataAccordianPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAccordianPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAccordianPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
