import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsDropdownComponent } from './ncats-dropdown.component';

describe('NcatsDropdownComponent', () => {
  let component: NcatsDropdownComponent;
  let fixture: ComponentFixture<NcatsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
