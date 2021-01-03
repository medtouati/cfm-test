import { TestBed } from '@angular/core/testing';

import { InMemAdresseService } from './in-mem-adresse.service';

describe('InMemAdresseService', () => {
  let service: InMemAdresseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemAdresseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
