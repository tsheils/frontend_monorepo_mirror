import { async, TestBed } from '@angular/core/testing';
import { CommonUiNeo4jConnectionFormModule } from './common-ui-neo4j-connection-form.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CommonUiNeo4jConnectionFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonUiNeo4jConnectionFormModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiNeo4jConnectionFormModule).toBeDefined();
  });
});
