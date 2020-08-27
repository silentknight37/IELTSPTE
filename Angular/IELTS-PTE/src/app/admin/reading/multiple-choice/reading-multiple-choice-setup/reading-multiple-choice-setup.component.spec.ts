import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingMultipleChoiceSetupComponent } from './reading-multiple-choice-setup.component';

describe('ReadingMultipleChoiceSetupComponent', () => {
  let component: ReadingMultipleChoiceSetupComponent;
  let fixture: ComponentFixture<ReadingMultipleChoiceSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingMultipleChoiceSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingMultipleChoiceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
