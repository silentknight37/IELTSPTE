import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightIncorrectWordsDisplayComponent } from './highlight-incorrect-words-display.component';

describe('HighlightIncorrectWordsDisplayComponent', () => {
  let component: HighlightIncorrectWordsDisplayComponent;
  let fixture: ComponentFixture<HighlightIncorrectWordsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightIncorrectWordsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightIncorrectWordsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
