import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteFromDictationListComponent } from './write-from-dictation-list.component';

describe('WriteFromDictationListComponent', () => {
  let component: WriteFromDictationListComponent;
  let fixture: ComponentFixture<WriteFromDictationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteFromDictationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteFromDictationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
