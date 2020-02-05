import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsFileComponent } from './ncats-file.component';

describe('NcatsFileComponent', () => {
  let component: NcatsFileComponent;
  let fixture: ComponentFixture<NcatsFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
