import { TestBed } from '@angular/core/testing';

import { StripePremiumStatusService } from './stripe-premium-status.service';

describe('StripePremiumStatusService', () => {
  let service: StripePremiumStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripePremiumStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
