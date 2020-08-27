import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingTheBlankQuestionSetupWithHeadersComponent } from './filling-the-blank-question-setup-with-headers.component';

describe('FillingTheBlankQuestionSetupWithHeadersComponent', () => {
  let component: FillingTheBlankQuestionSetupWithHeadersComponent;
  let fixture: ComponentFixture<FillingTheBlankQuestionSetupWithHeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillingTheBlankQuestionSetupWithHeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingTheBlankQuestionSetupWithHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
