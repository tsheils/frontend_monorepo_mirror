import { async, TestBed } from '@angular/core/testing';
import { DynamicAppModule } from './dynamic-app.module';
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";

describe('DynamicAppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NcatsMaterialModule,
        DynamicAppModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DynamicAppModule).toBeDefined();
  });
});
