import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmrtgraphCoreComponent } from './smrtgraph-core.component';

describe('SmrtgraphCoreComponent', () => {
  let component: SmrtgraphCoreComponent;
  let fixture: ComponentFixture<SmrtgraphCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmrtgraphCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmrtgraphCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
