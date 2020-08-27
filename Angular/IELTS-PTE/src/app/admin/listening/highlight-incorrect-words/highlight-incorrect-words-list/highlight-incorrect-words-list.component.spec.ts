import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightIncorrectWordsListComponent } from './highlight-incorrect-words-list.component';

describe('HighlightIncorrectWordsListComponent', () => {
  let component: HighlightIncorrectWordsListComponent;
  let fixture: ComponentFixture<HighlightIncorrectWordsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightIncorrectWordsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightIncorrectWordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
