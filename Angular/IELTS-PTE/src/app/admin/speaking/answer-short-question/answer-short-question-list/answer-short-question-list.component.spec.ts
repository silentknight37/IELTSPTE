import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerShortQuestionListComponent } from './answer-short-question-list.component';

describe('AnswerShortQuestionListComponent', () => {
  let component: AnswerShortQuestionListComponent;
  let fixture: ComponentFixture<AnswerShortQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerShortQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerShortQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
