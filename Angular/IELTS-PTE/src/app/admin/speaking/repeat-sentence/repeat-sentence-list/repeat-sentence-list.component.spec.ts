import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatSentenceListComponent } from './repeat-sentence-list.component';

describe('RepeatSentenceListComponent', () => {
  let component: RepeatSentenceListComponent;
  let fixture: ComponentFixture<RepeatSentenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatSentenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatSentenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
