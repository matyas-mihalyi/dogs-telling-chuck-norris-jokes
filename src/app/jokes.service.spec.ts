import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { JokesService } from './jokes.service';

describe('JokesService', () => {
  let service: JokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(JokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getJoke() should return an observable value', (done: DoneFn) => {
    service.getJoke().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    })
  })

});
