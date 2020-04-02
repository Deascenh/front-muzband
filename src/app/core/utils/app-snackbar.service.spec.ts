import { TestBed } from '@angular/core/testing';

import { AppSnackbarService } from './app-snackbar.service';

describe('AppSnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppSnackbarService = TestBed.get(AppSnackbarService);
    expect(service).toBeTruthy();
  });
});
