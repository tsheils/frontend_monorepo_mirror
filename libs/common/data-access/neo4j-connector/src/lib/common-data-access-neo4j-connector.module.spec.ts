import { async, TestBed } from '@angular/core/testing';
import { CommonDataAccessNeo4jConnectorModule } from './common-data-access-neo4j-connector.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


  describe('CommonDataAccessNeo4jConnectorModule', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          CustomMaterialModule,
          FormsModule,
          ReactiveFormsModule,
        ]
      }).compileComponents();
    }));

  it('should create', () => {
    expect(CommonDataAccessNeo4jConnectorModule).toBeDefined();
  });
});
