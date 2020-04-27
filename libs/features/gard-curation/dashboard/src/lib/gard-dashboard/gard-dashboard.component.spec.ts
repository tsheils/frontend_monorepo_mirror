import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GardDashboardComponent} from './gard-dashboard.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {UiGardGardDiseaseListModule} from "@ncats-frontend-library/ui/gard/gard-disease-list";
import {DiseasesFacade, StoresDiseasesModule} from "@ncats-frontend-library/stores/diseases";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {StoreModule} from "@ngrx/store";

describe('GardDashboardComponent', () => {
  let store: MockStore;
  const initialState = { loggedIn: false };
  let component: GardDashboardComponent;
  let fixture: ComponentFixture<GardDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        UiGardGardDiseaseListModule,
        StoreModule.forRoot({})
      ],
      providers: [
        DiseasesFacade,
        provideMockStore({ initialState }),
      ],
      declarations: [ GardDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardDashboardComponent);
    component = fixture.componentInstance;
    component.dataSource = {};
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
