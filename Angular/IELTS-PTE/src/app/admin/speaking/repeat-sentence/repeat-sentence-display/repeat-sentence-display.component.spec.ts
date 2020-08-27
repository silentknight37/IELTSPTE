import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatSentenceDisplayComponent } from './repeat-sentence-display.component';

describe('RepeatSentenceDisplayComponent', () => {
  let component: RepeatSentenceDisplayComponent;
  let fixture: ComponentFixture<RepeatSentenceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatSentenceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatSentenceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
