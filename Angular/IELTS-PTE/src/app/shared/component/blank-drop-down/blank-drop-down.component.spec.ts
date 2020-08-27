import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDropDownComponent } from './blank-drop-down.component';

describe('BlankDropDownComponent', () => {
  let component: BlankDropDownComponent;
  let fixture: ComponentFixture<BlankDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
