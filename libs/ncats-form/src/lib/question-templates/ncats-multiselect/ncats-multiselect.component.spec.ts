import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsMultiselectComponent } from './ncats-multiselect.component';

describe('NcatsMultiselectComponent', () => {
  let component: NcatsMultiselectComponent;
  let fixture: ComponentFixture<NcatsMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
