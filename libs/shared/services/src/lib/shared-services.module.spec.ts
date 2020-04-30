import { async, TestBed } from '@angular/core/testing';
import { SharedServicesModule } from './shared-services.module';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SharedServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedServicesModule,
        HttpClientTestingModule
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedServicesModule).toBeDefined();
  });
});
