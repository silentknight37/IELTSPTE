import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummariesSpokenTextSetupComponent } from './summaries-spoken-text-setup.component';

describe('SummariesSpokenTextSetupComponent', () => {
  let component: SummariesSpokenTextSetupComponent;
  let fixture: ComponentFixture<SummariesSpokenTextSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummariesSpokenTextSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummariesSpokenTextSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
