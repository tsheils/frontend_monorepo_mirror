import { async, TestBed } from '@angular/core/testing';
import { CommonDataAccessNeo4jConnectorModule } from './common-data-access-neo4j-connector.module';

describe('CommonDataAccessNeo4jConnectorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonDataAccessNeo4jConnectorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonDataAccessNeo4jConnectorModule).toBeDefined();
  });
});
