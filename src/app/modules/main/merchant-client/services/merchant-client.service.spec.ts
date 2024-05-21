import { TestBed } from '@angular/core/testing';

import { MerchantClientService } from './merchant-client.service';

describe('MerchantClientService', () => {
  let service: MerchantClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
