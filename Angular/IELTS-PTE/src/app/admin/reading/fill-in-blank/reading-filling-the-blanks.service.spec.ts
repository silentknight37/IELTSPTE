import { TestBed } from '@angular/core/testing';

import { ReadingFillingTheBlanksService } from './reading-filling-the-blanks.service';

describe('ReadingFillingTheBlanksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadingFillingTheBlanksService = TestBed.get(ReadingFillingTheBlanksService);
    expect(service).toBeTruthy();
  });
});
