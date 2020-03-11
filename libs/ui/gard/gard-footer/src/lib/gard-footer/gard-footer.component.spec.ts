import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardFooterComponent } from './gard-footer.component';

describe('GardFooterComponent', () => {
  let component: GardFooterComponent;
  let fixture: ComponentFixture<GardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
