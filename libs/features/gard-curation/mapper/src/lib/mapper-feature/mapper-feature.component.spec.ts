import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperFeatureComponent } from './mapper-feature.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedUiMapperUiModule} from "@ncats-frontend-library/shared/ui/mapper-ui";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {SharedUiObjectTreeModule} from "@ncats-frontend-library/shared/ui/object-tree";
import {RouterTestingModule} from "@angular/router/testing";

describe('MapperFeatureComponent', () => {
  let component: MapperFeatureComponent;
  let fixture: ComponentFixture<MapperFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedUiObjectTreeModule,
        SharedUiMapperUiModule,
        SharedUiSearchBarModule
      ],
      declarations: [ MapperFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapperFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
