import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerShortQuestionDisplayComponent } from './answer-short-question-display.component';

describe('AnswerShortQuestionDisplayComponent', () => {
  let component: AnswerShortQuestionDisplayComponent;
  let fixture: ComponentFixture<AnswerShortQuestionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerShortQuestionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerShortQuestionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
