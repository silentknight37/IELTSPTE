import { TestBed } from '@angular/core/testing';

import { QuestionSetupServiceService } from './question-setup-service.service';

describe('QuestionSetupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionSetupServiceService = TestBed.get(QuestionSetupServiceService);
    expect(service).toBeTruthy();
  });
});
