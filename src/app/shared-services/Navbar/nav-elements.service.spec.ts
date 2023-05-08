import { TestBed } from '@angular/core/testing';

import { NavElementsService } from './nav-elements.service';

describe('NavElementsService', () => {
  let service: NavElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
