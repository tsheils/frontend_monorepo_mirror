import { TestBed } from '@angular/core/testing';

import { Neo4jConnectService } from './neo4j-connect.service';

describe('Neo4jConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Neo4jConnectService = TestBed.get(Neo4jConnectService);
    expect(service).toBeTruthy();
  });
});
