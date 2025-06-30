import { TestBed } from '@angular/core/testing';

import { AngularLib1Service } from './angular-lib-1.service';

describe('AngularLib1Service', () => {
  let service: AngularLib1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularLib1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
