import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingMultipleChoiceDisplayComponent } from './reading-multiple-choice-display.component';

describe('ReadingMultipleChoiceDisplayComponent', () => {
  let component: ReadingMultipleChoiceDisplayComponent;
  let fixture: ComponentFixture<ReadingMultipleChoiceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingMultipleChoiceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingMultipleChoiceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
