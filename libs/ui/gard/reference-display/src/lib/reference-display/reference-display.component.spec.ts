import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDisplayComponent } from './reference-display.component';

describe('ReferenceDisplayComponent', () => {
  let component: ReferenceDisplayComponent;
  let fixture: ComponentFixture<ReferenceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
