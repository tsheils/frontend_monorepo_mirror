import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluriprotNetworkComponent } from './pluriprot-network.component';

describe('PluriprotNetworkComponent', () => {
  let component: PluriprotNetworkComponent;
  let fixture: ComponentFixture<PluriprotNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluriprotNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluriprotNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
