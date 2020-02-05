import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsTextboxComponent } from './ncats-textbox.component';

describe('NcatsTextboxComponent', () => {
  let component: NcatsTextboxComponent;
  let fixture: ComponentFixture<NcatsTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
