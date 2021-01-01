import { TestBed } from '@angular/core/testing';

import { InMemContactService } from './in-mem-contact.service';

describe('InMemContactService', () => {
  let service: InMemContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
