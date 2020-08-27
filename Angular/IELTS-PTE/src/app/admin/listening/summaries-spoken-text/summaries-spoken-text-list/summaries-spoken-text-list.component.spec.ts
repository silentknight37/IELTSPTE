import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummariesSpokenTextListComponent } from './summaries-spoken-text-list.component';

describe('SummariesSpokenTextListComponent', () => {
  let component: SummariesSpokenTextListComponent;
  let fixture: ComponentFixture<SummariesSpokenTextListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummariesSpokenTextListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummariesSpokenTextListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
