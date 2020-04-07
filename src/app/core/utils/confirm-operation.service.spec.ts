import { TestBed } from '@angular/core/testing';

import { ConfirmOperationService } from './confirm-operation.service';

describe('ConfirmOperationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmOperationService = TestBed.get(ConfirmOperationService);
    expect(service).toBeTruthy();
  });
});
