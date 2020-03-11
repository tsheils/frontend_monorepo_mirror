import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperInterfaceComponent } from './mapper-interface.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('MapperInterfaceComponent', () => {
  let component: MapperInterfaceComponent;
  let fixture: ComponentFixture<MapperInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule
      ],
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
