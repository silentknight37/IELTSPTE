import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingWritingFillInTheBlanksAnswerDisplayComponent } from './reading-writing-fill-in-the-blanks-answer-display.component';

describe('ReadingWritingFillInTheBlanksAnswerDisplayComponent', () => {
  let component: ReadingWritingFillInTheBlanksAnswerDisplayComponent;
  let fixture: ComponentFixture<ReadingWritingFillInTheBlanksAnswerDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingWritingFillInTheBlanksAnswerDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingWritingFillInTheBlanksAnswerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
