import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingWritingFillInTheBlanksQuestionSetupComponent } from './reading-writing-fill-in-the-blanks-question-setup.component';

describe('ReadingWritingFillInTheBlanksQuestionSetupComponent', () => {
  let component: ReadingWritingFillInTheBlanksQuestionSetupComponent;
  let fixture: ComponentFixture<ReadingWritingFillInTheBlanksQuestionSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingWritingFillInTheBlanksQuestionSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingWritingFillInTheBlanksQuestionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
