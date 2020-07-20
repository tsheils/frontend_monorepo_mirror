import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluriprotFilterMenuComponent } from './pluriprot-filter-menu.component';

describe('PluriprotFilterMenuComponent', () => {
  let component: PluriprotFilterMenuComponent;
  let fixture: ComponentFixture<PluriprotFilterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluriprotFilterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluriprotFilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
