import { TestBed } from '@angular/core/testing';

import { Chapters } from './chapters';

describe('Chapters', () => {
  let service: Chapters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chapters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
