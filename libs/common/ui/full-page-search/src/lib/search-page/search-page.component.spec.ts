import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule
      ],
      declarations: [ SearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
