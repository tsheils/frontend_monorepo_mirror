import { async, TestBed } from '@angular/core/testing';
import { ModelsCoreInterfacesModule } from './models-core-interfaces.module';

describe('ModelsCoreInterfacesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsCoreInterfacesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsCoreInterfacesModule).toBeDefined();
  });
});
