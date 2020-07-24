import { async, TestBed } from '@angular/core/testing';
import { ModelsGardGardModelsModule } from './models-gard-gard-models.module';

describe('ModelsGardGardModelsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsGardGardModelsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsGardGardModelsModule).toBeDefined();
  });
});
