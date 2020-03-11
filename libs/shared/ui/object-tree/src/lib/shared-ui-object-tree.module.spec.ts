import { async, TestBed } from '@angular/core/testing';
import { SharedUiObjectTreeModule } from './shared-ui-object-tree.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('SharedUiObjectTreeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedUiObjectTreeModule,
        CustomMaterialModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiObjectTreeModule).toBeDefined();
  });
});
