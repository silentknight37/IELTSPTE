import { TestBed } from '@angular/core/testing';

import { ReadingWritingFillInTheBlanksService } from './reading-writing-fill-in-the-blanks.service';

describe('ReadingWritingFillInTheBlanksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadingWritingFillInTheBlanksService = TestBed.get(ReadingWritingFillInTheBlanksService);
    expect(service).toBeTruthy();
  });
});
