import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperInterfaceComponent } from './mapper-interface.component';

describe('MapperInterfaceComponent', () => {
  let component: MapperInterfaceComponent;
  let fixture: ComponentFixture<MapperInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapperInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapperInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
