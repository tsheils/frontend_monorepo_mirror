import { async, TestBed } from '@angular/core/testing';
import { CommonUiNeo4jConnectionFormModule } from './common-ui-neo4j-connection-form.module';

describe('CommonUiNeo4jConnectionFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiNeo4jConnectionFormModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiNeo4jConnectionFormModule).toBeDefined();
  });
});
