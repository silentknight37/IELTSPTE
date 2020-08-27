import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightIncorrectWordsSetupComponent } from './highlight-incorrect-words-setup.component';

describe('HighlightIncorrectWordsSetupComponent', () => {
  let component: HighlightIncorrectWordsSetupComponent;
  let fixture: ComponentFixture<HighlightIncorrectWordsSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightIncorrectWordsSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightIncorrectWordsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
