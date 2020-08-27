import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightCorrectSummarySetupComponent } from './highlight-correct-summary-setup.component';

describe('HighlightCorrectSummarySetupComponent', () => {
  let component: HighlightCorrectSummarySetupComponent;
  let fixture: ComponentFixture<HighlightCorrectSummarySetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightCorrectSummarySetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightCorrectSummarySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
