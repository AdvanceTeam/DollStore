import { TestBed } from '@angular/core/testing';

import { DollService } from './doll.service';

describe('DollService', () => {
  let service: DollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
