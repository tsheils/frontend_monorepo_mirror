import { async, TestBed } from '@angular/core/testing';
import { ModelsCoreCoreModelsModule } from './models-core-core-models.module';

describe('ModelsCoreCoreModelsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsCoreCoreModelsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsCoreCoreModelsModule).toBeDefined();
  });
});
