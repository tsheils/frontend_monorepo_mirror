import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidepanelComponent } from './dashboard-sidepanel.component';

describe('DashboardSidepanelComponent', () => {
  let component: DashboardSidepanelComponent;
  let fixture: ComponentFixture<DashboardSidepanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSidepanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
