import { TestBed } from '@angular/core/testing';

import { ReOrderParagaphService } from './re-order-paragaph.service';

describe('ReOrderParagaphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReOrderParagaphService = TestBed.get(ReOrderParagaphService);
    expect(service).toBeTruthy();
  });
});
