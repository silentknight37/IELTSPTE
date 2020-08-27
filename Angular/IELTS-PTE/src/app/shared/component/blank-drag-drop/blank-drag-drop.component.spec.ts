import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDragDropComponent } from './blank-drag-drop.component';

describe('BlankDragDropComponent', () => {
  let component: BlankDragDropComponent;
  let fixture: ComponentFixture<BlankDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
