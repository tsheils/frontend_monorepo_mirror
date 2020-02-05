import { TestBed } from '@angular/core/testing';

import { Neo4jGraphqlService } from './neo4j-graphql.service';

describe('Neo4jGraphqlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Neo4jGraphqlService = TestBed.get(Neo4jGraphqlService);
    expect(service).toBeTruthy();
  });
});
