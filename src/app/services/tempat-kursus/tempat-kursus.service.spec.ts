import { TestBed } from '@angular/core/testing';

import { TempatKursusService } from './tempat-kursus.service';

describe('TempatKursusService', () => {
  let service: TempatKursusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempatKursusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
