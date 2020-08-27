import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightCorrectSummaryListComponent } from './highlight-correct-summary-list.component';

describe('HighlightCorrectSummaryListComponent', () => {
  let component: HighlightCorrectSummaryListComponent;
  let fixture: ComponentFixture<HighlightCorrectSummaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightCorrectSummaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightCorrectSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
