import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GardSearchComponent} from './gard-search.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HighlightPipe} from "./highlight.pipe";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {StoreModule} from "@ngrx/store";

describe('GardSearchComponent', () => {
  let component: GardSearchComponent;
  let fixture: ComponentFixture<GardSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        HighlightPipe,
        GardSearchComponent
      ],
      providers: [
        DiseasesFacade
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
