import { TestBed } from '@angular/core/testing';

import { CytoscapeLoaderService } from './cytoscape-loader.service';

describe('CytoscapeLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CytoscapeLoaderService = TestBed.get(CytoscapeLoaderService);
    expect(service).toBeTruthy();
  });
});
