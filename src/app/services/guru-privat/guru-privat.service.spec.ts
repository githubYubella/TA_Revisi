import { TestBed } from '@angular/core/testing';

import { GuruPrivatService } from './guru-privat.service';

describe('GuruPrivatService', () => {
  let service: GuruPrivatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuruPrivatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
