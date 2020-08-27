import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingTheBlankAnswerDisplayComponent } from './filling-the-blank-answer-display.component';

describe('FillingTheBlankAnswerDisplayComponent', () => {
  let component: FillingTheBlankAnswerDisplayComponent;
  let fixture: ComponentFixture<FillingTheBlankAnswerDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillingTheBlankAnswerDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingTheBlankAnswerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
