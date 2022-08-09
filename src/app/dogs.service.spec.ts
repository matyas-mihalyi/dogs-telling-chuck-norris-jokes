import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DogsService } from './dogs.service';

describe('DogsService', () => {
  let service: DogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(DogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
