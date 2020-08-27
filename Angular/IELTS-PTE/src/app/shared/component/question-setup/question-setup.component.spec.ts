import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSetupComponent } from './question-setup.component';

describe('QuestionSetupComponent', () => {
  let component: QuestionSetupComponent;
  let fixture: ComponentFixture<QuestionSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
