import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteFromDictationSetupComponent } from './write-from-dictation-setup.component';

describe('WriteFromDictationSetupComponent', () => {
  let component: WriteFromDictationSetupComponent;
  let fixture: ComponentFixture<WriteFromDictationSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteFromDictationSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteFromDictationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
