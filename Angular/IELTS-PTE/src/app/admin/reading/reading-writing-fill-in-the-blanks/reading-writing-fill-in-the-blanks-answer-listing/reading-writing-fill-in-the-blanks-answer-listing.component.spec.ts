import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingWritingFillInTheBlanksAnswerListingComponent } from './reading-writing-fill-in-the-blanks-answer-listing.component';

describe('ReadingWritingFillInTheBlanksAnswerListingComponent', () => {
  let component: ReadingWritingFillInTheBlanksAnswerListingComponent;
  let fixture: ComponentFixture<ReadingWritingFillInTheBlanksAnswerListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingWritingFillInTheBlanksAnswerListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingWritingFillInTheBlanksAnswerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
