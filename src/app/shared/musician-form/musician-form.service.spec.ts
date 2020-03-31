import { TestBed } from '@angular/core/testing';

import { MusicianFormService } from './musician-form.service';

describe('MusicianFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicianFormService = TestBed.get(MusicianFormService);
    expect(service).toBeTruthy();
  });
});
