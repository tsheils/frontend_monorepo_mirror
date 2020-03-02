import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardHeaderComponent } from './gard-header.component';

describe('GardHeaderComponent', () => {
  let component: GardHeaderComponent;
  let fixture: ComponentFixture<GardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
