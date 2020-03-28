import { TestBed } from '@angular/core/testing';

import { ClockCountdownService } from './clock-countdown.service';

describe('ClockCountdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClockCountdownService = TestBed.get(ClockCountdownService);
    expect(service).toBeTruthy();
  });
});
