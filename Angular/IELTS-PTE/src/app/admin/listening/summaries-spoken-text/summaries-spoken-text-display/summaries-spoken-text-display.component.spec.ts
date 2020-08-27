import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummariesSpokenTextDisplayComponent } from './summaries-spoken-text-display.component';

describe('SummariesSpokenTextDisplayComponent', () => {
  let component: SummariesSpokenTextDisplayComponent;
  let fixture: ComponentFixture<SummariesSpokenTextDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummariesSpokenTextDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummariesSpokenTextDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
