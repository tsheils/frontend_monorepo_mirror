import { TestBed } from '@angular/core/testing';

import { Neo4jSessionService } from './neo4j-session.service';

describe('Neo4jSessionService', () => {
  let service: Neo4jSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Neo4jSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
