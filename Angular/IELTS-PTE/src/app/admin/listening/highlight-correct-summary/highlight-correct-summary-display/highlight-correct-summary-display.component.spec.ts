import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightCorrectSummaryDisplayComponent } from './highlight-correct-summary-display.component';

describe('HighlightCorrectSummaryDisplayComponent', () => {
  let component: HighlightCorrectSummaryDisplayComponent;
  let fixture: ComponentFixture<HighlightCorrectSummaryDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightCorrectSummaryDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightCorrectSummaryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
