import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingTheBlankQuestionSetupComponent } from './filling-the-blank-question-setup.component';

describe('FillingTheBlankQuestionSetupComponent', () => {
  let component: FillingTheBlankQuestionSetupComponent;
  let fixture: ComponentFixture<FillingTheBlankQuestionSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillingTheBlankQuestionSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingTheBlankQuestionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
