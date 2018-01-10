import { TestBed, inject } from '@angular/core/testing';

import { BasketCountService } from './basket-count.service';

describe('BasketCountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasketCountService]
    });
  });

  it('should be created', inject([BasketCountService], (service: BasketCountService) => {
    expect(service).toBeTruthy();
  }));
});
