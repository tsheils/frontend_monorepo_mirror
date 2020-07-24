import { TestBed } from '@angular/core/testing';

import { NodeService } from './node.service';

describe('NodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NodeService
    ]
  }));

  it('should be created', () => {
    const service: NodeService = TestBed.get(NodeService);
    expect(service).toBeTruthy();
  });
});
