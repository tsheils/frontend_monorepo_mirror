import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurationSidepanelComponent } from './curation-sidepanel.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('CurationSidepanelComponent', () => {
  let component: CurationSidepanelComponent;
  let fixture: ComponentFixture<CurationSidepanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule
      ],
      declarations: [ CurationSidepanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurationSidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
