import { TestBed } from '@angular/core/testing';

import { OrangTuaService } from './orang-tua.service';

describe('OrangTuaService', () => {
  let service: OrangTuaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrangTuaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
