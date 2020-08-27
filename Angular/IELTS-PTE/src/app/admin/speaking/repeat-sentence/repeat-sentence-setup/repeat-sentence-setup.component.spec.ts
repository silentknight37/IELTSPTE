import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatSentenceSetupComponent } from './repeat-sentence-setup.component';

describe('RepeatSentenceSetupComponent', () => {
  let component: RepeatSentenceSetupComponent;
  let fixture: ComponentFixture<RepeatSentenceSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatSentenceSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatSentenceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
