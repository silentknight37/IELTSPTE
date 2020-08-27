import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerShortQuestionSetupComponent } from './answer-short-question-setup.component';

describe('AnswerShortQuestionSetupComponent', () => {
  let component: AnswerShortQuestionSetupComponent;
  let fixture: ComponentFixture<AnswerShortQuestionSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerShortQuestionSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerShortQuestionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
