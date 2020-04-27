import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperInterfaceComponent } from './mapper-interface.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {HighlightPipe} from "./highlight.pipe";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('MapperInterfaceComponent', () => {
  let component: MapperInterfaceComponent;
  let fixture: ComponentFixture<MapperInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [
        HighlightPipe,
        MapperInterfaceComponent ]
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
