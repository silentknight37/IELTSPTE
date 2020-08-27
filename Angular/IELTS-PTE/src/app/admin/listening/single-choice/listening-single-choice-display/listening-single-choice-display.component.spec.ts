import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningSingleChoiceDisplayComponent } from './listening-single-choice-display.component';

describe('ListeningSingleChoiceDisplayComponent', () => {
  let component: ListeningSingleChoiceDisplayComponent;
  let fixture: ComponentFixture<ListeningSingleChoiceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningSingleChoiceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningSingleChoiceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
