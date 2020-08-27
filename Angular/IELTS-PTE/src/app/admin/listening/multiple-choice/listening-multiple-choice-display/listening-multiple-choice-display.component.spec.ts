import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningMultipleChoiceDisplayComponent } from './listening-multiple-choice-display.component';

describe('ListeningMultipleChoiceDisplayComponent', () => {
  let component: ListeningMultipleChoiceDisplayComponent;
  let fixture: ComponentFixture<ListeningMultipleChoiceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningMultipleChoiceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningMultipleChoiceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
