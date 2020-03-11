import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NcatsAutocompleteComponent} from "./ncats-autocomplete.component";


describe('NcatsAutocompleteComponent', () => {
  let component: NcatsAutocompleteComponent;
  let fixture: ComponentFixture<NcatsAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
