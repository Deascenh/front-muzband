import { TestBed } from '@angular/core/testing';

import { MusiciansService } from './musicians.service';

describe('MusiciansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusiciansService = TestBed.get(MusiciansService);
    expect(service).toBeTruthy();
  });
});
