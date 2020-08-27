import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingSingleChoiceDisplayComponent } from './reading-single-choice-display.component';

describe('ReadingSingleChoiceDisplayComponent', () => {
  let component: ReadingSingleChoiceDisplayComponent;
  let fixture: ComponentFixture<ReadingSingleChoiceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingSingleChoiceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingSingleChoiceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
