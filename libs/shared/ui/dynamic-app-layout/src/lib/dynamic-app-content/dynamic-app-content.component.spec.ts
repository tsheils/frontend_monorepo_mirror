import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAppContentComponent } from './dynamic-app-content.component';

describe('DynamicAppContentComponent', () => {
  let component: DynamicAppContentComponent;
  let fixture: ComponentFixture<DynamicAppContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicAppContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAppContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
