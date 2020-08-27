import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteFromDictationDisplayComponent } from './write-from-dictation-display.component';

describe('WriteFromDictationDisplayComponent', () => {
  let component: WriteFromDictationDisplayComponent;
  let fixture: ComponentFixture<WriteFromDictationDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteFromDictationDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteFromDictationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
